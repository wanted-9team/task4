import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { toLocaleDateFunc } from 'util/transDate'
import { useIssues } from 'context/GithubContext'
import Loading from 'components/Loading'
import DetailMarkDown from './components/DetailMarkDown'

export default function IssueDetail() {
  const [issueDetail, setIssueDetail] = useState({})
  const params = useParams()
  const { getIssueDetail, loading, setLoading } = useIssues()

  const fetch = async () => {
    try {
      setLoading(true)
      const res = await getIssueDetail(params.id)
      setIssueDetail(res.data)
    } catch (e) {
      throw Error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <DetailContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DetailHeader>
            <DetailAvatar
              src={issueDetail.assignee?.avatar_url || issueDetail.user?.avatar_url}
              alt={issueDetail.user?.login}
            />
            <TitleWrapper>
              <Title>
                #{issueDetail.number} <TitleStrong>{issueDetail.title}</TitleStrong>
              </Title>
              <InfoText>작성자: {issueDetail.user?.login}</InfoText>
              <InfoText>작성일: {toLocaleDateFunc(issueDetail.created_at)}</InfoText>
            </TitleWrapper>
            <Comment>코멘트: {issueDetail.comments}</Comment>
          </DetailHeader>
          <DetailMarkDown issueDetailBody={issueDetail.body} />
        </>
      )}
    </DetailContainer>
  )
}
const DetailContainer = styled.div``

const DetailHeader = styled.header`
  ${({ theme }) => theme.flex('', 'space-between', 'center')}
  border-bottom: 1px solid #dedede;
  margin-bottom: 20px;
  padding: 15px 0;
`

const DetailAvatar = styled.img`
  width: 40px;
`
const TitleWrapper = styled.div`
  flex: 1;
  padding-left: 10px;
`

const Title = styled.h1`
  ${({ theme }) => theme.headerFont}
  padding: 15px 0;
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
