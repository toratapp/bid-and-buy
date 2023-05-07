import createMenu from "./components/createMenu.js";
import { baseUrl, corsEnabledUrl } from "./constants/api.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
if (!id) {
  location.href = "/";
}
const auctionDetailsUrl = baseUrl + "listings/" + id;
const loader = document.querySelector(".loader");
const h1 = document.querySelector("h1");
const mainImageContainer = document.querySelector(".auction__main-image");
const auctionThumbnailsContainer = document.querySelector(".auction__thumbnails");
const endsAtContainer = document.querySelector(".auction__date-p");
const bidForm = document.querySelector(".auction__bid-input-section");
const bidInput = document.querySelector("#bid-amount");
const bidsContainer = document.querySelector(".auction__bids");
const descriptionContainer = document.querySelector(".description__p");

async function getAuction() {
  try {
    const response = await fetch(auctionDetailsUrl);
    const results = response.json();

    loader.style.display = "none";

    const { title, description, media, endsAt } = results;
    const shorterEndsAt = endsAt.slice(0, 16);

    document.title = `${title} - Bid and buy`
    h1.innerHTML = title;
    mainImageContainer.innerHTML = `<img src="${media[0]}" class="img-fluid" alt="image" />`;
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
    if (!media[0]) {
      media[0] = "https://teidsvag.com/wine-14.jpg";
    }
    if (!media[1]) {
      media[1] = "https://teidsvag.com/wine-14.jpg";
    }
    if (!media[2]) {
      media[2] = "https://teidsvag.com/wine-14.jpg";
    }
    if (!media[3]) {
      media[3] = "https://teidsvag.com/wine-14.jpg";
    }
    endsAtContainer.innerHTML = shorterEndsAt;
    descriptionContainer.innerHTML = description;
  } catch(error) {
    console.log(error);
    return displayMessage("error", "Unable to fetch auction details", ".auction__main-section");
  }
}

getAuction();

bidForm.addEventListener("submit", submitBidForm);

function submitBidForm(event) {
  event.preventDefault();
}