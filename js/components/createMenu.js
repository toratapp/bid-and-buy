export default function createMenu() {
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
                                      <li class="nav-item nav-border-button p-2 mb-3">
                                        <a class="nav-link text-white" href="index.html">Auctions</a>
                                      </li>
                                      <li class="nav-item nav-border-button p-2 mb-3">
                                        <a class="nav-link text-white" href="#">Buy it now</a>
                                      </li>
                                      <li class="nav-item nav-border-button p-2 mb-3">
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
                                    <li class="nav-item nav-border-button px-2 me-5 my-1">
                                      <a class="nav-link text-white" href="index.html">Auctions</a>
                                    </li>
                                    <li class="nav-item nav-border-button px-2 me-5 my-1">
                                      <a class="nav-link text-white" href="#">Buy it now</a>
                                    </li>
                                    <li class="nav-item nav-border-button px-2 my-1">
                                      <a class="nav-link text-white" href="create-listing.html"
                                        >Sell</a
                                      >
                                    </li>
                                  </ul>
                                </div>
                              </nav>`
}
