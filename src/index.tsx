import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import * as S from './style';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// function getCookieValue(name: string) {
//   const regex = new RegExp('(^| )' + name + '=([^;]+)');
//   const match = document.cookie.match(regex);
//   if (match) {
//     return match[2];
//   }
// }

// // Auth logic bypass

// document.cookie = "token=0";

// function AuthButton() {

//   return (
//     <S.AuthBtn onClick={toggleAccess}></S.AuthBtn>
//   )
// }

root.render(
  <React.StrictMode>
    <S.Global />
    <App />
  </React.StrictMode>,
);
