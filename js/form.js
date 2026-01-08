// Helper function to read file as data URL
function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
    });
}

// Global variables
let currentStep = 1;
const totalSteps = 3;

// Form submission handler
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = document.getElementById('regForm');
    if (!form) {
        console.error('Form element not found');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    
    // Show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    }

    try {
        // Get all form data
        const formData = new FormData(form);
        const data = {
            id: 'PLUMEE-' + Date.now().toString().slice(-6),
            registrationDate: new Date().toISOString(),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            country: formData.get('country'),
            affiliation: formData.get('affiliation'),
            position: formData.get('position'),
            registrationType: formData.get('registrationType'),
            presentationType: formData.get('presentationType'),
            abstractTitle: formData.get('abstractTitle'),
            abstractFile: formData.get('abstractFile'),
            dietaryRequirements: formData.get('dietaryRequirements'),
            specialNeeds: formData.get('specialNeeds'),
            consent: formData.get('consent') === 'on',
            status: 'pending'
        };

        // Handle file upload if present
        const fileInput = document.getElementById('abstractFile');
        if (fileInput?.files.length > 0) {
            const file = fileInput.files[0];
            formData.abstractFile = file.name;
            
            // Convert file to base64 and store in localStorage
            const fileContent = await readFileAsDataURL(file);
            if (fileContent) {
                localStorage.setItem(`abstract_${formData.id}`, fileContent);
            }
        }

        // Save registration data
        const saved = saveRegistrationToLocal(formData);
        if (!saved) {
            throw new Error('Failed to save registration');
        }

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="success-content">
                <h3>Registration Successful!</h3>
                <p>Thank you for registering for PLUMEE 2026. Your registration ID is: <strong>${formData.id}</strong></p>
                <p>We'll be in touch with more details soon.</p>
            </div>
        `;

        // Replace form with success message
        form.style.display = 'none';
        form.parentNode.insertBefore(successMessage, form.nextSibling);

    } catch (error) {
        console.error('Error submitting form:', error);
        showError('An error occurred while submitting the form. Please try again.');
    } finally {
        // Reset button state
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
}

// Save registration to localStorage
function saveRegistrationToLocal(data) {
    try {
        // Get existing registrations or initialize empty array
        const registrations = JSON.parse(localStorage.getItem('plumee_registrations') || '[]');
        
        // Add new registration
        registrations.push(data);
        
        // Save back to localStorage
        localStorage.setItem('plumee_registrations', JSON.stringify(registrations));
        console.log('Registration saved successfully:', data.id);
        return true;
    } catch (error) {
        console.error('Error saving registration:', error);
        return false;
    }
}

// Show error message
function showError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;

    // Insert error message at the top of the form
    const form = document.getElementById('regForm');
    if (form) {
        form.prepend(errorDiv);
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Remove error message after 10 seconds
    setTimeout(() => {
        if (document.body.contains(errorDiv)) {
            errorDiv.remove();
        }
    }, 10000);
}

// Form validation
function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

// Initialize form when DOM is loaded
function initializeForm() {
    const form = document.getElementById('regForm');
    if (!form) return;

    // Add event listeners
    form.addEventListener('submit', handleFormSubmit);
    
    // Initialize form sections
    const sections = document.querySelectorAll('.form-section');
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }

    // Add navigation handlers
    document.querySelectorAll('[data-next-section]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const currentSection = button.closest('.form-section');
            const nextSectionId = button.getAttribute('data-next-section');
            const nextSection = document.getElementById(nextSectionId);
            
            if (currentSection && nextSection) {
                currentSection.classList.remove('active');
                nextSection.classList.add('active');
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add back button handlers
    document.querySelectorAll('[data-prev-section]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const currentSection = button.closest('.form-section');
            const prevSectionId = button.getAttribute('data-prev-section');
            const prevSection = document.getElementById(prevSectionId);
            
            if (currentSection && prevSection) {
                currentSection.classList.remove('active');
                prevSection.classList.add('active');
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    console.log('Form initialized successfully');
}

// Navigation functions
function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected step
    const stepSection = document.getElementById(`section-${getStepId(step)}`);
    if (stepSection) {
        stepSection.classList.add('active');
    }
    
    // Update current step
    currentStep = step;
    updateProgressBar();
    updateNavigationButtons();
    
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            goToStep(currentStep + 1);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        goToStep(currentStep - 1);
    }
}

function getStepId(step) {
    switch(step) {
        case 1: return 'personal';
        case 2: return 'presentation';
        case 3: return 'review';
        default: return 'personal';
    }
}

function updateProgressBar() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

function updateNavigationButtons() {
    const backButton = document.querySelector('.btn-back');
    const nextButton = document.querySelector('.btn-next');
    const submitButton = document.querySelector('.btn-submit');
    
    // Show/hide back button
    if (backButton) {
        backButton.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    }
    
    // Show/hide next and submit buttons
    if (nextButton && submitButton) {
        nextButton.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
        submitButton.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
    }
}

function validateCurrentStep() {
    const currentSection = document.querySelector('.form-section.active');
    if (!currentSection) return true;
    
    let isValid = true;
    const requiredFields = currentSection.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Add error message if not exists
            if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'This field is required';
                field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
        } else {
            field.classList.remove('error');
            const errorMsg = field.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
            
            // Additional validation for email
            if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                field.classList.add('error');
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please enter a valid email address';
                field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
        }
    });
    
    if (!isValid) {
        showError('Please fill in all required fields correctly.');
    }
    
    return isValid;
}

// Initialize form when document is ready
function initForm() {
    // Set up event listeners
    document.addEventListener('click', function(e) {
        // Next button
        if (e.target.closest('.btn-next')) {
            e.preventDefault();
            nextStep();
        }
        
        // Back button
        if (e.target.closest('.btn-back')) {
            e.preventDefault();
            prevStep();
        }
        
        // Step indicators
        const stepIndicator = e.target.closest('.step');
        if (stepIndicator) {
            e.preventDefault();
            const stepNumber = parseInt(stepIndicator.getAttribute('data-step'));
            if (stepNumber < currentStep) {
                goToStep(stepNumber);
            }
        }
    });

    // Update form when inputs change
    document.addEventListener('input', function(e) {
        const input = e.target;
        if (input.hasAttribute('required')) {
            if (input.value.trim()) {
                input.classList.remove('error');
                const errorMsg = input.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            }
        }
    });

    // Show first step
    goToStep(1);
}

// Start the form when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
} else {
    initForm();
}
            if (submitBtn) {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
            return;
        }
        
        try {
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            }

        // Validate all sections before submission
        const sections = document.querySelectorAll('.form-section');
        let isValid = true;
        
        sections.forEach(section => {
            if (!validateSection(section)) {
                isValid = false;
                // Find the first section with errors
                const firstError = section.querySelector('.error');
                if (firstError) {
                    // Navigate to the section with the error
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    section.classList.add('active');
                    // Hide other sections
                    sections.forEach(s => {
                        if (s !== section) s.classList.remove('active');
                    });
                }
            }
        });
        
        if (!isValid) {
            throw new Error('Please fill in all required fields correctly');
        }

        // Create FormData from the form
        const formData = new FormData(form);
        
        // Add timestamp
        formData.append('submissionDate', new Date().toISOString());
        
        // Add any additional data if needed
        formData.append('timestamp', new Date().toISOString());
        
        try {
            // Send data to server using fetch
            const response = await fetch('process_registration.php', {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header, let the browser set it with the correct boundary
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error('Invalid server response. Expected JSON but got: ' + text);
            }
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit form');
            }
            
            // Show success message
            const statusEl = document.getElementById('form-status') || createStatusElement(form);
            statusEl.textContent = result.message || 'Registration submitted successfully!';
            statusEl.className = 'status-message success';
            statusEl.style.display = 'block';
            
            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Reset form
            resetForm();
            
            // Show thank you message after a delay
            setTimeout(() => {
                // Show success alert
                alert('Thank you for your registration! Your submission has been received.');
                
                // Reset the form status after a delay
                statusEl.style.display = 'none';
            }, 2000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showError(`Failed to submit form: ${error.message || 'Please check your connection and try again.'}`);
            
            // Log detailed error for debugging
            if (error.response) {
                console.error('Server response:', error.response);
            }
        } finally {
            if (submitBtn) {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        showError('An unexpected error occurred. Please try again.');
    } finally {
        if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    }
}

// Save form data to localStorage
function saveFormData() {
    const form = document.getElementById('regForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const formObject = {};
    
    // Convert FormData to plain object
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Save file info if present
    const fileInput = document.getElementById('abstractFile');
    if (fileInput && fileInput.files.length > 0) {
        formObject['abstractFile_name'] = fileInput.files[0].name;
        formObject['abstractFile_size'] = fileInput.files[0].size;
    }
    
    // Save to localStorage
    localStorage.setItem('plumeeRegistrationDraft', JSON.stringify(formObject));
    console.log('Form data saved');
}

// Load form data from localStorage
function loadFormData() {
    const savedData = localStorage.getItem('plumeeRegistrationDraft');
    if (!savedData) return;
    
    try {
        const formData = JSON.parse(savedData);
        const form = document.getElementById('regForm');
        
        // Fill in form fields
        Object.keys(formData).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (!input) return;
            
            if (input.type === 'radio' || input.type === 'checkbox') {
                input.checked = input.value === formData[key];
            } else if (input.type === 'file') {
                // Handle file input separately
                const fileInfo = document.getElementById('file-info');
                if (fileInfo) {
                    fileInfo.textContent = formData[`${key}_name`] || '';
                }
            } else {
                input.value = formData[key] || '';
            }
        });
        
        // Trigger any necessary UI updates
        if (formData.presentation_type) {
            const event = new Event('change');
            const presentationInput = form.querySelector(`input[name="presentation_type"][value="${formData.presentation_type}"]`);
            if (presentationInput) {
                presentationInput.checked = true;
                presentationInput.dispatchEvent(event);
            }
        }
        
        console.log('Form data loaded');
    } catch (error) {
        console.error('Error loading form data:', error);
    }
}

// Save registration data to localStorage
function saveRegistrationToLocal(data) {
    try {
        const registrations = JSON.parse(localStorage.getItem('plumeeRegistrations') || '[]');
        // Generate a unique ID for this registration
        data.id = 'reg-' + Date.now();
        data.registrationDate = new Date().toISOString();
        registrations.push(data);
        localStorage.setItem('plumeeRegistrations', JSON.stringify(registrations));
        
        // Clear the draft data after successful submission
        localStorage.removeItem('plumeeRegistrationDraft');
        
        return true;
    } catch (error) {
        console.error('Error saving registration:', error);
        return false;
    }
}

// Load saved registrations
function loadSavedRegistrations() {
    try {
        return JSON.parse(localStorage.getItem('plumeeRegistrations') || '[]');
    } catch (error) {
        console.error('Error loading registrations:', error);
        return [];
    }
}

// Create status element if it doesn't exist
function createStatusElement() {
    let statusEl = document.getElementById('form-status');
    
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'form-status';
        statusEl.setAttribute('role', 'status');
        statusEl.setAttribute('aria-live', 'polite');
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'status-close';
        closeBtn.setAttribute('aria-label', 'Close message');
        closeBtn.onclick = () => {
            statusEl.style.display = 'none';
        };
        
        const messageContent = document.createElement('div');
        messageContent.className = 'status-content';
        
        statusEl.appendChild(messageContent);
        statusEl.appendChild(closeBtn);
        
        // Add to the top of the form
        const form = document.getElementById('regForm');
        if (form) {
            form.insertBefore(statusEl, form.firstChild);
        } else {
            document.body.insertBefore(statusEl, document.body.firstChild);
        }
    }
    
    return statusEl;
}

// Add status message styles
function addStatusStyles() {
    if (!document.getElementById('form-styles')) {
        const style = document.createElement('style');
        style.id = 'form-styles';
        style.textContent = `
            .status-message {
                padding: 12px 20px;
                margin-bottom: 20px;
                border-radius: 4px;
                font-weight: 500;
                display: none;
            }
            .success {
                background-color: #f6ffed;
                border: 1px solid #b7eb8f;
                color: #52c41a;
            }
            .error {
                background-color: #fff2f0;
                border: 1px solid #ffccc7;
                color: #ff4d4f;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize form when DOM is loaded
function initializeForm() {
    console.log('Initializing form...');
    
    const form = document.getElementById('regForm');
    if (!form) {
        console.error('Form element not found');
        return;
    }

    // Add status message styles
    addStatusStyles();
    
    // Load any saved form data
    loadFormData();
    
    // Set first section as active if none is active
    const sections = document.querySelectorAll('.form-section');
    if (sections.length > 0) {
        const activeSection = document.querySelector('.form-section.active');
        if (!activeSection) {
            sections[0].classList.add('active');
        }
        
        // Initialize progress bar
        updateProgressBar();
    }
    
    // Initialize file upload preview
    initializeFileUpload();
    
    // Initialize abstract toggle based on presentation type
    initializeAbstractToggle();
    
    // Add input event listeners to save form data as user types
    form.addEventListener('input', saveFormData);
    
    // Handle navigation buttons
    document.addEventListener('click', function(e) {
        const nextBtn = e.target.closest('.btn-next');
        const backBtn = e.target.closest('.btn-back');
        
        if (nextBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentSection = nextBtn.closest('.form-section');
            const nextSectionId = nextBtn.getAttribute('data-next-section');
            const nextSection = document.getElementById(nextSectionId);
            
            if (currentSection && nextSection) {
                // Validate current section before proceeding
                let isValid = true;
                const requiredFields = currentSection.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        // Add error message if not already present
                        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                            const errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'This field is required';
                            field.parentNode.insertBefore(errorMsg, field.nextSibling);
                        }
                    } else {
                        field.classList.remove('error');
                        const errorMsg = field.nextElementSibling;
                        if (errorMsg && errorMsg.classList.contains('error-message')) {
                            errorMsg.remove();
                        }
                    }
                });
                
                // Validate email format if email field exists
                const emailField = currentSection.querySelector('input[type="email"]');
                if (emailField && emailField.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(emailField.value)) {
                        isValid = false;
                        emailField.classList.add('error');
                        if (!emailField.nextElementSibling || !emailField.nextElementSibling.classList.contains('error-message')) {
                            const errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'Please enter a valid email address';
                            emailField.parentNode.insertBefore(errorMsg, emailField.nextSibling);
                        }
                    } else {
                        emailField.classList.remove('error');
                        const errorMsg = emailField.nextElementSibling;
                        if (errorMsg && errorMsg.classList.contains('error-message')) {
                            errorMsg.remove();
                        }
                    }
                }
                
                if (isValid) {
                    navigateToSection(currentSection, nextSection);
                } else {
                    // Scroll to first error
                    const firstError = currentSection.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        }
        
        // Handle back button
        if (backBtn) {
            e.preventDefault();
            const currentSection = backBtn.closest('.form-section');
            const prevSectionId = backBtn.getAttribute('data-prev-section');
            const prevSection = document.getElementById(prevSectionId);
            
            if (currentSection && prevSection) {
                navigateToSection(currentSection, prevSection);
            }
        }
    });
}

