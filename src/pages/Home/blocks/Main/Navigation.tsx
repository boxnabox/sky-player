import { useState } from 'react';

import * as S from './styles/navigation';

export default function Navigation(props: NavProps) {
  const [isExpanded, setMenuVisibility] = useState(props.isExpanded);

  const toggleMenuVisibility = () => {
    setMenuVisibility(!isExpanded);
  };

  return (
    <S.Nav>
      <Logo />
      <Burger onClick={toggleMenuVisibility} />
      {isExpanded && <Menu {...props} />}
    </S.Nav>
  );
}

function Logo() {
  return (
    <S.Logo>
      <S.LogoImage src="./img/logo.png" aria-label="skypro logo" />
    </S.Logo>
  );
}

function Burger(props: BurgerProps) {
  return (
    <S.Burger onClick={props.onClick}>
      <S.BurgerLine></S.BurgerLine>
      <S.BurgerLine></S.BurgerLine>
      <S.BurgerLine></S.BurgerLine>
    </S.Burger>
  );
}

function Menu({ navItems }: NavProps) {
  return (
    <S.Menu>
      <S.MenuList>
        {navItems.map((item) => (
          <MenuItem link={item.link} text={item.text} key={item.text} />
        ))}
      </S.MenuList>
    </S.Menu>
  );
}

function MenuItem(props: NavItem) {
  return (
    <S.MenuItem>
      <S.MenuLink href={props.link}>{props.text}</S.MenuLink>
    </S.MenuItem>
  );
}
