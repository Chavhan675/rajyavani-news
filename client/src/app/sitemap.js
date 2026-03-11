export const dynamic = "force-dynamic"

export default async function sitemap() {

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://rajyavani-news.vercel.app"

  try {

    const newsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news`,
      {
        cache: "no-store"
      }
    )

    const news = await newsRes.json()

    const newsUrls = (news || []).map((item) => ({
      url: `${baseUrl}/news/${item.slug}`,
      lastModified: new Date(
        item.updatedAt || item.createdAt || Date.now()
      ),
      changeFrequency: "daily",
      priority: 0.8
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1
      },
      ...newsUrls
    ]

  } catch (err) {

    console.error("Sitemap error:", err)

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1
      }
    ]

  }

}