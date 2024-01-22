import { useEffect, useState } from 'react';
import { isLoggedIn, login, logout } from '../../utils/server-like';

import * as S from './style';

export default function AuthToggleButton() {
  const [isAuth, setIsAuth] = useState(isLoggedIn());

  if (isAuth)
    return (
      <>
        <S.AuthBtn
          type="button"
          onClick={() => {
            logout();
            setIsAuth(false);
            console.log(document.cookie);
          }}
        >
          logout
        </S.AuthBtn>
        <S.Bip $isOn={true}></S.Bip>
      </>
    );

  return (
    <>
      <S.AuthBtn
        type="button"
        onClick={() => {
          login();
          setIsAuth(true);
          console.log(document.cookie);
        }}
      >
        login
      </S.AuthBtn>
      <S.Bip $isOn={false}></S.Bip>
    </>
  );
}
