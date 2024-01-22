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

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
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

  select,
  button,
  input {
    --webkit-appearance: none;
    --moz-appearance: none;
    appearance: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    outline: none;
    border: none;
  }

  ul li {
    list-style: none;
  }
`;

export const AppWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
  position: relative;
`;
