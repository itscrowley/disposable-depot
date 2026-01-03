export default function sitemap() {
  return [
    {
      url: 'https://thedisposabledepot.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Agar future mein 'About' page banao, toh yahan add kar dena
  ]
}
