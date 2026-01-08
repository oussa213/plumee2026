// registration-handler.js
let db = null;
let isOnline = true; // We'll check this when the page loads

// Initialize IndexedDB
async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('PLUMEE2026_Registrations', 1);
        
        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            reject('Failed to open database');
        };
        
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Create object store for pending submissions
            if (!db.objectStoreNames.contains('pendingSubmissions')) {
                db.createObjectStore('pendingSubmissions', { keyPath: 'id', autoIncrement: true });
            }
            
            // Create object store for submissions
            if (!db.objectStoreNames.contains('submissions')) {
                db.createObjectStore('submissions', { keyPath: 'id' });
            }
        };
    });
}

// Save form data to IndexedDB
async function savePendingSubmission(formData) {
    if (!db) {
        console.error('Database not initialized');
        return false;
    }
    
    const data = {
        timestamp: new Date().toISOString(),
        data: Object.fromEntries(formData.entries()),
        status: 'pending'
    };
    
    if (formData.get('abstractFile')) {
        data.hasFile = true;
    }
    
    const transaction = db.transaction(['pendingSubmissions'], 'readwrite');
    const store = transaction.objectStore('pendingSubmissions');
    
    return new Promise((resolve, reject) => {
        const request = store.add(data);
        
        request.onsuccess = () => {
            console.log('Submission saved to pending queue');
            resolve(request.result);
        };
        
        request.onerror = (event) => {
            console.error('Error saving submission:', event.target.error);
            reject(event.target.error);
        };
    });
}

// Process pending submissions when online
async function processPendingSubmissions() {
    if (!db) return;
    
    const transaction = db.transaction(['pendingSubmissions', 'submissions'], 'readwrite');
    const pendingStore = transaction.objectStore('pendingSubmissions');
    const submissionsStore = transaction.objectStore('submissions');
    
    const request = pendingStore.getAll();
    
    request.onsuccess = async () => {
        const pending = request.result;
        
        for (const submission of pending) {
            try {
                const formData = new FormData();
                
                // Convert data back to FormData
                Object.entries(submission.data).forEach(([key, value]) => {
                    if (key === 'abstractFile' && submission.hasFile) {
                        // Skip file data as it can't be reconstructed
                        return;
                    }
                    formData.append(key, value);
                });
                
                // Submit to server
                const response = await fetch('process_registration.php', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) throw new Error('Server error');
                
                const result = await response.json();
                
                if (result.status === 'success') {
                    // Move to submissions store
                    await new Promise((resolve, reject) => {
                        const addRequest = submissionsStore.put({
                            id: result.registrationId,
                            ...submission,
                            status: 'submitted',
                            submittedAt: new Date().toISOString()
                        });
                        
                        addRequest.onsuccess = () => {
                            // Remove from pending
                            const deleteRequest = pendingStore.delete(submission.id);
                            deleteRequest.onsuccess = resolve;
                            deleteRequest.onerror = reject;
                        };
                        
                        addRequest.onerror = reject;
                    });
                }
            } catch (error) {
                console.error('Error processing pending submission:', error);
            }
        }
    };
}

// Handle form submission
async function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    const formMessages = document.getElementById('form-messages');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    // Clear previous messages
    if (formMessages) {
        formMessages.textContent = '';
        formMessages.className = 'form-messages';
        formMessages.style.display = 'none';
    }
    
    try {
        const formData = new FormData(form);
        const participationType = formData.get('participation_type');
        const abstractFile = form.querySelector('input[name="abstractFile"]');
        
        // Client-side validation
        if (participationType !== 'Attendee' && (!abstractFile || !abstractFile.files.length)) {
            throw new Error('Abstract file is required for presentation types');
        }
        
        // If online, try to submit directly
        if (isOnline) {
            const response = await fetch('process_registration.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                await saveSubmissionToDB(formData, result.registrationId);
                showSuccess(`
                    Registration successful! 
                    <div style="margin-top: 10px;">
                        Your registration ID: <strong>${result.registrationId}</strong>
                    </div>
                `, formMessages);
                form.reset();
                return;
            } else {
                throw new Error(result.message || 'An error occurred during registration');
            }
        } else {
            // Offline - save to pending submissions
            await savePendingSubmission(formData);
            showSuccess(`
                You are currently offline. Your submission has been saved and will be sent when you're back online.
                <div style="margin-top: 10px;">
                    <i class="fas fa-info-circle"></i> Make sure to come back online to complete your submission.
                </div>
            `, formMessages);
            form.reset();
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError(error.message || 'Failed to submit form. Please try again or contact support.', formMessages);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

// Save successful submission to IndexedDB
async function saveSubmissionToDB(formData, registrationId) {
    if (!db) return;
    
    const transaction = db.transaction(['submissions'], 'readwrite');
    const store = transaction.objectStore('submissions');
    
    const data = {
        id: registrationId,
        timestamp: new Date().toISOString(),
        data: Object.fromEntries(formData.entries()),
        status: 'submitted'
    };
    
    return new Promise((resolve, reject) => {
        const request = store.put(data);
        
        request.onsuccess = () => resolve();
        request.onerror = (event) => {
            console.error('Error saving submission:', event.target.error);
            reject(event.target.error);
        };
    });
}

// Check online status
function updateOnlineStatus() {
    isOnline = navigator.onLine;
    console.log(isOnline ? 'Online' : 'Offline');
    
    // If we just came online, process any pending submissions
    if (isOnline) {
        processPendingSubmissions();
    }
}

// Show success message
function showSuccess(message, container) {
    if (!container) return;
    container.innerHTML = `
        <div class="alert alert-success">
            <i class="fas fa-check-circle"></i> ${message}
        </div>
    `;
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

// Show error message
function showError(message, container) {
    if (!container) return;
    container.innerHTML = `
        <div class="alert alert-error">
            <i class="fas fa-exclamation-circle"></i> ${message}
        </div>
    `;
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

// File upload preview
function setupFilePreview() {
    const fileInput = document.querySelector('input[type="file"]');
    const fileInfo = document.getElementById('file-info');
    
    if (fileInput && fileInfo) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                fileInfo.textContent = this.files[0].name;
                fileInfo.style.display = 'inline-block';
            } else {
                fileInfo.textContent = 'No file chosen';
                fileInfo.style.display = 'none';
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('regForm');
    if (!form) return;
    
    // Initialize IndexedDB
    try {
        await initDB();
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
        showError('Failed to initialize storage. Some features may not work.', 
                 document.getElementById('form-messages'));
    }
    
    // Setup file preview
    setupFilePreview();
    
    // Setup online/offline detection
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus(); // Initial check
    
    // Handle form submission
    form.addEventListener('submit', handleRegistrationSubmit);
    
    console.log('Registration form initialized');
});