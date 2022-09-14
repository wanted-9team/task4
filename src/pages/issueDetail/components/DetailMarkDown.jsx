import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { cb } from 'react-syntax-highlighter/dist/esm/styles/prism'

const DetailMarkDown = ({ issueDetailBody }) => {
  return (
    <ReactMarkdown
      children={issueDetailBody}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              PreTag="div"
              style={cb}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    />
  )
}

export default DetailMarkDown
