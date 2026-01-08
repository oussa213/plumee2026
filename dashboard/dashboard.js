// DOM Elements
const registrationForm = document.getElementById('regForm');
const registrationTable = document.getElementById('registrations-table');
const recentRegistrationsTable = document.getElementById('recent-registrations');
const abstractsTable = document.getElementById('abstracts-table');
const exportCsvBtn = document.getElementById('export-csv');
const exportExcelBtn = document.getElementById('export-excel');
const generateReportBtn = document.getElementById('generate-report');
const filterType = document.getElementById('filter-type');
const filterStatus = document.getElementById('filter-status');
const applyFiltersBtn = document.getElementById('apply-filters');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const registrationModal = document.getElementById('registration-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const printRegistrationBtn = document.getElementById('print-registration');

// State
let registrations = [];
let currentPage = 1;
const itemsPerPage = 10;
let filteredRegistrations = [];

// Initialize dashboard
async function initDashboard() {
    console.log('Initializing dashboard...');
    
    // Load registrations from server
    const success = await loadRegistrations();
    console.log('Data loaded:', success, 'Registrations count:', registrations.length);
    
    // Set up event listeners
    setupEventListeners();
    
    // Show overview section by default
    showSection('overview');
    
    // Update UI
    updateStats();
    updateRecentRegistrations();
    updateRegistrationsTable();
    updateAbstractsTable();
    
    console.log('Dashboard initialized');
    
    // Set up auto-refresh every 30 seconds
    setInterval(refreshRegistrations, 30000);
}

// Load registrations from server API
async function loadRegistrations() {
    try {
        // Try to read from the dashboard/registration.csv file
        const response = await fetch('registration.csv');
        if (response.ok) {
            const csvText = await response.text();
            const parsedData = parseCSVData(csvText);
            
            if (parsedData.length > 0) {
                registrations = parsedData;
                filteredRegistrations = [...registrations];
                console.log('Successfully loaded data from dashboard/registration.csv:', registrations.length, 'registrations');
                return true;
            }
        }
        
        throw new Error('Could not read CSV file');
    } catch (error) {
        console.error('Error loading registrations from CSV:', error);
        console.log('Using hardcoded fallback data');
        // Fallback to hardcoded data
        return loadHardcodedData();
    }
}

// Parse CSV data
function parseCSVData(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const registration = {};
        
        headers.forEach((header, index) => {
            registration[header] = values[index] || '';
        });
        
        // Add ID for frontend compatibility
        registration.id = registration.registration_id || `REG-${i}`;
        
        data.push(registration);
    }
    
    return data;
}

// Parse CSV line
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim().replace(/"/g, ''));
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim().replace(/"/g, ''));
    return result;
}

// Fallback hardcoded data
function loadHardcodedData() {
    const hardcodedData = [];

    registrations = hardcodedData;
    filteredRegistrations = [...registrations];
    console.log('Using hardcoded fallback data:', registrations.length, 'registrations');
    return true;
}

// Save registrations to server API
async function saveRegistrations() {
    try {
        // Convert registrations back to CSV
        const csvContent = convertToCSV(registrations);
        
        // In a real implementation, you'd send this to a server
        // For now, we'll just log it
        console.log('CSV data to save:', csvContent);
        
        // Create a download link for the user to save manually
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'registration.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        
        return true;
    } catch (error) {
        console.error('Error saving registrations:', error);
        return false;
    }
}

// Convert registrations array to CSV
function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvLines = [headers.join(',')];
    
    data.forEach(registration => {
        const values = headers.map(header => {
            const value = registration[header] || '';
            // Quote values that contain commas
            return value.includes(',') ? `"${value}"` : value;
        });
        csvLines.push(values.join(','));
    });
    
    return csvLines.join('\n');
}

// Refresh registrations from server
async function refreshRegistrations() {
    const success = await loadRegistrations();
    if (success) {
        updateStats();
        updateRecentRegistrations();
        updateRegistrationsTable();
        updateAbstractsTable();
    }
    return success;
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.sidebar-nav a[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    // Export buttons
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => exportData('csv'));
    }
    
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', () => exportData('excel'));
    }
    
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generatePdfReport);
    }
    
    // Filtering
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    // Pagination
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => changePage(-1));
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => changePage(1));
    }
    
    // Modal close buttons
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
    }
    
    // Print registration
    if (printRegistrationBtn) {
        printRegistrationBtn.addEventListener('click', printRegistration);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === registrationModal) {
            closeModal();
        }
    });
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
    
    // Update active nav link
    document.querySelectorAll('.sidebar-nav a[data-section]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Update the section content if needed
    if (sectionId === 'registrations') {
        updateRegistrationsTable();
    } else if (sectionId === 'abstracts') {
        updateAbstractsTable();
    } else if (sectionId === 'overview') {
        updateRecentRegistrations();
        updateStats();
    }
}

