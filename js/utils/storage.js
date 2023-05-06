const accessTokenKey = "accessToken";
const userNameKey = "name";

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
  } else {
    return null;
  }
}

export function clearStorage() {
  localStorage.clear();
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
