// import { fchown } from "fs";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React from "react";
import "./App.scss";
import tracks from "./tracks";

export default App;

// static handels ==================
const MENU_ITEMS = [
  { link: "#", text: "Главное" },
  { link: "#", text: "Мои треки" },
  { link: "#", text: "Войти" },
];

const FILTERS = [
  { filter: "author", text: "исполнителю" },
  { filter: "year", text: "году выпуска" },
  { filter: "genre", text: "жанру" },
];

// plugs ===========================
const TRACKS = tracks;

const CURRENT_TRACK = TRACKS[0];

const SELECTIONS = [
  {
    name: "today plst",
    href: "https://",
    imgSrc: "img/playlist01.png",
    imgAlt: "day's playlist",
  },
  {
    name: "100 hits",
    href: "https://",
    imgSrc: "img/playlist02.png",
    imgAlt: "day's playlist",
  },
  {
    name: "indie",
    href: "https://",
    imgSrc: "img/playlist03.png",
    imgAlt: "indie boost",
  },
];

// auxiliary =======================
function formatTime(secconds: number) {
  let mins: string | number = Math.floor(secconds / 60);
  let secs: string | number = secconds % 60;

  // if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  return `${mins}.${secs}`;
}

// ============ end ================

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <Main />
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

function Main() {
  return (
    <main className="main">
      <Navigation className="main__nav" />
      <CenterBlock className="main__centerblock" />
      <Sidebar className="main__sidebar" />
    </main>
  );
}

function Navigation(props: stdProps) {
  return (
    <nav className={`${props.className && props.className} nav`}>
      <Logo className="nav__logo" />
      <Burger className="nav__burger" />
      <Menu className="nav__menu" listOfItems={MENU_ITEMS} />
    </nav>
  );
}

function Logo(props: stdProps) {
  return (
    <div className={`${props.className && props.className} logo`}>
      <img
        src="./img/logo.png"
        aria-label="skypro logo"
        className="logo__image"
      />
    </div>
  );
}

function Burger(props: stdProps) {
  return (
    <div className={`${props.className && props.className} burger`}>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
    </div>
  );
}

function Menu(props: menuProps) {
  return (
    <div className={`${props.className && props.className} menu`}>
      <ul className="menu__list">
        {props.listOfItems.map((item) => (
          <MenuItem link={item.link} text={item.text} key={item.text} />
        ))}
      </ul>
    </div>
  );
}

function MenuItem(props: linkTextProps) {
  return (
    <li className="menu__item">
      <a href={props.link} className="menu__link">
        {props.text}
      </a>
    </li>
  );
}

function CenterBlock(props: stdProps) {
  return (
    <div className={`${props.className && props.className} centerblock`}>
      <SearchBar className="centerblock__search" />
      <h2 className="centerblock__h2">Треки</h2>
      <Filter className="centerblock__filter" />
      <Content className="centerblock__content" />
    </div>
  );
}

