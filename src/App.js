import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Issue from 'pages/home/Issue'
import IssueDetail from 'pages/issueDetail/IssueDetail'
import Layout from 'components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Issue />} />
          <Route path="/:id" element={<IssueDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
