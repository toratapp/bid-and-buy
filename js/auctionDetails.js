import createMenu from "./components/createMenu.js";
import { baseUrl, corsEnabledUrl } from "./constants/api.js";
import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utils/storage.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
if (!id) {
  location.href = "/";
}
const auctionDetailsUrl = baseUrl + "listings/" + id + "?_bids=true";
const loader = document.querySelector(".loader");
const h1 = document.querySelector("h1");
const mainImageContainer = document.querySelector(".auction__main-image");
const auctionThumbnailsContainer = document.querySelector(".auction__thumbnails");
const endsAtContainer = document.querySelector(".auction__date-p");
const bidsContainer = document.querySelector(".auction__bids");
const descriptionContainer = document.querySelector(".description__p");

async function getAuction() {
  try {
    const response = await fetch(auctionDetailsUrl);
    const results = await response.json();

    loader.style.display = "none";

    const { title, description, media, endsAt } = results;
    const dateEndsAt = endsAt.substring(0, 10);
    const timeEndsAt = endsAt.substring(11, 16);
    const bidsArray = results.bids;
    for(let i = 0; i < bidsArray.length; i++) {
      const bidderName = bidsArray[i].bidderName;
      const bidAmount = bidsArray[i].amount;

      bidsContainer.innerHTML += `<div class="auction__bid d-flex">
                                      <p class="auction__bidder-name">${bidderName}:</p>
                                      <p class="auction__bid-amount fw-bold">&dollar;${bidAmount}.00</p>
                                    </div>`;
    }

    document.title = `${title} - Bid and buy`
    h1.innerHTML = title;
    if (!media[0] || media[0] === "undefined") {
      media[0] = "https://teidsvag.com/wine-14.jpg";
    }
    if (!media[1] || media[1] === "undefined") {
      media[1] = "https://teidsvag.com/wine-14.jpg";
    }
    if (!media[2] || media[2] === "undefined") {
      media[2] = "https://teidsvag.com/wine-14.jpg";
    }
    if (!media[3] || media[3] === "undefined") {
      media[3] = "https://teidsvag.com/wine-14.jpg";
    }
    mainImageContainer.innerHTML = `<img src="${media[0]}" class="img-fluid mt-2" alt="image" />`;
    auctionThumbnailsContainer.innerHTML = `  <div class="auction__thumbnail-1">
                                                <img
                                                  src="${media[1]}"
                                                  alt="image"
                                                />
                                              </div>
                                              <div class="auction__thumbnail-2">
                                                <img
                                                  src="${media[2]}"
                                                  alt="image"
                                                />
                                              </div>
                                              <div class="auction__thumbnail-3">
                                                <img
                                                  src="${media[3]}"
                                                  alt="image"
                                                />
                                              </div>`;
    endsAtContainer.innerHTML = dateEndsAt + "&nbsp;" + timeEndsAt;
    descriptionContainer.innerHTML = description;
  } catch(error) {
    console.log(error);
    return displayMessage("error", "Unable to fetch auction details", ".auction__main-section");
  }
}

getAuction();

const bidForm = document.querySelector(".auction__bid-input-section");
const bidInput = document.querySelector("#bid-amount");
const bidMessageContainer = document.querySelector(".bid__message-container");

bidForm.addEventListener("submit", submitBidForm);

function submitBidForm(event) {
  event.preventDefault();

  bidMessageContainer.innerHTML = "";

  const bidValue = parseFloat(bidInput.value.trim());

  if (bidValue.length === 0) {
    return displayMessage("error", "Please add a valid value", ".bid__message-container");
  }

  addBid(bidValue);
}

async function addBid(amount) {
  const url = corsEnabledUrl + "listings/" + id + "/bids";

  const data = JSON.stringify({ amount: amount });

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

    if (json.id) {
      bidForm.reset();
      location.reload();
    }

    if (json.error) {
      displayMessage("error", "An error occured", ".bid__message-container");
    }
  }
  catch(error) {
    displayMessage("error", "An error occured", ".bid__message-container");
  }
}
