import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  @font-face {
    font-family: 'Stratos-Regular';
    src:
      url('/fonts/Stratos-Regular.woff2') format('woff2'),
      url('/fonts/Stratos-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'Stratos-Regular', sans-serif;
    color: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    font-family: 'Stratos-Regular', sans-serif;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
  }

  ul li {
    list-style: none;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
`;
