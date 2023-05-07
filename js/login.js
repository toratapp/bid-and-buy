import displayMessage from "./components/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { corsEnabledUrl } from "./constants/api.js";
import createMenu from "./components/createMenu.js";

createMenu();

const loginForm = document.querySelector(".login__form");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginMessage = document.querySelector(".login__message-container");

loginForm.addEventListener("submit", submitLoginForm);

function submitLoginForm(event) {
  event.preventDefault();

  loginMessage.innerHTML = "";

  const loginEmailValue = loginEmail.value.trim();
  const loginPasswordValue = loginPassword.value.trim();

  if(loginEmailValue.length === 0 || loginPasswordValue.length < 8) {
      return displayMessage("error", "Incorrect email or password", ".login__message-container");
  }

  doLogin(loginEmailValue, loginPasswordValue);
}

async function doLogin(loginEmail, loginPassword) {
  const loginUrl = corsEnabledUrl + "auth/login";

  const loginData = JSON.stringify({ email: loginEmail, password: loginPassword });

  const loginOptions = {
    method: "POST",
    body: loginData,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "",
    }
  };

  try {
    const loginResponse = await fetch(loginUrl, loginOptions);
    const loginJson = await loginResponse.json();

    if(loginJson.name) {
      saveToken(loginJson.accessToken);
      saveUser(loginJson.name);

      location.href = "/";
    }

    if(loginJson.error) {
      return displayMessage("error", "Incorrect email og password", ".login__message-container");
    }
  }
  catch(error) {
    return displayMessage("error", "Invalid email or password", ".login__message-container");
  }
}
