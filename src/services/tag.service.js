import axios from 'axios';
import { getTokenByLocalStorage } from '../utilities/manageLocalStorage';
import { getApiUrl } from '../utilities/getBaseUrl';

const baseUrl = getApiUrl();
const baseUrlWithTags = `${baseUrl}/api/tags`;

const bearerParser = (token) => `Bearer ${token}`;

export async function createNewTag ({ tag_name, tag_color, white_font }) {
  const token = getTokenByLocalStorage();

  return await axios.post(baseUrlWithTags,
    { tag_name, tag_color, white_font }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerParser(token)
      }
    }
  );
}

export async function listTags () {
  const token = getTokenByLocalStorage();

  return await axios.get(baseUrlWithTags, {
    headers: {
      Authorization: bearerParser(token)
    }
  });
}
