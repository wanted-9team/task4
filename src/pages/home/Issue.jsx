import React, { Fragment } from 'react'
import styled from 'styled-components'
import useInfiniteScroll from './hook/useInfiniteScroll'
import { useNavigate } from 'react-router-dom'
import { toLocaleDateFunc } from 'util/transDate'
import EmptyResult from 'components/EmptyResult'
import Loading from 'components/Loading'
import AdImageSrc from 'assets/thinksFlowLogo.png'

export default function Issue() {
  const { issues, loading, hasMore, lastElRef } = useInfiniteScroll()
  const navigate = useNavigate()

  const goIssueDetail = number => {
    navigate(`/${number}`)
  }

  return (
    <IssueContainer>
      {issues.length > 0 &&
        issues.map((issue, idx) => (
          <Fragment key={issue.id}>
            {idx === 4 ? (
              <AdImageLink href="https://thingsflow.com/ko/home" target="_blank" rel="noreferrer">
                <AdImage src={AdImageSrc} alt="Ad Image" />
              </AdImageLink>
            ) : null}
            <IssueList>
              <TitleWrapper onClick={() => goIssueDetail(issue.number)}>
                <Title>
                  #{issue.number} <TitleStrong>{issue.title}</TitleStrong>
                </Title>
                <InfoText>작성자: {issue.user?.login}</InfoText>
                <InfoText>작성일: {toLocaleDateFunc(issue.created_at)}</InfoText>
              </TitleWrapper>
              <Comment>코멘트: {issue.comments}</Comment>
            </IssueList>
          </Fragment>
        ))}
      <LastElement ref={lastElRef}>
        {loading ? <Loading /> : <EmptyResult hasMore={hasMore} />}
      </LastElement>
    </IssueContainer>
  )
}

const IssueContainer = styled.ul`
  width: 100%;
`

const IssueList = styled.li`
  ${({ theme }) => theme.flex('', 'space-between', 'center')}
  padding: 15px 0;
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

const AdImageLink = styled.a``

const AdImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: #000;
`

const LastElement = styled.div`
  text-align: center;
  padding: 16px 0;
  line-height: 1.3;
  height: 80px;
`