function SearchBar(props: stdProps) {
  return (
    <div className={`${props.className && props.className} search`}>
      <SvgImg
        className="search__svg"
        href="img/icon/sprite.svg#icon-search"
        ariaLabel="search"
      />
      <input
        className="search__text"
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
}

function Filter(props: stdProps) {
  return (
    <div className={`${props.className && props.className} filter`}>
      <div className="filter__title">Искать по:</div>
      {FILTERS.map((item) => {
        return <FilterButton {...item} key={item.filter} />;
      })}
    </div>
  );
}

function FilterButton(props: filterTextProps) {
  return (
    <div className={`filter__button button-${props.filter} _btn-text`}>
      {props.text}
    </div>
  );
}

function Content(props: stdProps) {
  return (
    <div className={`${props.className && props.className} content`}>
      <PlaylistTitle className="content__title" />
      <Playlist className="content__playlist" />
    </div>
  );
}

function PlaylistTitle(props: stdProps) {
  return (
    <div className={`${props.className && props.className} playlist-title`}>
      <div className="playlist-title__col col01">Трек</div>
      <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
      <div className="playlist-title__col col03">АЛЬБОМ</div>
      <div className="playlist-title__col col04">
        <svg className="playlist-title__svg" aria-label="time">
          <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  );
}

function Playlist(props: stdProps) {
  return (
    <div className={`${props.className && props.className} playlist`}>
      {TRACKS.map((track) => {
        return <PlaylistItem {...track} key={track.id} />;
      })}
    </div>
  );
}

function PlaylistItem(props: track) {
  return (
    <div className="playlist__item">
      <Track className="playlist__track" trackData={props} />
    </div>
  );
}

function Track(props: trackProps) {
  return (
    <div className={`${props.className && props.className} track`}>
      <div className="track__title">
        <div className="track__title-image">
          <svg className="track__title-svg" aria-label="music">
            <use xlinkHref={props.trackData.track_file}></use>
          </svg>
        </div>
        <div className="track__title-text">
          <a className="track__title-link" href={props.trackData.track_file}>
            {props.trackData.name}
            <span className="track__title-span"></span>
          </a>
        </div>
      </div>
      <div className="track__author">
        <a className="track__author-link" href="http://">
          {props.trackData.author}
        </a>
      </div>
      <div className="track__album">
        <a className="track__album-link" href="http://">
          {props.trackData.album}
        </a>
      </div>
      <div className="track__time">
        <SvgImg
          className="track__time-svg"
          aria-label="like"
          href={"img/icon/sprite.svg#icon-like"}
        />
        <span className="track__time-text">
          {formatTime(props.trackData.duration_in_seconds)}
        </span>
      </div>
    </div>
  );
}

function Sidebar(props: stdProps) {
  return (
    <div className={`${props.className && props.className} sidebar`}>
      <SidebarMenu className="sidebar__personal" />
      <div className="sidebar__block">
        <SidebarList />
      </div>
    </div>
  );
}

function SidebarMenu(props: stdProps) {
  return (
    <div className={`${props.className && props.className} sidebar-menu`}>
      <p className="sidebar__personal-name">Sergey.Popov</p>
      <div className="sidebar__avatar"></div>
    </div>
  );
}

function SidebarList() {
  return (
    <div className="sidebar__list">
      {SELECTIONS.map((selection) => {
        return <SidebarItem {...selection} key={selection.name} />;
      })}
    </div>
  );
}

function SidebarItem(props: selection) {
  return (
    <div className="sidebar__item">
      <a className="sidebar__link" href={props.href}>
        <img
          className="sidebar__img"
          src={props.imgSrc}
          aria-label={props.imgAlt}
        />
      </a>
    </div>
  );
}

function Bar() {
  return (
    <div className="bar">
      <div className="bar__content">
        <div className="bar__player-progress"></div>
        <PlayerBlock />
      </div>
    </div>
  );
}

function PlayerBlock() {
  return (
    <div className="bar__player-block">
      <Player className="bar__player" />
      <Volume />
    </div>
  );
}

function Player(props: stdProps) {
  return (
    <div className={`${props.className && props.className} player`}>
      <PlayerControls />
      <TrackPlay className="player__track-play" currentTrack={CURRENT_TRACK} />
    </div>
  );
}

function PlayerControls() {
  return (
    <div className="player__controls">
      <div className="player__btn-prev">
        <SvgImg
          className="player__btn-prev-svg"
          ariaLabel="prev"
          href="img/icon/sprite.svg#icon-prev"
        />
      </div>
      <div className="player__btn-play _btn">
        <SvgImg
          className="player__btn-play-svg"
          ariaLabel="play"
          href="img/icon/sprite.svg#icon-play"
        />
      </div>
      <div className="player__btn-next">
        <SvgImg
          className="player__btn-next-svg"
          ariaLabel="next"
          href="img/icon/sprite.svg#icon-next"
        />
      </div>
      <div className="player__btn-repeat _btn-icon">
        <SvgImg
          className="player__btn-repeat-svg"
          ariaLabel="repeat"
          href="img/icon/sprite.svg#icon-repeat"
        />
      </div>
      <div className="player__btn-shuffle _btn-icon">
        <SvgImg
          className="player__btn-shuffle-svg"
          ariaLabel="shuffle"
          href="img/icon/sprite.svg#icon-shuffle"
        />
      </div>
    </div>
  );
}

function SvgImg(props: svgProps) {
  return (
    <svg
      className={`${props.className && props.className} std-svg`}
      aria-label={props.ariaLabel ? props.ariaLabel : "no desc"}
    >
      <use xlinkHref={props.href}></use>
    </svg>
  );
}

function TrackPlay(props: trackPlayProps) {
  return (
    <div className={`${props.className && props.className} track-play`}>
      <div className="track-play__contain">
        <div className="track-play__image">
          <SvgImg
            className="track-play__svg"
            aria-label="music"
            href={
              props.currentTrack.logo
                ? props.currentTrack.logo
                : "img/icon/sprite.svg#icon-note"
            }
          />
        </div>
        <div className="track-play__author">
          <a className="track-play__author-link" href="http://">
            {props.currentTrack.name}
          </a>
        </div>
        <div className="track-play__album">
          <a className="track-play__album-link" href="http://">
            {props.currentTrack.author}
          </a>
        </div>
      </div>

      <div className="track-play__like-dis">
        <LikeBtn parentBlockName="track-play" />

        <div className="track-play__dislike-btn dislike-btn _btn-icon">
          <svg className="track-play__dislike-svg" aria-label="dislike">
            <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LikeBtn(props: likeBtnProps) {
  return (
    <div
      className={`${
        props.parentBlockName && props.parentBlockName + "__like-btn"
      } like-btn _btn-icon`}
    >
      <SvgImg
        className={`${
          props.parentBlockName && props.parentBlockName + "__like-svg"
        } like-btn__like-svg like-svg`}
        aria-label="like"
        href={"img/icon/sprite.svg#icon-like"}
      />
    </div>
  );
}

function Volume() {
  return (
    <div className="bar__volume-block volume">
      <div className="volume__content">
        <div className="volume__image">
          <svg className="volume__svg" aria-label="volume">
            <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className="volume__progress _btn">
          <input
            className="volume__progress-line _btn"
            type="range"
            name="range"
          />
        </div>
      </div>
    </div>
  );
}
