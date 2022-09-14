import React, { useContext, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import GithubContext from 'context/GithubContext'
import { useIntersect } from 'hooks/useIntersect'
import AdItem from './components/AdItem'
import IssueItem from './components/IssueItem'
import IssueLayout from './components/IssueLayout'

export default function IssueList() {
  const [pageCount, setPageCount] = useState(1)
  const { getIssueCount, getIssueList, issueList, issueCount, isLoading } =
    useContext(GithubContext)

  const isLast = issueCount === issueList.length

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (!isLoading && !isLast) {
      loadMore()
    }
  })

  function loadMore() {
    setPageCount(prev => prev + 1)
  }

  useEffect(() => {
    getIssueCount()
    getIssueList(pageCount)
  }, [pageCount])

  return (
    <Wrapper>
      {issueList.map((issue, idx) => {
        return (
          <IssueLayout key={idx}>
            {idx === 4 ? <AdItem /> : <IssueItem issue={issue} />}
          </IssueLayout>
        )
      })}
      <LoadingSpinner ref={ref} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 80%;
  max-width: 1200px;
  min-width: 600px;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
`

const Spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const LoadingSpinner = styled.div`
  display: block;
  width: 50px;
  height: 50px;
  border: 7px solid black;
  border-radius: 50%;
  border-top: 7px solid #ffd21a;
  animation: ${Spin} 1s linear infinite;
  margin: 0 auto;
`
