import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { TPost, TPosts } from "src/types"

const POSTS_DIR = path.join(process.cwd(), "content", "posts")

export async function getPosts(): Promise<TPosts> {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))

  const posts: TPosts = files.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(fileContent)

    const slug = data.slug || filename.replace(/\.mdx$/, "")

    const post: TPost = {
      id: slug,
      slug,
      title: data.title || "Untitled",
      date: { start_date: data.date || "" },
      type: Array.isArray(data.type) ? data.type : [data.type || "Post"],
      status: Array.isArray(data.status)
        ? data.status
        : [data.status || "Public"],
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      category: Array.isArray(data.category)
        ? data.category
        : data.category
          ? [data.category]
          : [],
      summary: data.summary || "",
      author: data.author
        ? [
            {
              id: data.author.id || "",
              name: data.author.name || "",
              profile_photo: data.author.profile_photo || "",
            },
          ]
        : [],
      thumbnail: data.thumbnail || "",
      createdTime: data.date || "",
      fullWidth: data.fullWidth || false,
    }

    return post
  })

  // Sort by date descending
  posts.sort((a, b) => {
    const dateA = new Date(a.date.start_date).getTime()
    const dateB = new Date(b.date.start_date).getTime()
    return dateB - dateA
  })

  return posts
}
