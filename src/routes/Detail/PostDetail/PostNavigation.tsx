import React from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import usePostsQuery from "src/hooks/usePostsQuery"
import usePostQuery from "src/hooks/usePostQuery"

const PostNavigation: React.FC = () => {
  const posts = usePostsQuery()
  const currentPost = usePostQuery()

  if (!currentPost || !posts || posts.length < 2) return null

  const currentIndex = posts.findIndex((p) => p.slug === currentPost.slug)
  if (currentIndex === -1) return null

  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null

  if (!prevPost && !nextPost) return null

  return (
    <StyledWrapper>
      {prevPost ? (
        <Link href={`/${prevPost.slug}`} className="nav-link prev">
          <span className="label">Previous</span>
          <span className="title">{prevPost.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link href={`/${nextPost.slug}`} className="nav-link next">
          <span className="label">Next</span>
          <span className="title">{nextPost.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </StyledWrapper>
  )
}

export default PostNavigation

const StyledWrapper = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  .nav-link {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.colors.gray8};
      background-color: ${({ theme }) => theme.colors.gray3};
    }

    &.next {
      text-align: right;
    }

    .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: ${({ theme }) => theme.colors.gray9};
    }

    .title {
      font-size: 0.9rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray12};
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`
