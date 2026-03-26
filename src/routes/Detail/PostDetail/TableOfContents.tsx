import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"

type Heading = {
  id: string
  text: string
  level: number
}

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const elements = document.querySelectorAll(
      "article h1[id], article h2[id], article h3[id]"
    )
    const items: Heading[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName[1]),
    }))
    setHeadings(items)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -80% 0px" }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <StyledWrapper>
      <div className="toc-title">On this page</div>
      <nav>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={activeId === heading.id ? "active" : ""}
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
              })
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </StyledWrapper>
  )
}

export default TableOfContents

const StyledWrapper = styled.div`
  display: none;

  @media (min-width: 1280px) {
    display: block;
    position: fixed;
    top: 120px;
    right: calc((100vw - 56rem) / 2 - 14rem);
    width: 12rem;
  }

  .toc-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.gray9};
    margin-bottom: 0.75rem;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    border-left: 1px solid ${({ theme }) => theme.colors.gray6};
  }

  a {
    font-size: 0.8rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray9};
    text-decoration: none;
    padding: 0.2rem 0 0.2rem 0.75rem;
    border-left: 2px solid transparent;
    margin-left: -1px;
    transition: all 0.15s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
    }

    &.active {
      color: ${({ theme }) => theme.colors.gray12};
      border-left-color: ${({ theme }) =>
        theme.scheme === "light" ? "#0070f3" : "#58a6ff"};
    }
  }
`
