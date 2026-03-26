import Image from "next/image"
import Link from "next/link"
import React, { useRef, useState } from "react"
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

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const CodeBlock: React.FC<{ children?: React.ReactNode }> = ({ children, ...props }) => {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const code = preRef.current?.querySelector("code")?.textContent || ""
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ position: "relative" }}>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          padding: "0.375rem",
          borderRadius: "0.375rem",
          border: "none",
          background: copied ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.1)",
          color: copied ? "#22c55e" : "rgba(255, 255, 255, 0.5)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)"
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)"
          }
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  )
}

const CustomImage: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = ({ src, alt, ...props }) => {
  if (!src) return null
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
  pre: CodeBlock as any,
  img: CustomImage as any,
  a: CustomLink as any,
  Video,
  YouTube,
}
