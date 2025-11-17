import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`${css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
  }

  :root {
    --font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, sans-serif;
  }

  body {
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul,
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`}`;