// Update statistics
function updateStats() {
    // Update total registrations
    if (document.getElementById('total-registrations')) {
        document.getElementById('total-registrations').textContent = registrations.length;
    }
    
    // Update abstracts count
    const abstractsCount = registrations.filter(reg => reg.abstract_title && reg.abstract_title.trim() !== '').length;
    if (document.getElementById('total-abstracts')) {
        document.getElementById('total-abstracts').textContent = abstractsCount;
    }
    
    // Update sidebar badges
    if (document.getElementById('registration-count')) {
        document.getElementById('registration-count').textContent = registrations.length;
    }
    if (document.getElementById('abstract-count')) {
        document.getElementById('abstract-count').textContent = abstractsCount;
    }
    
    // Add topics analysis to overview
    addTopicsAnalysis();
}

// Add topics analysis to overview
function addTopicsAnalysis() {
    const overviewSection = document.getElementById('overview');
    if (!overviewSection) return;
    
    // Get registrations with abstracts
    const registrationsWithAbstracts = registrations.filter(reg => reg.abstract_title && reg.abstract_title.trim() !== '');
    
    // Extract topics from abstract titles
    const topics = {};
    registrationsWithAbstracts.forEach(reg => {
        const title = reg.abstract_title.toLowerCase();
        
        // Extract common topics from titles
        const topicKeywords = [
            'machine learning', 'ai', 'artificial intelligence', 'deep learning',
            'healthcare', 'medical', 'data analytics', 'computer vision',
            'renewable energy', 'sustainability', 'robotics', 'iot',
            'blockchain', 'cybersecurity', 'cloud computing', 'big data'
        ];
        
        topicKeywords.forEach(keyword => {
            if (title.includes(keyword)) {
                topics[keyword] = (topics[keyword] || 0) + 1;
            }
        });
    });
    
    // Create topics section if it doesn't exist
    let topicsSection = document.getElementById('topics-analysis');
    if (!topicsSection) {
        topicsSection = document.createElement('div');
        topicsSection.id = 'topics-analysis';
        topicsSection.className = 'topics-analysis';
        
        // Insert after recent activity
        const recentActivity = overviewSection.querySelector('.recent-activity');
        if (recentActivity) {
            recentActivity.parentNode.insertBefore(topicsSection, recentActivity.nextSibling);
            html += `<div class="stat-item">
                <span class="stat-label">${formatRegistrationType(type)}</span>
                <span class="stat-value">${count}</span>
            </div>`;
        }
        registrationTypes.innerHTML = html;
    }
}

