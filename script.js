// Get the form element and add an event listener to handle form submission
const form = document.querySelector('.signup-form');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting to the server

    // Get values from the input fields
    const firstName = document.querySelector('input[placeholder="First Name"]').value.trim();
    const lastName = document.querySelector('input[placeholder="Last Name"]').value.trim();
    const email = document.querySelector('input[placeholder="Email"]').value.trim();
    const phone = document.querySelector('input[placeholder="Phone"]').value.trim();
    const password = document.querySelector('input[placeholder="Password"]').value.trim();

    // Clear previous error messages
    clearErrors();

    // Validate the form fields
    const isValid = validateForm(firstName, lastName, email, phone, password);

    // If the form is valid, log the data as an object in the console
    if (isValid) {
        const formData = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phone,
            email: email,
            password: password
        };
        console.log(formData);
        alert('Form submitted successfully!');
    }
});

// Function to validate the form fields
function validateForm(firstName, lastName, email, phone, password) {
    let isValid = true;

    // Validate first name (required)
    if (firstName === "") {
        showError('input[placeholder="First Name"]', 'First name is required.');
        isValid = false;
    }

    // Validate last name (required)
    if (lastName === "") {
        showError('input[placeholder="Last Name"]', 'Last name is required.');
        isValid = false;
    }

    // Validate email (must be in correct format)
    if (!validateEmail(email)) {
        showError('input[placeholder="Email"]', 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate phone (must be a valid phone number format)
    if (!validatePhone(phone)) {
        showError('input[placeholder="Phone"]', 'Please enter a valid phone number.');
        isValid = false;
    }

    // Validate password (minimum 8 characters)
    if (password.length < 8) {
        showError('input[placeholder="Password"]', 'Password must be at least 8 characters long.');
        isValid = false;
    }

    return isValid;
}

// Function to display error messages for each field
function showError(selector, message) {
    const inputElement = document.querySelector(selector);
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.innerText = message;
    inputElement.parentElement.appendChild(errorMessage);
}

// Clear all error messages
function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(function (error) {
        error.remove();
    });
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate phone number (example: simple numeric check)
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    return phoneRegex.test(phone);
}
