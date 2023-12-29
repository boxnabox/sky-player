import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './style';

export default function Navigation(props: NavProps) {
  const navItems: NavItem[] = [
    { link: '/', text: 'Главное' },
    { link: '/favorites', text: 'Мои треки' },
    { link: '#', text: 'Войти' },
  ];

  useEffect(() => {
    console.log('render: nav');
  }, []);

  return (
    <S.Nav>
      <Logo />
      <Burger onClick={props.onBurgerClick} />
      {props.isNavOpen && <Menu items={navItems} />}
    </S.Nav>
  );
}

function Logo() {
  return (
    <S.Logo>
      <Link to={'/'}>
        <S.LogoImage src="/img/logo.png" aria-label="skypro logo" />
      </Link>
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

function Menu(props: MenuProps) {
  return (
    <S.Menu>
      <S.MenuList>
        {props.items.map((item) => (
          <MenuItem link={item.link} text={item.text} key={item.text} />
        ))}
      </S.MenuList>
    </S.Menu>
  );
}

function MenuItem(props: NavItem) {
  return (
    <S.MenuItem>
      <S.MenuLink to={props.link}>{props.text}</S.MenuLink>
    </S.MenuItem>
  );
}
