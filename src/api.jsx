import axios from 'axios';

const API_URL = 'https://server-film.onrender.com';

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, post);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (id, cancelToken) => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`, { cancelToken });
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Delete request canceled', error.message);
    } else {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
};