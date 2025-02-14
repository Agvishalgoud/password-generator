const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");
const toggleTheme = document.getElementById("toggleTheme");
const copyMessage = document.getElementById("copyMessage");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const warningMessage = document.createElement("p");  // Create warning message element
warningMessage.id = "warningMessage";
warningMessage.style.color = "red";
warningMessage.style.display = "none";  // Initially hidden
generateBtn.insertAdjacentElement("beforebegin", warningMessage); // Insert above Generate Button

// Update length value display
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

// Generate Password Function
function generatePassword() {
    let length = lengthSlider.value;
    let charset = "";

    if (document.getElementById("lowercase").checked) charset += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById("uppercase").checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById("numbers").checked) charset += "0123456789";
    if (document.getElementById("symbols").checked) charset += "!@$%^&*()_+-={}[]<>?";

    // Show warning if no option is selected
    if (charset === "") {
        warningMessage.textContent = "⚠️ Invalid Input! Please select at least one option.";
        warningMessage.style.display = "block";
        passwordInput.value = "";
        return;
    }

    // Hide warning if valid input
    warningMessage.style.display = "none";

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    passwordInput.value = password;
}

// Copy Password Function
copyBtn.addEventListener("click", () => {
    if (passwordInput.value) {
        navigator.clipboard.writeText(passwordInput.value);
        copyMessage.style.opacity = "1";
        setTimeout(() => {
            copyMessage.style.opacity = "0";
        }, 1000);
    }
});

// Generate Password on Button Click
generateBtn.addEventListener("click", generatePassword);

// Toggle Theme Function
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleTheme.innerHTML = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
