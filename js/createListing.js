import createMenu from "./components/createMenu.js";
import displayMessage from "./components/displayMessage.js";
import { corsEnabledUrl } from "./constants/api.js";
import { getToken } from "./utils/storage.js";

createMenu();

const createListingForm = document.querySelector(".create-listing-form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const tags = document.querySelector("#tags");
const media = document.querySelector("#media");
const endsAt = document.querySelector("#ends-at");
const messageContainer = document.querySelector(".create-listing__message-container");

const todaysDate = new Date().toJSON().slice(0, 16);
endsAt.setAttribute("min", todaysDate);

createListingForm.addEventListener("submit", submitCreateListingForm);

function submitCreateListingForm(event) {
  event.preventDefault();

  messageContainer.innerHTML = "";

  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();
  const tagsValue = tags.value.trim();
  const mediaValue = media.value.trim();
  const endsAtValue = endsAt.value.trim();
  const endsAtDate = new Date(endsAtValue).toJSON();

  if (mediaValue.length === 0) {
    mediaValue = [];
  }

  if (tagsValue.length === 0) {
    tagsValue = [];
  }

  if (titleValue.length === 0 || endsAtValue === 0) {
    return displayMessage("error", "Please fill out the required fields", ".create-listing__message-container");
  }

  createListing(titleValue, descriptionValue, tagsValue, mediaValue, endsAtDate);
}

async function createListing(title, description, tags, media, time) {
  const url = corsEnabledUrl + "listings";

  const data = JSON.stringify({ title: title, description: description, tags: [tags], media: [media], endsAt: time });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": "",
    }
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created) {
      displayMessage("success", "Listing successfully created", ".create-listing__message-container");
      createListingForm.reset();
    }

    if (json.error) {
      displayMessage("error", "An error occured", ".create-listing__message-container");
    }
  }
  catch(error) {
    displayMessage("error", "An error occured", ".create-listing__message-container");
  }
}
