import { GetServerSideProps } from "next"
import { CONFIG } from "site.config"
import { getPosts } from "src/apis"
import { filterPosts } from "src/libs/utils"

function generateRssItem(post: any): string {
  const link = `https://${CONFIG.link}/${post.slug}`
  const date = new Date(post.date?.start_date || post.createdTime).toUTCString()
  return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${post.summary || ""}]]></description>
      ${post.tags?.map((t: string) => `<category>${t}</category>`).join("\n      ") || ""}
    </item>`
}

function generateRss(posts: any[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${CONFIG.blog.title}</title>
    <link>https://${CONFIG.link}</link>
    <description>${CONFIG.blog.description}</description>
    <language>${CONFIG.lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://${CONFIG.link}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(generateRssItem).join("\n")}
  </channel>
</rss>`
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = filterPosts(await getPosts())
  const rss = generateRss(posts)

  ctx.res.setHeader("Content-Type", "application/xml")
  ctx.res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  ctx.res.write(rss)
  ctx.res.end()

  return { props: {} }
}

const FeedPage = () => null
export default FeedPage
