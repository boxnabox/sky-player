import clsx from 'clsx';
import { useState } from 'react';

export default function Navigation(props: NavProps) {
  const [isExpanded, setMenuVisibility] = useState(props.isExpanded);

  const toggleMenuVisibility = () => {
    setMenuVisibility(!isExpanded);
  };

  return (
    <nav className={clsx('main__nav', 'nav')}>
      <Logo />
      <Burger onClick={toggleMenuVisibility} />
      {isExpanded && <Menu {...props} />}
    </nav>
  );
}

function Logo() {
  return (
    <div className={clsx('nav__logo', 'logo')}>
      <img
        src="./img/logo.png"
        aria-label="skypro logo"
        className="logo__image"
      />
    </div>
  );
}

function Burger(props: BurgerProps) {
  return (
    <div className={clsx('nav__burger', 'burger')} onClick={props.onClick}>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
    </div>
  );
}

function Menu({ navItems }: NavProps) {
  return (
    <div className={clsx('nav__menu', 'menu')}>
      <ul className="menu__list">
        {navItems.map((item) => (
          <MenuItem link={item.link} text={item.text} key={item.text} />
        ))}
      </ul>
    </div>
  );
}

function MenuItem(props: NavItem) {
  return (
    <li className="menu__item">
      <a href={props.link} className="menu__link">
        {props.text}
      </a>
    </li>
  );
}
