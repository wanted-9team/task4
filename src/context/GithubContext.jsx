import { createContext, useState } from 'react'
import * as issueApi from '../api/issueApi'

const GithubContext = createContext({
  isLoading: false,
  issueList: [],
  issueData: {},
  issueCount: '',
  getIssueList: () => {},
  getIssueData: () => {},
  getIssueCount: () => {},
})

export const IssueProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [issueList, setIssueList] = useState([])
  const [issueCount, setIssueCount] = useState(0)
  const [issueData, setIssueData] = useState({})

  const getIssueCount = async () => {
    try {
      const response = await issueApi.fetchRepo()
      setIssueCount(response.data.open_issues_count)
    } catch (e) {
      alert(e)
    }
  }

  const getIssueList = async page => {
    try {
      setIsLoading(true)
      const response = await issueApi.fetchIssueList(page)
      setIssueList(prev => [...prev, ...response.data])
    } catch (e) {
      alert(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getIssueData = async issueNumber => {
    try {
      const response = await issueApi.fetchIssueDetail(issueNumber)
      const { number, title, user, created_at, comments, body } = await response.data
      setIssueData({ number, title, user, created_at, comments, body })
    } catch (e) {
      alert(e)
    }
  }

  const contextValue = {
    isLoading,
    issueCount,
    issueList,
    issueData,
    getIssueList,
    getIssueData,
    getIssueCount,
  }

  return <GithubContext.Provider value={contextValue}>{children}</GithubContext.Provider>
}

export default GithubContext