// Update recent registrations table
function updateRecentRegistrations() {
    if (!recentRegistrationsTable) return;

    const tbody = recentRegistrationsTable.querySelector('tbody');
    if (!tbody) return;

    // Clear existing rows
    tbody.innerHTML = '';

    // Sort registrations by date (newest first) and take the first 5
    const recent = [...registrations]
        .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
        .slice(0, 5);

    if (recent.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" class="text-center">No recent registrations</td>';
        tbody.appendChild(row);
        return;
    }

    recent.forEach(registration => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${registration.full_name || ''}</td>
            <td>${registration.affiliation || ''}</td>
            <td>${formatRegistrationType(registration.registration_type)}</td>
            <td><span class="badge ${registration.status === 'confirmed' ? 'bg-success' : registration.status === 'pending' ? 'bg-warning' : 'bg-secondary'}">${registration.status || 'pending'}</span></td>
            <td>${formatDate(registration.submitted_at)}</td>
            <td class="text-center">
                <button onclick="viewRegistration('${registration.id}')" class="btn btn-sm btn-outline-primary">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Update registrations table
function updateRegistrationsTable() {
    if (!registrationTable) return;
    
    const tbody = registrationTable.querySelector('tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (filteredRegistrations.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="9" class="text-center">No registrations found</td>';
        tbody.appendChild(row);
        updatePagination();
        return;
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredRegistrations.length);
    const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex);
    
    // Add rows for each registration
    paginatedRegistrations.forEach((registration, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${registration.full_name || ''}</td>
            <td>${registration.email || ''}</td>
            <td>${registration.affiliation || ''}</td>
            <td>${formatRegistrationType(registration.registration_type)}</td>
            <td>${formatParticipationType(registration.participation_type)}</td>
            <td><span class="badge ${registration.status === 'confirmed' ? 'bg-success' : registration.status === 'pending' ? 'bg-warning' : 'bg-secondary'}">${registration.status || 'pending'}</span></td>
            <td>${formatDate(registration.submitted_at)}</td>
            <td class="text-center">
                <div class="btn-group">
                    <button onclick="viewRegistration('${registration.id}')" class="btn btn-sm btn-outline-primary" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="deleteRegistration('${registration.id}')" class="btn btn-sm btn-outline-danger" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    updatePagination();
}

// Update abstracts table
function updateAbstractsTable() {
    console.log('Updating abstracts table...');
    console.log('Abstracts table element:', abstractsTable);
    
    if (!abstractsTable) {
        console.error('Abstracts table not found!');
        return;
    }

    const tbody = abstractsTable.querySelector('tbody');
    console.log('Table body:', tbody);
    
    if (!tbody) {
        console.error('Table body not found!');
        return;
    }

    // Clear existing rows
    tbody.innerHTML = '';

    // Filter registrations with abstracts
    const registrationsWithAbstracts = registrations.filter(reg => reg.abstract_filename && reg.abstract_filename !== '');
    console.log('Registrations with abstracts:', registrationsWithAbstracts.length);
    console.log('All registrations:', registrations.map(r => ({name: r.full_name, hasAbstract: !!r.abstract_filename})));

    if (registrationsWithAbstracts.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" class="text-center">No abstracts found</td>';
        tbody.appendChild(row);
        return;
    }

    registrationsWithAbstracts.forEach((registration, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${registration.full_name || ''}</td>
            <td>${registration.abstract_title || 'Untitled Abstract'}</td>
            <td>${formatParticipationType(registration.participation_type)}</td>
            <td><span class="badge ${registration.status === 'confirmed' ? 'bg-success' : registration.status === 'pending' ? 'bg-warning' : 'bg-secondary'}">${registration.status || 'pending'}</span></td>
            <td>${formatDate(registration.submitted_at)}</td>
            <td class="text-center">
                <button onclick="downloadAbstract('${registration.id}')" class="btn btn-sm btn-primary">
                    <i class="fas fa-download"></i> Download
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    console.log('Abstracts table updated successfully');
}

// Apply filters
function applyFilters() {
    const typeFilter = filterType ? filterType.value : '';
    const statusFilter = filterStatus ? filterStatus.value : '';
    
    filteredRegistrations = registrations.filter(registration => {
        const matchesType = !typeFilter || registration.registration_type === typeFilter;
        const matchesStatus = !statusFilter || registration.status === statusFilter;
        return matchesType && matchesStatus;
    });
    
    // Reset to first page when filters change
    currentPage = 1;
    updateRegistrationsTable();
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
    currentPage += direction;
    
    // Ensure we don't go out of bounds
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    
    updateRegistrationsTable();
}

// Update pagination controls
function updatePagination() {
    if (!pageInfo) return;
    
    const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Enable/disable pagination buttons
    if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
    if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;
}

// Show registration details in modal
function showRegistrationDetails(registrationId) {
    const registration = registrations.find(reg => reg.id === registrationId);
    if (!registration) {
        alert('Registration not found');
        return;
    }
    
    // Update modal content
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (modalTitle) {
        modalTitle.textContent = `Registration: ${registration.id}`;
    }
    
    if (modalBody) {
        // Create a table with registration details
        let html = `
            <div class="table-responsive">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>${registration.id}</td>
                        </tr>
                        <tr>
                            <th>Full Name</th>
                            <td>${registration.full_name || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>${registration.title || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>${registration.first_name || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>${registration.last_name || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${registration.email || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>${registration.phone || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Country</th>
                            <td>${registration.country || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Affiliation</th>
                            <td>${registration.affiliation || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Position</th>
                            <td>${registration.position || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Registration Type</th>
                            <td>${formatRegistrationType(registration.registration_type)}</td>
                        </tr>
                        <tr>
                            <th>Presentation Type</th>
                            <td>${registration.presentation_type || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Participation Type</th>
                            <td>${formatParticipationType(registration.participation_type)}</td>
                        </tr>`;
        
        // Add abstract details if available
        if (registration.abstract_title || registration.abstract_filename) {
            html += `
                        <tr>
                            <th>Abstract Title</th>
                            <td>${registration.abstract_title || 'N/A'}</td>
                        </tr>`;
            
            if (registration.abstract_filename) {
                html += `
                        <tr>
                            <th>Abstract File</th>
                            <td>
                                <button onclick="downloadAbstract('${registration.id}')" class="btn btn-sm btn-primary">
                                    <i class="fas fa-download"></i> Download Abstract
                                </button>
                            </td>
                        </tr>`;
            }
        }
        
        html += `
                        <tr>
                            <th>Registration Date</th>
                            <td>${formatDate(registration.submitted_at, 'DD/MM/YYYY HH:mm')}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                <span class="badge ${registration.status === 'confirmed' ? 'bg-success' : registration.status === 'pending' ? 'bg-warning' : 'bg-secondary'}">
                                    ${registration.status || 'pending'}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`;
        
        modalBody.innerHTML = html;
    }
    
    // Show the modal
    if (registrationModal) {
        registrationModal.classList.add('show');
        registrationModal.style.display = 'block';
        registrationModal.setAttribute('aria-hidden', 'false');
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
        document.body.classList.add('modal-open');
        
        // Store backdrop reference for later removal
        registrationModal.dataset.backdrop = 'true';
    }
}

// Close modal
function closeModal() {
    if (registrationModal) {
        registrationModal.classList.remove('show');
        registrationModal.style.display = 'none';
        registrationModal.setAttribute('aria-hidden', 'true');
        
        // Remove backdrop if it exists
        if (registrationModal.dataset.backdrop === 'true') {
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            document.body.classList.remove('modal-open');
            registrationModal.removeAttribute('data-backdrop');
        }
    }
}

// Print registration
function printRegistration() {
    window.print();
}

// View registration (alias for showRegistrationDetails)
function viewRegistration(registrationId) {
    showRegistrationDetails(registrationId);
}

// Delete registration (server-side)
async function deleteRegistration(registrationId) {
    if (!confirm('Are you sure you want to delete this registration? This action cannot be undone.')) {
        return;
    }
    
    try {
        const response = await fetch('../api/registrations.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete_registration',
                registration_id: registrationId
            })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            // Refresh data from server
            await refreshRegistrations();
            alert('Registration deleted successfully');
        } else {
            alert('Error deleting registration: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error deleting registration:', error);
        alert('Error deleting registration. Please try again.');
    }
}

// Download abstract (server-side)
function downloadAbstract(registrationId) {
    try {
        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = `../api/download_abstract.php?registration_id=${registrationId}`;
        link.download = ''; // Let the server set the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading abstract:', error);
        alert('Error downloading abstract. Please try again.');
    }
}

// Export data to CSV or Excel
function exportData(format) {
    try {
        window.open(`../api/export.php?format=${format}`, '_blank');
    } catch (error) {
        console.error('Error exporting data:', error);
        alert('Error exporting data. Please try again.');
    }
}


// Generate PDF report (simplified version - would need a proper PDF library for full implementation)
function generatePdfReport() {
    alert('PDF generation would be implemented here with a proper PDF library like jsPDF or similar.');
    // This is a placeholder - in a real implementation, you would use a library like jsPDF
    // to generate a PDF report with the registration data
}

// Helper function to format registration type
function formatRegistrationType(type) {
    if (!type) return 'N/A';
    
    const types = {
        'student': 'Student',
        'academic': 'Academic',
        'industry': 'Industry',
        'attendee': 'Attendee',
        'presenter': 'Presenter'
    };
    
    return types[type.toLowerCase()] || type;
}

// Helper function to format participation type
function formatParticipationType(type) {
    if (!type) return 'N/A';
    
    const types = {
        'attendee': 'Attendee',
        'poster': 'Poster Presentation',
        'oral': 'Oral Presentation'
    };
    
    return types[type.toLowerCase()] || type;
}

// Helper function to format date
function formatDate(dateString, format = 'DD/MM/YYYY') {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year)
        .replace('HH', hours)
        .replace('mm', minutes);
}

// Helper function to get file extension
function getFileExtension(filename) {
    if (!filename) return '';
    return filename.split('.').pop().toLowerCase();
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);

// Make functions available globally for inline event handlers
window.viewRegistration = viewRegistration;
window.deleteRegistration = deleteRegistration;
window.downloadAbstract = downloadAbstract;
