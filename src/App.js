import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Header from 'components/Header'
import IssueList from 'pages/home/IssueList'
import IssueDetail from 'pages/issueDetail/IssueDetail'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<IssueList />} />
        <Route path="/:id" element={<IssueDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
