import React, { Fragment } from 'react'
import styled from 'styled-components'
import useInfiniteScroll from './hook/useInfiniteScroll'
import { useNavigate } from 'react-router-dom'
import { toLocaleDateFunc } from 'util/transDate'
import EmptyResult from 'components/EmptyResult'
import Loading from 'components/Loading'
export default function Issue() {
  const { issues, loading, hasMore, lastElRef } = useInfiniteScroll()
  const navigate = useNavigate()

  const goIssueDetail = number => {
    navigate(`/${number}`)
  }

  return (
    <IssueUlEl>
      {issues.length > 0 &&
        issues.map((issue, idx) => (
          <Fragment key={issue.id}>
            <IssueLiEl>
              <TitleWrapper onClick={() => goIssueDetail(issue.number)}>
                <Title>
                  #{issue.number} <TitleStrong>{issue.title}</TitleStrong>
                </Title>
                <InfoText>작성자: {issue.user?.login}</InfoText>
                <InfoText>작성일: {toLocaleDateFunc(issue.created_at)}</InfoText>
              </TitleWrapper>
              <Comment>코멘트: {issue.comments}</Comment>
            </IssueLiEl>
            {idx === 4 ? (
              <a href="https://thingsflow.com/ko/home" target="_blank" rel="noreferrer">
                <AdImage
                  src="https://younuk.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbf0a0656-3146-4e9b-8739-7bca3d0d2cb4%2F%25E1%2584%2584%25E1%2585%25B5%25E1%2586%25BC%25E1%2584%2589%25E1%2585%25B3%25E1%2584%2591%25E1%2585%25B3%25E1%2586%25AF%25E1%2584%2585%25E1%2585%25A9%25E1%2584%258B%25E1%2585%25AE_%25E1%2584%2585%25E1%2585%25A9%25E1%2584%2580%25E1%2585%25A9_%25E1%2584%2580%25E1%2585%25B5%25E1%2584%2587%25E1%2585%25A9%25E1%2586%25AB%25E1%2584%2592%25E1%2585%25A7%25E1%2586%25BC.png?table=block&id=23d7e96e-0dbc-4ba3-9e41-c0f22a5ba926&spaceId=72b256b1-ae08-4e70-bb6c-f9c3cad5a793&width=2000&userId=&cache=v2"
                  alt="Ad Image"
                />
              </a>
            ) : null}
          </Fragment>
        ))}
      <LastElDiv>
        <div ref={lastElRef}>{loading ? <Loading /> : <EmptyResult hasMore={hasMore} />}</div>
      </LastElDiv>
    </IssueUlEl>
  )
}

const IssueUlEl = styled.ul`
  width: 100%;
`

const IssueLiEl = styled.li`
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

const AdImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: #000;
`

const LastElDiv = styled.div`
  text-align: center;
  padding: 16px 0;
  line-height: 1.3;
  height: 80px;
`
