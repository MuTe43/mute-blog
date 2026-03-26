# mute-blog

Personal blog built with Next.js and MDX. Posts are written as local `.mdx` files with frontmatter metadata.

Deployed at [mute-blog.vercel.app](https://mute-blog.vercel.app).

## Getting Started

```bash
yarn install
yarn dev
```

## Adding a Post

Create a new `.mdx` file in `content/posts/`:

```yaml
---
title: "My Post Title"
slug: "my-post-title"
date: "2025-06-15"
status: "Public"
type: "Post"
tags: ["tag1", "tag2"]
category: "General"
summary: "A short description"
thumbnail: ""
fullWidth: false
author:
  name: "Wajdi"
---

Your content here...
```

## MDX Components

You can use these custom components in your posts:

```mdx
<Video src="/path/to/video.mp4" />
<YouTube id="dQw4w9WgXcQ" />
```

## License

MIT
