const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");
const fullNameInput = document.getElementById("fullname");
const doubleInput = document.querySelector(".double-input");
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const errorIcon = emailInput.parentElement.querySelector(".error-icon");
const successIcon = emailInput.parentElement.querySelector(".success-icon");
const passwordInput = document.getElementById("passwordR");
const passwordStrengthBars = document.querySelectorAll(
  ".password-strength .bar"
);
const passwordStrengthText = document.querySelector(".password-strength-text");
const showPasswordIcon = document.querySelector(".show-password");
const registerForm = document.getElementById("registerForm");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});
loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

fullNameInput.addEventListener("focus", () => {
  fullNameInput.style.display = "none";
  doubleInput.style.display = "flex";
});

firstNameInput.addEventListener("blur", () => {
  if (firstNameInput.value === "" && lastNameInput.value === "") {
    doubleInput.style.display = "none";
    fullNameInput.style.display = "block";
  }
});

lastNameInput.addEventListener("blur", () => {
  if (firstNameInput.value === "" && lastNameInput.value === "") {
    doubleInput.style.display = "none";
    fullNameInput.style.display = "block";
  }
});

emailInput.addEventListener("blur", () => {
  const email = emailInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    // إذا كان الإيميل غير صحيح
    emailError.textContent = "the email is not valid";
    emailError.style.display = "block";
    errorIcon.style.display = "block";
    successIcon.style.display = "none";
  } else {
    // إذا كان الإيميل صحيحًا
    emailError.style.display = "none";
    errorIcon.style.display = "none";
    successIcon.style.display = "block";
  }
});

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const strength = checkPasswordStrength(password);

  updatePasswordStrengthBars(strength);
  updatePasswordStrengthText(strength);
});

function checkPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return strength;
}

function updatePasswordStrengthBars(strength) {
  passwordStrengthBars.forEach((bar, index) => {
    if (index < strength) {
      bar.classList.remove("red", "orange", "green");
      if (strength === 1) {
        bar.classList.add("red");
      } else if (strength === 2) {
        bar.classList.add("orange");
      } else if (strength === 3) {
        bar.classList.add("green");
      }
    } else {
      bar.classList.remove("red", "orange", "green");
    }
  });

  if (strength > 0) {
    document.querySelector(".password-strength").style.display = "flex";
  } else {
    document.querySelector(".password-strength").style.display = "none";
  }
}

function updatePasswordStrengthText(strength) {
  if (strength === 1) {
    passwordStrengthText.textContent = "Weak";
    passwordStrengthText.style.color = "red";
    passwordStrengthText.style.display = "block";
  } else if (strength === 2) {
    passwordStrengthText.textContent = "Medium";
    passwordStrengthText.style.color = "orange";
    passwordStrengthText.style.display = "block";
  } else if (strength === 3) {
    passwordStrengthText.textContent = "Strong";
    passwordStrengthText.style.color = "green";
    passwordStrengthText.style.display = "block";
  } else {
    passwordStrengthText.style.display = "none";
  }
}

showPasswordIcon.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordIcon.classList.remove("bx-show");
    showPasswordIcon.classList.add("bx-hide");
  } else {
    passwordInput.type = "password";
    showPasswordIcon.classList.remove("bx-hide");
    showPasswordIcon.classList.add("bx-show");
  }
});
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Register button clicked");

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const passwordStrength = checkPasswordStrength(password);
  if (passwordStrength < 3) {
    alert("Password is too weak. Please use a stronger password.");
    return;
  }

  const existingData = JSON.parse(localStorage.getItem("userData"));
  if (existingData && existingData.email === email) {
    alert("You are already registered with this email!");
    return;
  }

  const fullName = `${firstName} ${lastName}`;
  const userData = {
    fullName,
    email,
    password,
  };

  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Registration successful!");

  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  errorIcon.style.display = "none";
  successIcon.style.display = "none";
  document.querySelector(".password-strength").style.display = "none";
  passwordStrengthText.style.display = "none";

  container.classList.remove("active");
});
