import axios from 'axios';
import { getTokenByLocalStorage } from '../utilities/manageLocalStorage';
import { getApiUrl } from '../utilities/getBaseUrl';

const baseUrl = getApiUrl();
const baseUrlWithTasks = `${baseUrl}/api/tasks`;

const bearerParser = (token) => `Bearer ${token}`;

export async function createTaskInProject (projectId, task_description) {
  const token = getTokenByLocalStorage();

  return axios.post(baseUrlWithTasks, {
    task_description,
    project: projectId
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerParser(token)
    }
  }
  );
}

export async function listTasksByProject (projectId) {
  const token = getTokenByLocalStorage();

  const response = await axios.get(`${baseUrlWithTasks}/${projectId}`, {
    headers: {
      Authorization: bearerParser(token)
    }
  });
  console.log('response.data', response.data);
  return response.data;
}

export async function getTaskByTaskId (projectId, taskId) {
  const token = getTokenByLocalStorage();

  return axios.get(`${baseUrlWithTasks}/${projectId}/${taskId}`, {
    headers: {
      Authorization: bearerParser(token)
    }
  });
}

export async function editTaskByTaskId (taskId, task_description, completed = undefined) {
  const token = getTokenByLocalStorage();

  return axios.put(`${baseUrlWithTasks}/${taskId}`,
    { task_description, completed },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerParser(token)
      }
    }
  );
}

export async function toggleTaskByTaskId (taskId) {
  const token = getTokenByLocalStorage();

  return axios.patch(`${baseUrlWithTasks}/${taskId}`, {}, {
    headers: {
      Authorization: bearerParser(token)
    }
  });
}

export async function removeTaskByTaskId (taskId) {
  const token = getTokenByLocalStorage();

  return axios.delete(`${baseUrlWithTasks}/${taskId}`, {
    headers: {
      Authorization: bearerParser(token)
    }
  });
}
