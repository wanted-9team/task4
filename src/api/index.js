import axios from 'axios'

const BASE_URL = 'https://api.github.com'
const TOKEN = process.env.REACT_APP_GITHUBAPI_KEY

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
})
