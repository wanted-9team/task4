import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Issue from 'pages/home/Issue'
import IssueDetail from 'pages/issueDetail/IssueDetail'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Issue />} />
        <Route path="/:id" element={<IssueDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
