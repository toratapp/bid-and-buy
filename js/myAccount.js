import createMenu from "./components/createMenu.js";
import { corsEnabledUrl } from "./constants/api.js";
import { getToken, getUserName } from "./utils/storage.js";
import displayMessage from "./components/displayMessage.js";

createMenu();

const currentAvatarFunction = async function getCurrentAvatar() {
  const token = getToken();
  const userName = getUserName();
  const getAvatarUrl = corsEnabledUrl + "profiles/" + userName;
  const currentAvatarMessageContainer = document.querySelector(".current-avatar__message-container");

  currentAvatarMessageContainer.innerHTML="";

  const avatarOptions = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "X-Requested-With": "",
    }
  };

  try {
    const avatarResponse = await fetch(getAvatarUrl, avatarOptions);
    const avatarJson = await avatarResponse.json();
    return avatarJson.avatar;
  }
  catch(error) {
    console.log(error);
    displayMessage("error", "An error occured", ".current-avatar__message-container");
  }
}

const currentAvatar = await currentAvatarFunction();

const currentAvatarContainer = document.querySelector(".current-avatar-container");
currentAvatarContainer.innerHTML = `<p class="mt-5">Current avatar:</p>
                                    <img src="${currentAvatar}" alt="profile-avatar" />`;

const updateAvatarForm = document.querySelector(".update-avatar-form");
const updateAvatarInput = document.querySelector("#updateAvatar");
const updateAvatarMessageContainer = document.querySelector(".update-avatar__message-container");

updateAvatarForm.addEventListener("submit", submitAvatarForm);

async function submitAvatarForm(event) {
  event.preventDefault();

  updateAvatarMessageContainer.innerHTML = "";

  const updateAvatarValue = updateAvatarInput.value.trim();

  if (updateAvatarValue.length === 0) {
    return displayMessage("error", "Please submit a valid URL", ".update-avatar__message-container");
  }

  updateAvatar(updateAvatarValue);
}

async function updateAvatar(newAvatarUrl) {
  const token = getToken();
  const userName = getUserName();
  const getAvatarUrl = corsEnabledUrl + "profiles/" + userName + "/media";
  const data = JSON.stringify({ avatar: newAvatarUrl });

  const updateAvatarOptions = {
    method: "PUT",
    body: data,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": ""
    }
  };

  try {
    const avatarResponse = await fetch(getAvatarUrl, updateAvatarOptions);
    const avatarJson = await avatarResponse.json();

    if (avatarJson.avatar) {
      updateAvatarForm.reset();
      location.reload();
    }

    if (avatarJson.error) {
      displayMessage("error", "An error occured", ".update-avatar__message-container");
    }
  }
  catch(error) {
    displayMessage("error", "An error occured", ".update-avatar__message-container");
  }
}
