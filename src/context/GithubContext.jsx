import { createContext, useContext, useState } from 'react'
import issueApiFunc from 'api'

const OWNER = 'angular'
const REPO = 'angular-cli'
const { getIssueList, getIssueDetail } = issueApiFunc(OWNER, REPO)

const GithubContext = createContext(null)
export const useIssues = () => useContext(GithubContext)

export function IssueProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const value = {
    organization: OWNER,
    repository: REPO,
    getIssueList,
    getIssueDetail,
    loading,
    setLoading,
  }

  return <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
}
