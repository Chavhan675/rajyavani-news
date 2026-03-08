const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getNews() {

  try {

    const res = await fetch(`${API_URL}/api/news`, {
      cache: "no-store"
    });

    return await res.json();

  } catch (error) {

    console.error("Fetch error:", error);
    return [];

  }

}

export async function getNewsBySlug(slug) {

  try {

    const res = await fetch(`${API_URL}/api/news/${slug}`, {
      cache: "no-store"
    });

    return await res.json();

  } catch (error) {

    console.error("Fetch error:", error);
    return null;

  }

}