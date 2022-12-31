import axios from 'axios';
import { getTokenByLocalStorage } from '../utilities/manageLocalStorage';
import { getApiUrl } from '../utilities/getBaseUrl';
import uploadImage from './image.service';
import { createTaskInProject } from './task.service';

const baseUrl = getApiUrl();
const baseUrlWithProjects = `${baseUrl}/api/projects`;

const bearerParser = (token) => `Bearer ${token}`;

export async function getAllProjects () {
  const token = getTokenByLocalStorage();

  const response = await axios.get(baseUrlWithProjects, {
    headers: {
      Authorization: bearerParser(token)
    }
  });

  return response.data;
}

export async function getProjectById (projectId) {
  const token = getTokenByLocalStorage();

  const response = await axios.get(`${baseUrlWithProjects}/${projectId}`, {
    headers: {
      Authorization: bearerParser(token)
    }
  });

  return response.data;
}

export async function createNewProject ({ repository_url, project_title }) {
  const token = getTokenByLocalStorage();
  return await axios.post(baseUrlWithProjects,
    { repository_url, project_title },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerParser(token)
      }
    }
  );
}

export async function editProject (projectId, { project_title, repository_url }) {
  const token = getTokenByLocalStorage();

  return await axios.patch(`${baseUrlWithProjects}/${projectId}`,
    { repository_url, project_title },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerParser(token)
      }
    }
  );
}

export async function changeProjectLogo (
  projectId,
  file,
  progressCb = () => {}
) {
  const token = getTokenByLocalStorage();
  const upload = await uploadImage(file, progressCb);

  const response = await axios.patch(
    `${baseUrlWithProjects}/${projectId}/logo`,
    {
      logo_url: upload.data.secure_url
    },
    {
      headers: {
        Authorization: bearerParser(token)
      }
    }
  );

  return response.data;
}

export async function createStarterProject () {
  const token = getTokenByLocalStorage();

  const response = await axios.put(baseUrlWithProjects, {}, {
    headers: {
      Authorization: bearerParser(token)
    }
  });

  if (response.data) {
    await createTaskInProject(response.data._id, 'Your First Task!');
    const project = await getProjectById(response.data._id);
    return project;
  }

  return response.data;
}
