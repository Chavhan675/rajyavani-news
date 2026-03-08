const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all news
export async function getNews() {

  try {

    const res = await fetch(`${API_URL}/api/news`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];

  } catch (error) {

    console.error("Error fetching news:", error);
    return [];

  }

}

// Get single news by slug
export async function getNewsBySlug(slug) {

  try {

    const res = await fetch(`${API_URL}/api/news/${slug}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    return data || null;

  } catch (error) {

    console.error("Error fetching news:", error);
    return null;

  }

}

// Get news by category
export async function getNewsByCategory(category) {

  try {

    const res = await fetch(`${API_URL}/api/news/category/${category}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch category news");
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];

  } catch (error) {

    console.error("Error fetching category news:", error);
    return [];

  }

}