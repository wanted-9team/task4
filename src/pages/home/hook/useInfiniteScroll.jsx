import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useIssues } from 'context/GithubContext'

const useInfiniteScroll = () => {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const target = useRef(null)
  const { getIssueList } = useIssues()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getIssueList(page)
      setHasMore(res.data.length > 0)
      if (page === 1) {
        setIssues(res.data)
      } else {
        setIssues(prev => [...prev, ...res.data])
      }
    } catch (e) {
      throw Error(e)
    } finally {
      setLoading(false)
    }
  }, [getIssueList, page])

  useEffect(() => {
    fetch()
  }, [page, fetch])

  const callback = ([entries]) => {
    if (entries.isIntersecting && hasMore) {
      setPage(prev => prev + 1)
    }
  }

  const lastElRef = useCallback(
    node => {
      if (loading) return
      if (target.current) target.current.disconnect()
      target.current = new IntersectionObserver(callback, { threshold: 1 })
      if (node) target.current.observe(node)
    },
    [loading, hasMore],
  )

  return { issues, loading, hasMore, lastElRef }
}

export default useInfiniteScroll
