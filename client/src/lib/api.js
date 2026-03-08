import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default API;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getNews() {

  const res = await fetch(`${API_URL}/api/news`);

  return res.json();

}

export async function getNewsBySlug(slug) {

  const res = await fetch(`${API_URL}/api/news/${slug}`);

  return res.json();

}

/* ================= NEWS ================= */

// get all news
export const getLatestNews = () => API.get("/news");

// get single news
export const getNewsBySlug = (slug) =>
  API.get(`/news/${slug}`);

// category news
export const getNewsByCategory = (category) =>
  API.get(`/news/category/${category}`);

// trending news
export const getTrendingNews = () =>
  API.get("/news/trending");

// latest news
export const getRecentNews = () =>
  API.get("/news/recent");

// search news
export const searchNews = (query) =>
  API.get(`/news/search?q=${query}`);

// related news
export const getRelatedNews = (category) =>
  API.get(`/news/related/${category}`);



/* ================= ADMIN ================= */

// create news
export const createNews = (data) =>
  API.post("/news", data);

// update news
export const updateNews = (id, data) =>
  API.put(`/news/${id}`, data);

// delete news
export const deleteNews = (id) =>
  API.delete(`/news/${id}`);

// get all news for admin
export const getAdminNews = () =>
  API.get("/admin/news");



/* ================= CATEGORY ================= */

// get all categories
export const getCategories = () =>
  API.get("/categories");

// create category
export const createCategory = (data) =>
  API.post("/categories", data);

// delete category
export const deleteCategory = (id) =>
  API.delete(`/categories/${id}`);



/* ================= AUTH ================= */

// login
export const loginUser = (data) =>
  API.post("/auth/login", data);

// register
export const registerUser = (data) =>
  API.post("/auth/register", data);

// logout
export const logoutUser = () =>
  API.post("/auth/logout");

// current user
export const getProfile = () =>
  API.get("/auth/profile");



/* ================= USER ================= */

// update profile
export const updateProfile = (data) =>
  API.put("/users/profile", data);

// user submitted news
export const getUserNews = () =>
  API.get("/users/news");



/* ================= COMMENTS ================= */

// add comment
export const addComment = (data) =>
  API.post("/comments", data);

// get comments
export const getComments = (newsId) =>
  API.get(`/comments/${newsId}`);

// delete comment
export const deleteComment = (id) =>
  API.delete(`/comments/${id}`);



/* ================= EARNINGS ================= */

// get earnings
export const getEarnings = () =>
  API.get("/earnings");

// withdraw earnings
export const withdrawEarnings = (data) =>
  API.post("/earnings/withdraw", data);



/* ================= SUBMIT NEWS ================= */

// submit news by user
export const submitNews = (data) =>
  API.post("/submit-news", data);

// get submitted news
export const getSubmittedNews = () =>
  API.get("/submit-news");