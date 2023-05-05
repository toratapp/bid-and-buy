import { corsEnabledUrl } from "../constants/api.js";
import { getToken, getUserName } from "./storage.js";

export async function getCreditAmount() {
  const username = getUserName();
  const token = getToken();

  const creditAmountUrl = corsEnabledUrl + "profiles/" + username + "/credits";

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
