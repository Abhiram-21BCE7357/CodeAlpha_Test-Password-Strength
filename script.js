// Password Strength Checker function
// Function to evaluate password strength
function evaluatePasswordStrength(password) {
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    // Calculate a score based on the criteria
    let score = 0;
    if (length >= 8) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumbers) score++;
    if (hasSpecialChars) score++;

    // Determine the strength message based on the score
    let strength = "Very Weak";

    if (score === 5) {
        strength = "Very Strong";
    } else if (score >= 4) {
        strength = "Strong";
    } else if (score >= 3) {
        strength = "Moderate";
    } else if (score >= 2) {
        strength = "Weak";
    }

    return strength;
}

// Event listener for password input
document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    const passwordStrength = evaluatePasswordStrength(password);

    document.getElementById("password-strength").textContent = passwordStrength;
});


// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const showPasswordButton = document.getElementById("show-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordButton.textContent = "Hide Password";
    } else {
        passwordInput.type = "password";
        showPasswordButton.textContent = "Show Password";
    }
}

// To know the password strength
function checkPasswordStrength(password) {
    const passwordLength = password.length;
    let strength = "Weak";

    if (passwordLength >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
        strength = "Strong";
    } else if (passwordLength >= 6) {
        strength = "Moderate";
    }

    const strengthBar = document.getElementById("strength-bar");
    const passwordLengthSpan = document.getElementById("password-length");
    const passwordStrengthSpan = document.getElementById("password-strength");

    strengthBar.style.width = `${(passwordLength / 12) * 100}%`;
    passwordLengthSpan.textContent = passwordLength;
    passwordStrengthSpan.textContent = strength;

    // Apply color-coded classes based on strength
    strengthBar.className = strength.toLowerCase();
}

// To know the character types
function checkCharacterTypes(password) {
    const types = {
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password),
    };

    document.getElementById("uppercase").textContent = types.uppercase ? "Yes" : "No";
    document.getElementById("lowercase").textContent = types.lowercase ? "Yes" : "No";
    document.getElementById("numbers").textContent = types.numbers ? "Yes" : "No";
    document.getElementById("special").textContent = types.special ? "Yes" : "No";
}

// Event listener for password input
document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    checkCharacterTypes(password);
});

// Function to estimate time to crack password
function estimateTimeToCrack(password) {
    // Estimated guesses per second (adjust as needed)
    const guessesPerSecond = 1000000000; // 1 billion guesses per second

    // Calculate the number of possible combinations
    const characterSet = 26 + 26 + 10 + 32; // Uppercase + Lowercase + Numbers + Special Characters
    const passwordLength = password.length;
    const possibleCombinations = Math.pow(characterSet, passwordLength);

    // Calculate the time to crack in seconds
    const timeToCrackInSeconds = possibleCombinations / guessesPerSecond;

    // Convert time to appropriate units (minutes, hours, years, etc.)
    let timeUnit = "seconds";
    let timeValue = timeToCrackInSeconds;

    if (timeToCrackInSeconds >= 60) {
        timeUnit = "minutes";
        timeValue = timeToCrackInSeconds / 60;

        if (timeValue >= 60) {
            timeUnit = "hours";
            timeValue = timeToCrackInSeconds / 3600;

            if (timeValue >= 24) {
                timeUnit = "days";
                timeValue = timeToCrackInSeconds / 86400;

                if (timeValue >= 365) {
                    timeUnit = "years";
                    timeValue = timeToCrackInSeconds / 31536000; // Assuming 365 days per year
                }
            }
        }
    }

    return `${Math.round(timeValue)} ${timeUnit}`;
}

// Event listener for password input
document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    const timeToCrack = estimateTimeToCrack(password);

    document.getElementById("time-to-crack").textContent = timeToCrack;
});
