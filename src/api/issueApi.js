import { instance } from 'api'

const options = {
  owner: 'angular',
  repository: 'angular-cli',
  option: { state: 'open', sort: 'comments', per_page: 30 },
}

export const fetchRepo = () => {
  return instance.get(`repos/${options.owner}/${options.repository}`)
}

export const fetchIssueList = ({ page }) => {
  return instance.get(`repos/${options.owner}/${options.repository}/issues`, {
    params: { ...options.option, page },
  })
}

export const fetchIssueDetail = issueNumber => {
  return instance.get(`repos/${options.owner}/${options.repository}/issues/${issueNumber}`)
}
