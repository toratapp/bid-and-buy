import { corsEnabledUrl } from "./constants/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

const featuredAuctionsUrl = corsEnabledUrl + "listings?_active=true&limit=12";

createMenu();
