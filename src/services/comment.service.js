import axios from 'axios';
import { getTokenByLocalStorage } from '../utilities/manageLocalStorage';
import { getApiUrl } from '../utilities/getBaseUrl';

const baseUrl = getApiUrl();
const baseUrlWithComments = `${baseUrl}/api/comments`;

const bearerParser = (token) => `Bearer ${token}`;

export async function getAllCommentsByTaskId (taskId) {
  console.log(taskId);

  const token = getTokenByLocalStorage();

  console.log(token);

  const response = await axios.get(`${baseUrlWithComments}/${taskId}`, {
    headers: {
      Authorization: bearerParser(token)
    }
  });
  return response.data;
}
