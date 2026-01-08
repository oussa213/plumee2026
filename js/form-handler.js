// Toggle abstract upload section based on presentation type
function toggleAbstractUpload(show) {
    const abstractSection = document.getElementById('abstract-upload-section');
    const abstractTitle = document.getElementById('abstractTitle');
    const abstractFile = document.getElementById('abstractFile');
    
    if (show) {
        abstractSection.style.display = 'block';
        abstractTitle.required = true;
        abstractFile.required = true;
    } else {
        abstractSection.style.display = 'none';
        abstractTitle.required = false;
        abstractFile.required = false;
        abstractTitle.value = '';
        abstractFile.value = '';
        document.getElementById('file-info').textContent = '';
    }
}

// Handle file upload preview
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('abstractFile');
    const fileInfo = document.getElementById('file-info');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Check file size (5MB max)
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (file.size > maxSize) {
                    fileInfo.textContent = 'File is too large. Max size is 5MB.';
                    fileInfo.style.color = '#e74c3c';
                    fileInput.value = '';
                    return;
                }
                
                // Check file type
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                if (!validTypes.includes(file.type)) {
                    fileInfo.textContent = 'Invalid file type. Please upload a PDF or Word document.';
                    fileInfo.style.color = '#e74c3c';
                    fileInput.value = '';
                    return;
                }
                
                // Show file info
                fileInfo.textContent = `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
                fileInfo.style.color = '#2E8B57';
            }
        });
    }
    
    // Auto-save form data as user types
    const form = document.getElementById('regForm');
    if (form) {
        // Auto-save on input change
        form.addEventListener('input', function() {
            const formData = new FormData(form);
            const formObject = {};
            
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Save file info if present
            const fileInput = document.getElementById('abstractFile');
            if (fileInput && fileInput.files.length > 0) {
                formObject['abstractFile_name'] = fileInput.files[0].name;
            }
            
            // Save draft to localStorage
            try {
                localStorage.setItem('plumeeRegistrationDraft', JSON.stringify(formObject));
            } catch (error) {
                console.error('Error saving draft:', error);
            }
        });
        
        // Check if running on file:// protocol
        const isFileProtocol = window.location.protocol === 'file:';
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if server is available (not file:// protocol)
            if (isFileProtocol) {
                showError('Please run the server to submit the form. Open terminal and run: npm start, then access http://localhost:3000/registration.html');
                return;
            }
            
            // Validate form
            if (!form.checkValidity()) {
                // Find first invalid field
                const invalidFields = form.querySelectorAll(':invalid');
                if (invalidFields.length > 0) {
                    invalidFields[0].focus();
                    showError('Please fill in all required fields correctly.');
                    return;
                }
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            // Create FormData object
            const formData = new FormData(form);
            
            // Submit to server
            fetch('/api/register', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Check if response is ok
                if (!response.ok) {
                    // Try to parse error response
                    return response.json().then(err => {
                        throw new Error(err.message || `Server error: ${response.status}`);
                    }).catch(() => {
                        throw new Error(`Server error: ${response.status} ${response.statusText}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Show success message
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Registration Successful!';
                    submitBtn.style.backgroundColor = '#2ecc71';
                    showSuccess(`Your registration has been submitted successfully! Registration ID: ${data.data.id}`);
                    
                    // Clear localStorage draft
                    localStorage.removeItem('plumeeRegistrationDraft');
                    
                    // Reset form after showing success
                    setTimeout(() => {
                        form.reset();
                        // Reset abstract upload section
                        const abstractSection = document.getElementById('abstract-upload-section');
                        if (abstractSection) {
                            abstractSection.style.display = 'none';
                        }
                        // Reset file info
                        const fileInfo = document.getElementById('file-info');
                        if (fileInfo) {
                            fileInfo.style.display = 'none';
                            fileInfo.textContent = '';
                        }
                        // Reset button
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                        
                        // Scroll to top
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 3000);
                } else {
                    throw new Error(data.message || 'Registration failed');
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
                
                // More specific error messages
                let errorMessage = 'Failed to submit registration. ';
                
                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    errorMessage += 'Please make sure the server is running. Start it with: npm start';
                } else if (error.message.includes('404')) {
                    errorMessage += 'Server endpoint not found. Please check server configuration.';
                } else if (error.message.includes('500')) {
                    errorMessage += 'Server error occurred. Please try again later.';
                } else {
                    errorMessage += error.message || 'Please check your connection and try again.';
                }
                
                showError(errorMessage);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Show error message
function showError(message) {
    const messagesContainer = document.getElementById('form-messages');
    if (!messagesContainer) {
        console.error('Messages container not found');
        return;
    }
    
    messagesContainer.innerHTML = `
        <div class="alert alert-error">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Scroll to error
    messagesContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messagesContainer.style.opacity = '0';
        setTimeout(() => {
            messagesContainer.innerHTML = '';
            messagesContainer.style.opacity = '1';
        }, 500);
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const messagesContainer = document.getElementById('form-messages');
    if (!messagesContainer) {
        console.error('Messages container not found');
        return;
    }
    
    messagesContainer.innerHTML = `
        <div class="alert alert-success">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Scroll to success message
    messagesContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide after 5 seconds
    setTimeout(() => {
        messagesContainer.style.opacity = '0';
        setTimeout(() => {
            messagesContainer.innerHTML = '';
            messagesContainer.style.opacity = '1';
        }, 500);
    }, 5000);
}
