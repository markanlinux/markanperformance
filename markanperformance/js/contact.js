const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const successMessage = document.getElementById("form-success");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function spremiUpitULocalStorage(upit) {
  const postojeciUpiti = JSON.parse(localStorage.getItem("markan_upiti")) || [];
  postojeciUpiti.push(upit);
  localStorage.setItem("markan_upiti", JSON.stringify(postojeciUpiti));
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isFormValid = true;

  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (nameValue.length < 2) {
    nameError.textContent = "Unesite ime i prezime (minimalno 2 znaka).";
    isFormValid = false;
  }

  if (!isValidEmail(emailValue)) {
    emailError.textContent = "Unesite ispravnu email adresu.";
    isFormValid = false;
  }

  if (messageValue.length < 10) {
    messageError.textContent = "Poruka mora imati minimalno 10 znakova.";
    isFormValid = false;
  }

  if (!isFormValid) {
    successMessage.hidden = true;
    return;
  }

  const noviUpit = {
    name: nameValue,
    email: emailValue,
    message: messageValue,
    datum: new Date().toLocaleString("hr-HR"),
  };

  spremiUpitULocalStorage(noviUpit);

  form.reset();
  successMessage.hidden = false;
});
