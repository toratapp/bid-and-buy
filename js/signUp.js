import displayMessage from "./components/displayMessage.js";
import { corsEnabledUrl } from "./constants/api.js";
import createMenu from "./components/createMenu.js";

createMenu();

const signUpForm = document.querySelector(".sign-up__form");
const signUpName = document.querySelector("#sign-up-name");
const signUpEmail = document.querySelector("#sign-up-email");
const signUpPassword = document.querySelector("#sign-up-password");
const avatar = document.querySelector("#avatar");
const signUpMessage = document.querySelector(".sign-up__message-container");

signUpForm.addEventListener("submit", submitSignUpForm);

function submitSignUpForm(event) {
  event.preventDefault();

  signUpMessage.innerHTML = "";

  const signUpNameValue = signUpName.value.trim();
  const signUpEmailValue = signUpEmail.value.trim();
  const signUpPasswordValue = signUpPassword.value.trim();
  const avatarValue = avatar.value.trim();

  if(signUpNameValue.length === 0 || signUpEmailValue.length === 0 || signUpPasswordValue.length < 8 || avatarValue === 0) {
      return displayMessage("error", "Please fill out all of the fields", ".sign-up__message-container");
  }

  doSignUp(signUpNameValue, signUpEmailValue, signUpPasswordValue, avatarValue);
}

async function doSignUp(signUpName, signUpEmail, signUpPassword, avatar) {
  const signUpUrl = corsEnabledUrl + "auth/register";

  const signUpData = JSON.stringify({ name: signUpName, email: signUpEmail, password: signUpPassword, avatar: avatar });

  const signUpOptions = {
    method: "POST",
    body: signUpData,
    headers: {
      "Content-Type": "application/json"
    },
  };

  try {
    const signUpResponse = await fetch(signUpUrl, signUpOptions);
    const signUpJson = await signUpResponse.json();

    if(signUpJson.name) {
      location.href = "/login.html";
    }

    if(signUpJson.error) {
      return displayMessage("error", "Please fill out all of the fields", ".sign-up__message-container");
    }
  }
  catch(error) {
    return displayMessage("error", "Please fill out all of the fields", ".sign-up__message-container");
  }
}
