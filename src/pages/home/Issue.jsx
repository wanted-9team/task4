import React from 'react'
import styled from 'styled-components'
import useInfiniteScroll from './hook/useInfiniteScroll'

export default function Issue() {
  const { issues, target } = useInfiniteScroll()

  return (
    <IssueUlEl>
      {issues.map(issue => (
        <IssueLiEl key={issue.id}>
          <TitleWrapper>
            <Title>
              #{issue.number} <TitleStrong>{issue.title}</TitleStrong>
            </Title>
            <InfoText>작성자: {issue.user?.login}</InfoText>
            <InfoText>작성일: {toLocaleDateFunc(issue.created_at)}</InfoText>
          </TitleWrapper>
          <Comment>코멘트: {issue.comments}</Comment>
        </IssueLiEl>
      ))}
      <div ref={target}></div>
    </IssueUlEl>
  )
}

const toLocaleDateFunc = date => {
  const createdAt = new Date(date)
  return createdAt.toLocaleString()
}

const IssueUlEl = styled.ul`
  width: 100%;
`

const IssueLiEl = styled.li`
  ${({ theme }) => theme.flex('', 'space-between', 'center')}
  padding: 15px 10px;
  border-bottom: 1px solid #dedede;
`

const TitleWrapper = styled.div`
  flex: 1;
`

const Title = styled.h1`
  ${({ theme }) => theme.headerFont}
  padding: 15px 0;
  cursor: pointer;
`

const TitleStrong = styled.strong`
  font-weight: 600;
  color: #000;
`

const InfoText = styled.h3`
  display: inline-block;
  ${({ theme }) => theme.smallFont};
  color: ${({ theme }) => theme.border};
  margin-right: 10px;
`

const Comment = styled.h3``
