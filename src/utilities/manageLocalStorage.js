const TOKEN_KEY = 'devy-projects-token';

export function setTokenByLocalStorage (value) {
  window.localStorage.setItem(TOKEN_KEY, value);
}

export function getTokenByLocalStorage () {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function removeTokenFromLocalStorage () {
  window.localStorage.removeItem(TOKEN_KEY);
}
