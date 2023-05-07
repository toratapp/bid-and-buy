import { corsEnabledUrl } from "../constants/api.js";
import { getToken, getUserName } from "../utils/storage.js";
import logoutLink from "./logoutLink.js";

export default async function createMenu() {
  const { pathname } = document.location;

  const menuContainer = document.querySelector(".menu-container");

  menuContainer.innerHTML = ` <nav class="navbar navbar-expand-lg navbar-small-screens d-lg-none">
                                <div class="container">
                                  <a class="navbar-brand logo" href="index.html">
                                    <img src="images/logo.svg" alt="Bid and buy logo" />
                                  </a>
                                  <button
                                    class="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                  >
                                    <span class="navbar-toggler-icon"></span>
                                  </button>
                                  <div
                                    class="collapse navbar-collapse p-3 mt-2"
                                    id="navbarSupportedContent"
                                  >
                                    <form class="d-flex" role="search">
                                      <input
                                        class="form-control"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                      />
                                      <button class="btn btn-primary" type="submit">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                      </button>
                                    </form>
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 pt-3">
                                      <li class="${pathname.toString().includes("auction-details") ? "nav-item nav-border-button p-2 mb-3 active" : "nav-item nav-border-button p-2 mb-3"}">
                                        <a class="nav-link text-white" href="index.html">Auctions</a>
                                      </li>
                                      <li class="nav-item nav-border-button p-2 mb-3">
                                        <a class="nav-link text-white" href="#">Buy it now</a>
                                      </li>
                                      <li class="${pathname === "/create-listing.html" ? "nav__create-listing nav-item nav-border-button p-2 mb-3 active" : "nav__create-listing nav-item nav-border-button p-2 mb-3"}">
                                        <a class="nav-link text-white" href="create-listing.html"
                                          >Sell</a
                                        >
                                      </li>
                                      <li class="nav-item">
                                        <a class="nav-link text-white" href="login.html">Login</a>
                                      </li>
                                      <li class="nav-item">
                                        <a class="nav-link text-white" href="sign-up.html">Sign up</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </nav>
                              <nav
                                class="navbar navbar-expand-lg navbar-one-bigger-screens d-none d-lg-block"
                              >
                                <div class="container">
                                  <a class="navbar-brand logo" href="index.html">
                                    <img src="images/logo.svg" alt="Bid and buy logo" />
                                  </a>
                                  <form class="d-flex" role="search">
                                    <input
                                      class="form-control"
                                      type="search"
                                      placeholder="Search"
                                      aria-label="Search"
                                    />
                                    <button class="btn btn-primary" type="submit">
                                      <i class="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                  </form>
                                  <ul class="navbar-nav">
                                    <li class="nav-item">
                                      <a class="nav-link text-black" href="login.html">Login</a>
                                    </li>
                                    <li class="nav-item">
                                      <a class="nav-link text-black" href="sign-up.html">Sign up</a>
                                    </li>
                                  </ul>
                                </div>
                              </nav>
                              <nav
                                class="navbar navbar-expand-lg navbar-two-bigger-screens d-none d-lg-block"
                              >
                                <div class="container">
                                  <ul class="navbar-nav me-auto mb-lg-0">
                                    <li class="${pathname.toString().includes("auction-details") ? "nav-item nav-border-button px-2 me-5 my-1 active" : "nav-item nav-border-button px-2 me-5 my-1"}">
                                      <a class="nav-link text-white" href="index.html">Auctions</a>
                                    </li>
                                    <li class="nav-item nav-border-button px-2 me-5 my-1">
                                      <a class="nav-link text-white" href="#">Buy it now</a>
                                    </li>
                                    <li class="${pathname === "/create-listing.html" ? "nav__create-listing nav-item nav-border-button px-2 my-1 active" : "nav__create-listing nav-item nav-border-button px-2 my-1"}">
                                      <a class="nav-link text-white" href="create-listing.html"
                                        >Sell</a
                                      >
                                    </li>
                                  </ul>
                                </div>
                              </nav>`;

  async function getCreditAmount() {
    const userName = getUserName();
    const accountInfoContainer = document.querySelector("#account-info-container");
  
    if(!userName || userName === [] || userName.length === 0) {
      return accountInfoContainer.style.display = "none";
    } else {
      const token = getToken();
      const creditAmountUrl = corsEnabledUrl + "profiles/" + userName + "/credits";
      const creditsOptions = {
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-Requested-With": "",
        }
      };

      try {
        const creditsResponse = await fetch(creditAmountUrl, creditsOptions);
        const creditsJson = await creditsResponse.json();
        return creditsJson.credits;
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  const userName = getUserName();
  const accountInfoContainer = document.querySelector("#account-info-container");
  const createListingButtons = document.querySelectorAll(".nav__create-listing");

  createListingButtons.forEach((button) => {
    if (!userName || userName === [] || userName.length === 0) {
      button.classList.add("d-none");
    } else {
      button.classList.remove("d-none");
    }
  });

  if (!userName || userName === [] || userName.length === 0) {
    return accountInfoContainer.style.display = "none";
  } else {
    const creditAmount = await getCreditAmount();
  
    accountInfoContainer.innerHTML = `<div class="header__username-and-credits">
                                        <a href="my-account.html" class="my-account-link d-flex"><i class="fa-solid fa-user my-account-user-icon"></i><p>${userName}</p></a>
                                        <p>Your credits: ${creditAmount}</p>
                                        <a id="logout-link" class="text-link">Logout</a>
                                      </div>`;
  logoutLink();
  }
}
