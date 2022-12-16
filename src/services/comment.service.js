import axios from 'axios';
import { getTokenByLocalStorage } from '../utilities/manageLocalStorage';
import { getApiUrl } from '../utilities/getBaseUrl';

const baseUrl = getApiUrl();
const baseUrlWithComments = `${baseUrl}/api/comments`;

const bearerParser = (token) => `Bearer ${token}`;

export async function getAllCommentsByTaskId (taskId) {
  const token = getTokenByLocalStorage();

  const response = await axios.get(`${baseUrlWithComments}/${taskId}`, {
    headers: {
      Authorization: bearerParser(token)
    }
  });
  return response.data;
}

export async function createNewComment (taskId, content) {
  const token = getTokenByLocalStorage();

  const response = await axios.post(`${baseUrlWithComments}`, { content, task: taskId }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerParser(token)
    }
  });
  return response.data;
}
