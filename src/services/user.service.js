import axios from 'axios';
import { getApiUrl } from '../utilities/getBaseUrl';

const baseUrl = getApiUrl();
const baseUrlWithUsers = `${baseUrl}/api/users`;
const baseUrlWithAuth = `${baseUrl}/api/auth`;

const bearerParser = (token) => `Bearer ${token}`;

export async function getUserDataFromToken (token) {
  return await axios.get(baseUrlWithUsers, {
    headers: {
      Authorization: bearerParser(token)
    }
  });
}

export async function loginWithCredentials (data) {
  return await axios.post(
    `${baseUrlWithAuth}/login`,
    JSON.stringify(data),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

export async function registerNewUser ({ username, password, email }) {
  return await axios.post(
    `${baseUrlWithAuth}/register`, { username, password, email },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