// Navigate between sections
function navigateToSection(currentSection, nextSection) {
    if (!currentSection || !nextSection) {
        console.error('Invalid sections provided for navigation');
        return false;
    }
    
    console.log(`Navigating from ${currentSection.id} to ${nextSection.id}`);
    
    // Validate current section before proceeding
    if (nextSection.id !== 'section-personal' && !validateSection(currentSection)) {
        // Find first error and scroll to it
        const firstError = currentSection.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return false;
    }
    
    // Save form data before navigating
    saveFormData();
    
    // Update active states
    currentSection.classList.remove('active');
    nextSection.classList.add('active');
    
    // Update progress bar and steps
    updateProgressBar();
    updateStepIndicators();
    
    // Scroll to top of the form
    const formContent = document.querySelector('.form-content') || document.documentElement;
    formContent.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Update URL hash
    history.pushState(null, '', `#${nextSection.id}`);
    
    return true;
}

// Update step indicators in the progress bar
function updateStepIndicators() {
    const sections = document.querySelectorAll('.form-section');
    const currentSection = document.querySelector('.form-section.active');
    const currentIndex = Array.from(sections).indexOf(currentSection);
    
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index < currentIndex) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index === currentIndex) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Update progress bar
function updateProgressBar() {
    const sections = document.querySelectorAll('.form-section');
    const currentSection = document.querySelector('.form-section.active');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!sections.length || !currentSection || !progressBar) return;
    
    // Get all sections except the confirmation section for progress calculation
    const visibleSections = Array.from(sections).filter(section => !section.id.includes('confirmation'));
    const currentIndex = visibleSections.indexOf(currentSection);
    
    // Calculate progress (0-100%)
    const progress = (currentIndex / (visibleSections.length - 1)) * 100;
    
    // Update progress bar width
    progressBar.style.width = `${progress}%`;
    
    // Update step indicators
    visibleSections.forEach((section, index) => {
        const step = section.querySelector('.progress-step');
        if (step) {
            if (index < currentIndex) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === currentIndex) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        }
    });
}

