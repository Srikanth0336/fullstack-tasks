const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('emailError');
const loginBtn = document.getElementById('loginBtn');
const loader = document.getElementById('loader');
const submitText = document.getElementById('submitText');
const apiResponse = document.getElementById('apiResponse');
const toggleForm = document.getElementById('toggleForm');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const emailGroup = document.getElementById('emailGroup');
const toggleTextLabel = document.getElementById('toggleText');

let isLoginMode = true;

// Toggle Login/Register
toggleForm.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    toggleUI();
});

function toggleUI() {
    if (isLoginMode) {
        formTitle.textContent = "Welcome Back";
        formSubtitle.textContent = "Please enter your details to sign in";
        submitText.textContent = "Sign In";
        emailGroup.style.display = 'none';
        toggleTextLabel.innerHTML = `Don't have an account? <a href="#" id="toggleForm">Register Now</a>`;
    } else {
        formTitle.textContent = "Create Account";
        formSubtitle.textContent = "Join us to start managing your data";
        submitText.textContent = "Sign Up";
        emailGroup.style.display = 'block';
        toggleTextLabel.innerHTML = `Already have an account? <a href="#" id="toggleForm">Login Now</a>`;
    }
    // Re-attach listener because innerHTML wipes it
    document.getElementById('toggleForm').addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        toggleUI();
    });
}

// Real-time validation
usernameInput.addEventListener('input', validateUsername);
passwordInput.addEventListener('input', validatePassword);
emailInput.addEventListener('input', validateEmail);

function validateUsername() {
    const value = usernameInput.value.trim();
    if (value === '') {
        showError(usernameError, "Username is required");
        return false;
    } else if (value.length < 3) {
        showError(usernameError, "Must be at least 3 characters");
        return false;
    } else {
        hideError(usernameError);
        return true;
    }
}

function validatePassword() {
    const value = passwordInput.value;
    if (value === '') {
        showError(passwordError, "Password is required");
        return false;
    } else if (value.length < 6) {
        showError(passwordError, "Must be at least 6 characters");
        return false;
    } else {
        hideError(passwordError);
        return true;
    }
}

function validateEmail() {
    if (isLoginMode) return true;
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === '') {
        showError(emailError, "Email is required");
        return false;
    } else if (!emailRegex.test(value)) {
        showError(emailError, "Enter a valid email");
        return false;
    } else {
        hideError(emailError);
        return true;
    }
}

function showError(element, message) {
    element.textContent = message;
    element.classList.add('visible');
}

function hideError(element) {
    element.textContent = "";
    element.classList.remove('visible');
}

// Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const isUValid = validateUsername();
    const isPValid = validatePassword();
    const isEValid = validateEmail();
    
    if (!isUValid || !isPValid || !isEValid) return;

    setLoading(true);
    apiResponse.style.display = 'none';

    const url = isLoginMode ? '/api/login' : '/api/register';
    const payload = {
        username: usernameInput.value.trim(),
        password: passwordInput.value
    };
    if (!isLoginMode) payload.email = emailInput.value.trim();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            showAPIResponse(data.message, 'success');
            if (isLoginMode) {
                setTimeout(() => alert(`Welcome, ${usernameInput.value}!`), 500);
            } else {
                // Switch to login after registration
                setTimeout(() => {
                    isLoginMode = true;
                    toggleUI();
                }, 1500);
            }
        } else {
            showAPIResponse(data.message || 'Operation failed', 'error');
        }
    } catch (error) {
        showAPIResponse('Unable to connect to server', 'error');
    } finally {
        setLoading(false);
    }
});

function setLoading(isLoading) {
    loginBtn.disabled = isLoading;
    submitText.style.display = isLoading ? 'none' : 'block';
    loader.style.display = isLoading ? 'block' : 'none';
}

function showAPIResponse(message, type) {
    apiResponse.textContent = message;
    apiResponse.className = `response-banner ${type}`;
    apiResponse.style.display = 'block';
}
