import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { FC } from "react"
import styled from "@emotion/styled"
import { mdxComponents } from "./mdxComponents"

import "prismjs/themes/prism-tomorrow.css"

type Props = {
  mdxSource: MDXRemoteSerializeResult
}

const MdxRenderer: FC<Props> = ({ mdxSource }) => {
  return (
    <StyledWrapper>
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </StyledWrapper>
  )
}

export default MdxRenderer

const StyledWrapper = styled.div`
  line-height: 1.8;
  font-size: 1rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
  }

  h1 {
    font-size: 1.875rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }

  p {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }

  ul,
  ol {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    padding-left: 1.5em;
  }

  li {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }

  blockquote {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid ${({ theme }) => theme.colors.gray6};
    color: ${({ theme }) => theme.colors.gray11};
    background-color: ${({ theme }) => theme.colors.gray3};
    border-radius: 0 0.5rem 0.5rem 0;
  }

  pre {
    margin: 1em 0;
    padding: 1em;
    border-radius: 0.5rem;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.6;
    background-color: #1d1f21 !important;
  }

  code {
    font-family: "Fira Code", "Consolas", "Monaco", monospace;
    font-size: 0.875em;
  }

  :not(pre) > code {
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.colors.gray4};
    color: ${({ theme }) =>
      theme.scheme === "light" ? "#e01e5a" : "#f97583"};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }

  a {
    color: ${({ theme }) =>
      theme.scheme === "light" ? "#0070f3" : "#58a6ff"};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  hr {
    margin: 2em 0;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.gray6};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
  }

  th,
  td {
    padding: 0.5em 1em;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.gray3};
    font-weight: 600;
  }
`
