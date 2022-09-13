import { createContext, useContext } from 'react'

const GithubContext = createContext(null)

export const useIssues = () => useContext(GithubContext)

export function IssueProvider({}) {
  return <GithubContext.Provider></GithubContext.Provider>
}
