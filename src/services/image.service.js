import axios from 'axios';

export default async function uploadImage (file, progressCb = () => {}) {
  const CL_API = 'https://api.cloudinary.com/v1_1/devyan18/image/upload';
  const CL_PRESET = 'devy-projects';

  const formData = new FormData();

  formData.append('upload_preset', CL_PRESET);
  formData.append('file', file);

  const upload = await axios.post(CL_API, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress (e) {
      progressCb(e);
    }
  });

  return upload;
}

export async function deleteImage (publicId) {
  const CL_API = 'https://api.cloudinary.com/v1_1/devyan18/image/destroy';
  const CL_PRESET = 'devy-projects';

  const formData = new FormData();

  formData.append('upload_preset', CL_PRESET);
  formData.append('public_id', publicId);

  return await axios.post(CL_API, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
