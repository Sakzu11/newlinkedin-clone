import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const api = axios.create({ baseURL: BASE_URL });

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginUser = (email, password) =>
  api.post('/token/', { username: email, password });

export const registerUser = (data) =>
  api.post('/register/', data);

// Posts
export const fetchPosts = () => api.get('/posts/');
export const fetchUserPosts = () => api.get('/posts/user/');
export const createPost = (data) => api.post('/posts/', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const likePost = (id) => api.post(`/posts/${id}/like/`);
export const addComment = (id, content) => api.post(`/posts/${id}/comments/`, { content });
export const deletePost = (id) => api.delete(`/posts/${id}/delete/`);
export const archivePost = (id) => api.post(`/posts/${id}/archive/`);

// Profile
export const fetchProfile = () => api.get('/profile/');
export const updateProfile = (data) => api.patch('/profile/', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Profile sections
export const fetchExperiences = () => api.get('/experiences/');
export const createExperience = (data) => api.post('/experiences/', data);
export const deleteExperience = (id) => api.delete(`/experiences/${id}/`);

export const fetchSkills = () => api.get('/skills/');
export const createSkill = (data) => api.post('/skills/', data);
export const deleteSkill = (id) => api.delete(`/skills/${id}/`);

export const fetchProjects = () => api.get('/projects/');
export const createProject = (data) => api.post('/projects/', data);
export const deleteProject = (id) => api.delete(`/projects/${id}/`);

export const fetchCertificates = () => api.get('/certificates/');
export const createCertificate = (data) => api.post('/certificates/', data);
export const deleteCertificate = (id) => api.delete(`/certificates/${id}/`);

export const fetchLinks = () => api.get('/links/');
export const createLink = (data) => api.post('/links/', data);
export const deleteLink = (id) => api.delete(`/links/${id}/`);

// Jobs
export const fetchJobs = () => api.get('/jobs/');
export const searchJobs = (title, location) => api.get(`/jobs/?search=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`);
export const createJob = (data) => api.post('/jobs/', data);

// Events
export const fetchEvents = () => api.get('/events/');
export const createEvent = (data) => api.post('/events/', data);

// Groups
export const fetchGroups = () => api.get('/groups/');
export const joinGroup = (id) => api.post(`/groups/${id}/join/`);

// Newsletters
export const fetchNewsletters = () => api.get('/newsletters/');
export const createNewsletter = (data) => api.post('/newsletters/', data);

export default api;

// Google OAuth
export const googleLogin = (token) =>
  api.post('/auth/google/', { token });
