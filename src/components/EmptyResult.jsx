import styled from 'styled-components'
const EmptyResult = ({ hasMore }) => {
  return (
    <EmptyResultContainer>
      {!hasMore && (
        <>
          <h2>μ λ°! π</h2>
          κ²μ κ²°κ³Όκ° μμ΅λλ€.
          <br />
        </>
      )}
    </EmptyResultContainer>
  )
}

export default EmptyResult

const EmptyResultContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 16px 0;
  line-height: 1.3;
`
