import { clearStorage } from "../utils/storage.js";

export default function logoutLink() {
  const link = document.querySelector("#logout-link");

  if(link) {
    link.onclick = function () {
      const confirmLogout = confirm("Do you want to logout?");

      if(confirmLogout) {
        clearStorage();
        location.href = "/";
      }
    };
  }
}