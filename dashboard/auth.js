// Authentication configuration
const AUTH = {
    USERNAME: 'admin',
    PASSWORD: 'Plumee2026',
    SESSION_KEY: 'plumee2026_auth_token',
    SESSION_EXPIRY: 12 // hours
};

// Check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem(AUTH.SESSION_KEY);
    if (!token) return false;
    
    const session = JSON.parse(token);
    if (new Date().getTime() > session.expires) {
        localStorage.removeItem(AUTH.SESSION_KEY);
        return false;
    }
    return true;
}

// Set up authentication
function setupAuth() {
    // Redirect to login if not authenticated and not on login page
    if (!window.location.pathname.endsWith('login.html') && !checkAuth()) {
        window.location.href = 'login.html';
        return;
    }

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const usernameError = document.getElementById('username-error');
            const passwordError = document.getElementById('password-error');
            
            // Reset errors
            usernameError.style.display = 'none';
            passwordError.style.display = 'none';
            
            // Basic validation
            if (username !== AUTH.USERNAME) {
                usernameError.style.display = 'block';
                return;
            }
            
            if (password !== AUTH.PASSWORD) {
                passwordError.style.display = 'block';
                return;
            }
            
            // Set session
            const session = {
                user: username,
                expires: new Date().getTime() + (AUTH.SESSION_EXPIRY * 60 * 60 * 1000)
            };
            
            localStorage.setItem(AUTH.SESSION_KEY, JSON.stringify(session));
            window.location.href = 'index.html';
        });
    }

    // Add logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem(AUTH.SESSION_KEY);
            window.location.href = 'login.html';
        });
    }
}

// Logout function
function logout() {
    localStorage.removeItem(AUTH.SESSION_KEY);
    window.location.href = 'login.html';
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', setupAuth);
