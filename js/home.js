import { baseUrl } from "./constants/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const featuredAuctionsUrl = baseUrl + "listings?_active=true&limit=12&_tag=wine";
const loader = document.querySelector(".loader");
const auctionsContainer = document.querySelector(".auction-cards");

async function getFeaturedAuctions() {
  try {
    const response = await fetch(featuredAuctionsUrl);
    const results = await response.json();

    loader.style.display = "none";
    auctionsContainer.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      const { id, title, description, media } = results[i];

      if (!media[0]) {
        media[0] = "https://teidsvag.com/wine-14.jpg";
      }

      auctionsContainer.innerHTML += `<a href="auction-details.html?id=${id}">
                                        <div class="auction-card">
                                          <img
                                            src="${media[0]}"
                                            class="img-fluid"
                                            alt="image"
                                          />
                                          <h2 class="mt-3">${title}</h2>
                                          <p>${description}</p>
                                        </div>
                                      </a>`;
    }
  }
  catch(error) {
    return displayMessage("error", "Unable to fetch auctions", ".auction-cards");
  }
}

getFeaturedAuctions();

const searchFormBiggerScreens = document.querySelector(".search-form-bigger-screens");
const searchInput = document.querySelector(".searchInput");

searchFormBiggerScreens.addEventListener("submit", submitSearchForm);

function submitSearchForm(event) {
  event.preventDefault();

  const searchValue = searchInput.value.trim();

  doSearch(searchValue);
}

async function doSearch(searchInput) {
  const searchUrl = baseUrl + "listings?_active=true&_tag=" + searchInput;

  try {
    const searchResponse = await fetch(searchUrl);
    const searchJson = await searchResponse.json();
    const h1 = document.querySelector("h1");

    h1.innerHTML = "Search results";

    auctionsContainer.innerHTML = "";

    for (let i = 0; i < searchJson.length; i++) {
      const { id, title, description, media } = searchJson[i];

      if (!media[0]) {
        media[0] = "https://teidsvag.com/wine-14.jpg";
      }

      auctionsContainer.innerHTML += `<a href="auction-details.html?id=${id}">
                                        <div class="auction-card">
                                          <img
                                            src="${media[0]}"
                                            class="img-fluid"
                                            alt="image"
                                          />
                                          <h2 class="mt-3">${title}</h2>
                                          <p>${description}</p>
                                        </div>
                                      </a>`;
    }
  }
  catch(error) {
    return displayMessage("error", "An error occured", ".auction-cards");
  }
}
