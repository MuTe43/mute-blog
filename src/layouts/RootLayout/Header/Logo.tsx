import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      <span className="accent">{CONFIG.profile.name}</span>
      <span className="sep">/</span>
      <span className="title">blog</span>
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.02em;

  .accent {
    color: ${({ theme }) => theme.colors.gray12};
  }
  .sep {
    color: ${({ theme }) => theme.colors.gray8};
    margin: 0 0.125rem;
  }
  .title {
    color: ${({ theme }) => theme.colors.gray10};
    font-weight: 500;
  }
`
