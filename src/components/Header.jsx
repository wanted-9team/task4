import React from 'react'
import { useIssues } from 'context/GithubContext'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const { organization, repository } = useIssues()

  return (
    <HeaderContainer>
      <NavLink to="/">
        {organization} / {repository}
      </NavLink>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  text-align: center;
  padding: 30px 0;
  font-size: 24px;
  font-weight: 700;
`
