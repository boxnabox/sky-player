import { Outlet } from 'react-router-dom';

import * as S from './style';

export default function CenterBlock() {
  return (
    <S.CenterBlock>
      <SearchBar />
      <Outlet />
    </S.CenterBlock>
  );
}

function SearchBar() {
  return (
    <S.SearchBar>
      <S.SearchSVG href="img/icon/sprite.svg#icon-search" ariaLabel="search" />
      <S.SearchInput placeholder="Поиск" name="search" />
    </S.SearchBar>
  );
}
