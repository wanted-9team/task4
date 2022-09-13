import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Header'
const Layout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

export default Layout

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 10px;
`
