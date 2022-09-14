import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  h1,h2,h3,h4,h5 {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  input,
  textarea {
    user-select: auto;
  }
  input:focus,textarea:focus {
    outline: none;
  }
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  pre {
    background-color:#f5f2f0;
    padding:20px;
    overflow-x:scroll
  }
  img {
    max-width:100%;

  }
`

export default GlobalStyle
