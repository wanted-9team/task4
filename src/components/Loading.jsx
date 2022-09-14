import React from 'react'
import styled from 'styled-components'
export default function Loading() {
  return (
    <Container>
      Loading... <br /> 잠시만 기다려 주세요...
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
`
