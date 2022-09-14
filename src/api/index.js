import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API_URL

const issueApiFunc = (owner, repo) => {
  const Axios = axios.create({
    baseURL: `${BASE_URL}/${owner}/${repo}`,
    headers: {
      'Content-type': 'application/json',
    },
  })

  const getIssueList = async page => {
    const res = await Axios({
      url: '/issues',
      method: 'GET',
      params: {
        sort: 'comments',
        page,
      },
    })
    return res
  }

  const getIssueDetail = async number => {
    const res = await Axios({
      url: `/issues/${number}`,
      method: 'GET',
    })
    return res
  }

  return { getIssueList, getIssueDetail }
}

export default issueApiFunc
