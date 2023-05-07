import { corsEnabledUrl } from "./constants/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const featuredAuctionsUrl = corsEnabledUrl + "listings?_active=true&limit=12&_tag=wine";
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

      auctionsContainer.innerHTML += `<a href="auction-details.html/${id}">
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
