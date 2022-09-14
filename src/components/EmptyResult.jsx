import styled from 'styled-components'
const EmptyResult = ({ hasMore }) => {
  return (
    <EmptyResultContainer>
      {!hasMore && (
        <>
          <h2>저런! 😔</h2>
          검색 결과가 없습니다.
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
