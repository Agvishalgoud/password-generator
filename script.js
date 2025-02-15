const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");
const toggleTheme = document.getElementById("toggleTheme");
const copyMessage = document.getElementById("copyMessage");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const warningMessage = document.createElement("p");
warningMessage.id = "warningMessage";
warningMessage.style.color = "red";
warningMessage.style.display = "none";
generateBtn.insertAdjacentElement("beforebegin", warningMessage);

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function generatePassword() {
    let length = lengthSlider.value;
    let charset = "";
    
    if (document.getElementById("lowercase").checked) charset += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById("uppercase").checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById("numbers").checked) charset += "0123456789";
    if (document.getElementById("symbols").checked) charset += "!@$%^&*()_+-={}[]<>?";
    
    if (charset === "") {
        warningMessage.textContent = "⚠️ Please select at least one option!";
        warningMessage.style.display = "block";
        passwordInput.value = "";
        return;
    }
    
    warningMessage.style.display = "none";
    
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    passwordInput.value = password;
    
    // Animation effects
    passwordInput.style.transform = "scale(0.95)";
    setTimeout(() => {
        passwordInput.style.transform = "scale(1)";
    }, 100);
    
    // Confetti effect
    const container = document.querySelector('.container');
    for(let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animation = `confetti 1s ease-out`;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000);
    }
}

copyBtn.addEventListener("click", () => {
    if (passwordInput.value) {
        navigator.clipboard.writeText(passwordInput.value);
        copyMessage.style.opacity = "1";
        setTimeout(() => {
            copyMessage.style.opacity = "0";
        }, 1000);
    }
});

generateBtn.addEventListener("click", generatePassword);

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleTheme.innerHTML = document.body.classList.contains("dark-mode") 
        ? "☀️ Light Mode" 
        : "🌙 Dark Mode";
});
