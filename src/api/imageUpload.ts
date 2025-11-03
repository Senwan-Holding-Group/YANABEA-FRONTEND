import api from '.';

export const imageUpload = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/customer/img', formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    }
  });
  return response.data.img_url;
};