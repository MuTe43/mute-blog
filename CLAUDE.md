# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install        # install dependencies
yarn dev            # local dev server (next dev, port 3000)
yarn build          # production build + sitemap generation
yarn lint           # ESLint via next lint
yarn start          # serve production build locally
```

On systems without global yarn, use `npx --yes yarn <command>`.

No environment variables are required. Optional: `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`, `NEXT_PUBLIC_UTTERANCES_REPO`.

## Architecture

Next.js 13 static blog using the **Pages Router**. Content is authored as local MDX files — no external CMS. Deployed on Vercel.

### Content Layer

Blog posts live in `content/posts/*.mdx` with YAML frontmatter. The frontmatter schema maps to the `TPost` type in `src/types/index.ts`. Key fields: `title`, `slug`, `date`, `status` (Public/Private/PublicOnDetail), `type` (Post/Paper/Page), `tags`, `category`, `summary`.

Frontmatter scalars are wrapped into arrays by the data layer to match the type system (e.g., `type: "Post"` becomes `type: ["Post"]`). This is intentional — downstream code like `filterPosts` and `PostCard` accesses `post.type[0]`, `post.status[0]`, etc.

### Data Flow

`src/apis/mdx/getPosts.ts` reads all MDX files via `fs` + `gray-matter` and returns `TPost[]`. `src/apis/mdx/getPostBySlug.ts` reads a single file, serializes the MDX body with `next-mdx-remote/serialize` (with remark-gfm, rehype-prism-plus, rehype-slug, rehype-autolink-headings), and returns `PostDetail` (TPost + `mdxSource`).

Both run only at build time inside `getStaticProps`. Data is prefetched into **React Query** (`@tanstack/react-query`) and hydrated on the client via the dehydrate/Hydrate pattern in `_app.tsx`. Client-side hooks (`usePostsQuery`, `usePostQuery`) read from cache with `enabled: false` — they never refetch.

### Rendering

Posts render via `<MDXRemote>` in `src/routes/Detail/components/MdxRenderer/`. Custom MDX components (Video, YouTube, img, a) are defined in `mdxComponents.tsx`. Posts with `type: "Page"` render through `PageDetail` (no header/footer/comments), while `type: "Post"` renders through `PostDetail` (with header, footer, comments).

### Styling

Emotion CSS-in-JS (`@emotion/styled` + `css` prop). The `jsxImportSource` in tsconfig is set to `@emotion/react`. Theme tokens (colors from Radix UI, breakpoints, z-indexes) are in `src/styles/`. Dark/light mode via `useScheme` hook + cookie persistence.

### Configuration

All site settings (profile, blog metadata, plugins, social links) are in `site.config.js` at the project root. This is the single source of truth for customization — components import `CONFIG` from it directly.

### Key Patterns

- **Post filtering**: `src/libs/utils/filterPosts.ts` filters by status, type, and date validity. Used in both `index.tsx` and `[slug].tsx` with different filter options.
- **Tags/Categories**: Aggregated client-side from the posts array via `getAllSelectItemsFromPosts` in `src/libs/utils/`. Feed page supports URL query params (`?tag=`, `?category=`, `?order=`).
- **Post types**: `"Post"` = blog post (shows in feed), `"Page"` = standalone page like About (hidden from feed when status is `"PublicOnDetail"`), `"Paper"` = minimal layout variant.
