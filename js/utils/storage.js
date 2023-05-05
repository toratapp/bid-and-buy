const accessTokenKey = "accessToken";
const userNameKey = "name";
const creditsKey = "credits";

export function saveToken(accessToken) {
  saveInStorage(accessTokenKey, accessToken);
}

export function getToken() {
  return retrieveFromStorage(accessTokenKey);
}

export function saveUser(name) {
  saveInStorage(userNameKey, name);
}

export function getUserName() {
  const name = retrieveFromStorage(userNameKey);

  if (name) {
      return name;
  }

  return null;
}

function saveInStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function retrieveFromStorage(key) {
  const value = localStorage.getItem(key);

  if(!value) {
      return [];
  }

  return JSON.parse(value);
}