// Update summary
function updateSummary() {
    const summaryContainer = document.getElementById('summary-content');
    if (!summaryContainer) return;
    
    const form = document.getElementById('regForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    let summaryHTML = `
        <div class="summary-section">
            <h4>Personal Information</h4>
            <p><strong>Name:</strong> ${data.firstName || ''} ${data.lastName || ''}</p>
            <p><strong>Email:</strong> ${data.email || ''}</p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Institution:</strong> ${data.institution || ''}</p>
            <p><strong>Country:</strong> ${data.country || ''}</p>
        </div>
        
        <div class="summary-section">
            <h4>Registration Details</h4>
            <p><strong>Registration Type:</strong> ${data.registrationType || ''}</p>
            <p><strong>Presentation Type:</strong> ${data.presentationType || 'Not specified'}</p>
    `;
    
    // Add file info if uploaded
    const fileInput = document.getElementById('abstractFile');
    if (fileInput && fileInput.files.length > 0) {
        summaryHTML += `<p><strong>Abstract File:</strong> ${fileInput.files[0].name}</p>`;
    }
    
    // Add any additional fields that might be in the form
    if (data.abstractTitle) {
        summaryHTML += `<p><strong>Abstract Title:</strong> ${data.abstractTitle}</p>`;
    }
    
    if (data.abstractKeywords) {
        summaryHTML += `<p><strong>Keywords:</strong> ${data.abstractKeywords}</p>`;
    }
    
    summaryHTML += `</div>`;
    summaryContainer.innerHTML = summaryHTML;
}

// Reset form
function resetForm() {
    const form = document.getElementById('regForm');
    if (!form) return;
    
    // Reset form fields
    form.reset();
    
    // Reset file inputs
    const fileInputs = form.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.value = '';
    });
    
    // Reset file preview
    const filePreview = document.getElementById('filePreview');
    const fileUploadContent = document.querySelector('.file-upload-content');
    if (filePreview && fileUploadContent) {
        filePreview.style.display = 'none';
        fileUploadContent.style.display = 'flex';
    }
    
    // Reset active section to first one
    const sections = document.querySelectorAll('.form-section');
    sections.forEach((section, index) => {
        if (index === 0) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    // Reset progress bar
    updateProgressBar();
    
    // Clear error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    // Clear status message
    const statusEl = document.getElementById('form-status');
    if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'status-message';
        statusEl.style.display = 'none';
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Show error message
function showError(message) {
    const statusEl = document.getElementById('form-status') || createStatusElement();
    statusEl.textContent = message;
    statusEl.className = 'status-message error';
    statusEl.style.display = 'block';
    statusEl.setAttribute('role', 'alert');
    statusEl.setAttribute('aria-live', 'assertive');
    
    // Scroll to error message
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide after 8 seconds
    setTimeout(() => {
        statusEl.style.opacity = '0';
        statusEl.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(() => {
            statusEl.style.display = 'none';
            statusEl.style.opacity = '1';
        }, 500);
    }, 8000);
}

// Initialize form when document is ready
function initForm() {
    // Set up event listeners
    document.addEventListener('click', function(e) {
        // Next button
        if (e.target.closest('.btn-next') || e.target.classList.contains('btn-next')) {
            e.preventDefault();
            nextStep();
        }
        
        // Back button
        if (e.target.closest('.btn-back') || e.target.classList.contains('btn-back')) {
            e.preventDefault();
            prevStep();
        }
        
        // Step indicators
        const stepIndicator = e.target.closest('.step');
        if (stepIndicator) {
            e.preventDefault();
            const stepNumber = parseInt(stepIndicator.getAttribute('data-step'));
            if (stepNumber < currentStep) {
                goToStep(stepNumber);
            }
        }
    });

    // Update form when inputs change
    document.addEventListener('input', function(e) {
        const input = e.target;
        if (input.hasAttribute('required')) {
            if (input.value.trim()) {
                input.classList.remove('error');
                const errorMsg = input.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            }
        }
    });

    // Show first step
    goToStep(1);
}

// Start the form when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
} else {
    initForm();
}
