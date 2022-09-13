import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default Layout

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`
