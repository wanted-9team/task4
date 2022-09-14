import { createContext, useContext } from 'react'

const GithubContext = createContext(null)

export const useIssues = () => useContext(GithubContext)

export function IssueProvider({ children }) {
  return <GithubContext.Provider>{children}</GithubContext.Provider>
}
