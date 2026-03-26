import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import rehypePrismPlus from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { TPost, PostDetail } from "src/types"

const POSTS_DIR = path.join(process.cwd(), "content", "posts")

export async function getPostBySlug(slug: string): Promise<PostDetail> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrismPlus, { ignoreMissing: true }],
      ],
    },
  })

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

  return {
    ...post,
    mdxSource,
  }
}
