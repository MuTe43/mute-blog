import Image from "next/image"
import Link from "next/link"
import type { MDXComponents } from "mdx/types"

const Video: React.FC<{
  src: string
  type?: string
  poster?: string
}> = ({ src, type = "video/mp4", poster, ...props }) => (
  <video
    controls
    poster={poster}
    style={{
      width: "100%",
      borderRadius: "0.5rem",
      marginTop: "1rem",
      marginBottom: "1rem",
    }}
    {...props}
  >
    <source src={src} type={type} />
    Your browser does not support the video tag.
  </video>
)

const YouTube: React.FC<{ id: string }> = ({ id }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      aspectRatio: "16/9",
      marginTop: "1rem",
      marginBottom: "1rem",
    }}
  >
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "0.5rem",
        border: "none",
      }}
    />
  </div>
)

const CustomImage: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = ({ src, alt, ...props }) => {
  if (!src) return null
  // For local images, use next/image for optimization
  if (src.startsWith("/")) {
    return (
      <span style={{ display: "block", position: "relative", width: "100%" }}>
        <Image
          src={src}
          alt={alt || ""}
          width={800}
          height={450}
          style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}
        />
      </span>
    )
  }
  // For external images, use regular img
  return <img src={src} alt={alt || ""} {...props} />
}

const CustomLink: React.FC<{ href?: string; children?: React.ReactNode }> = ({
  href,
  children,
  ...props
}) => {
  if (href && href.startsWith("/")) {
    return <Link href={href}>{children}</Link>
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

export const mdxComponents: MDXComponents = {
  img: CustomImage as any,
  a: CustomLink as any,
  Video,
  YouTube,
}
