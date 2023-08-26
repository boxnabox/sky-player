// import { fchown } from "fs";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React, { useEffect, useState } from "react";
import "./App.scss";
import tracks from "./tracks";
import { forEachChild } from "typescript";

export default App;

// plugs ==================
const MENU_ITEMS = [
  { link: "#", text: "Главное" },
  { link: "#", text: "Мои треки" },
  { link: "#", text: "Войти" },
];

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
  const [userPref, setUserPref] = useState<UserPrefs>({
    filterBarElements: ["author", "genre", "release_date"]
  });
  const [tracksPool, setTracksPool] = useState(tracks); // getting data every time we choose playlist|log-in
  const [sortedTracks, setSortedTracks] = useState(tracksPool); // being updated every time we modify filters
  const [currnetTracksQueue, setCurrentTracksQueue] = useState(tracksPool); // getting tracks from sortedTracks after track was clicked
  const [trackInPlay, setTrackInPlay] = useState(tracksPool[0]); // first currnetTracksQueue's track at the beginning, than track in play
  const [checkedFilters, setCheckedFilters] = useState(() => {
    const result: CheckedFilters = {};
    userPref.filterBarElements.forEach((element) => {
      if (["name", "author", "genre", "album"].includes(element)) {result[element] = []};
    })
    return result;
  });
  const [sortOption, setSortOption] = useState(() => {
        const result: CheckedFilters = {};
    userPref.filterBarElements.forEach((element) => {
      if (["id", "release_date", "duration_in_seconds"].includes(element)) {result[element] = []};
    })
    return result;
  });

  const artistsPool = [...(new Set(tracksPool.map((track) => {return track.author})))].sort(); // getting initial filter options
  const genresPool = [...(new Set(tracksPool.map((track) => {return track.genre})))].sort(); // getting initial filter options


  // написать функцию которая будет сортировать треклист: trackList + checkedFilters => sortedTracks
  // написать функцию onFilterChange которая будет обновлять checkedFilters и сортировать tracklist

  const handleFilterChange = (filterKey: string, filterOption: string) => {
    console.log("Filter: " + filterKey + ": " + filterOption);

    if (checkedFilters[filterKey].includes(filterOption)) {

    }
  }

  const handleSortChange = (filterKey: string, filterOption: string) => {
    console.log("Sort: " + filterKey + ": " + filterOption);
  
    if (sortOption[filterKey][0] === filterOption) {
      setSortOption(() => {
        const result: CheckedFilters = {[filterKey]: []}
        return result;
      })
      return;
    }

    setSortOption(() => {
      const result: CheckedFilters = {[filterKey]: [filterOption]}
      return result;
    })
  }

  function getFilterOptionsByCategory (tracksArray: track[], category: filterCtgs) {
    return (
      [...(new Set(tracksArray.map((track) => {return track[category]})))].sort() as filterCtgs[]
    )
  }

  function gatherFilterProps() {
    // надо как-то избавиться от "any"
    const filterOptions: any = {};
    userPref.filterBarElements.forEach((element) => {
      if (["name", "author", "genre", "album"].includes(element)) {
        filterOptions[element] = getFilterOptionsByCategory(sortedTracks, element as filterCtgs);
      }
    })

    const result: filterSortProps = {
      filterBarOrder: userPref.filterBarElements,
      filterOptions: filterOptions,
      checkedFilters: checkedFilters,
      checkedSorting: sortOption,
      onFilterChange: handleFilterChange,
      onSortChange: handleSortChange,
    };
    return result;
  }

  return (
    <div className="wrapper">
      <div className="container">
        <Main
          sortedTracks={sortedTracks}
          filterProps={gatherFilterProps()}
        />
        <Bar currentTrack={trackInPlay}/>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

function Main(props: mainProps) {
  return (
    <main className="main">
      <Navigation navItems={MENU_ITEMS} isOpened={false}/>
      <CenterBlock {...props} />
      <Sidebar className="main__sidebar" />
    </main>
  );
}

function Navigation(props: navProps) {
  const [isMenuVisible, setMenuVisibility] = useState(props.isOpened);
  
  const toggleMenuVisibility = () => {
    setMenuVisibility(!isMenuVisible);
  }

  return (
    <nav className="main__nav nav">
      <Logo />
      <Burger onClick={toggleMenuVisibility}/>
      {isMenuVisible && <Menu listOfItems={props.navItems} />}
    </nav>
  );
}

function Logo() {
  return (
    <div className="nav__logo logo">
      <img
        src="./img/logo.png"
        aria-label="skypro logo"
        className="logo__image"
      />
    </div>
  );
}

function Burger(props: burgerProps) {
  return (
    <div className="nav__burger burger" onClick={props.onClick}>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
    </div>
  );
}

function Menu(props: menuProps) {
  return (
    <div className="nav__menu menu">
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

function CenterBlock(props: mainProps) {
  return (
    <div className="main__centerblock">
      <SearchBar />
      <h2 className="centerblock__h2">Треки</h2>
      <FilterBar {...props.filterProps} />
      <Content sortedTracks={props.sortedTracks} />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="centerblock__search">
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

function FilterBar(props: filterSortProps) {
  // Комменты чтобы потом удалить. Куча сомнений и допущений. Решил записать их;
  // Пока нет понимания как по итогу будет работать всё приложение целиком (какие будут стейты в самом App, до куда поднимать локальные стейты, где какие обработчики будут);
  // Предполагаю что в FilterBar будет приходить пропс типа filterProps для того чтобы потом всё "само" проростало внутрь компонента FilterBar; Вобщем "что отрисовывать" будем получать извне и это что-то будет храниться либо в переменных либо в стейтах App. Подобное делали в предыдущем проекте. Работает ли этот подход (передача в пропс объекта-шаблона) в React или есть более изящные решения? Мне такой подход нравится => для того чтобы отрисовать нужные компоненты необходимо просто отредактировать передаваемый шаблон;
  // FilterBar помимо отрисовки фильтров должен иметь возможность передавать выбраные фильтры наружу(обрабатывать внешние стейты внутри) для их применения и изменения содержимого плей-листа; Вобщем FilterBar зависит от внешних пропсов и в то-же время должен иметь возможность влиять на внешние стейты;

  const allElementsMissings = {
    name: {
      ruText: "треку"
    },
    author: {
      ruText: "исполнителю"
    },
    genre: {
      ruText: "жанру"
    },
    album: {
      ruText: "альбому"
    },
    id: {
      ruText: "номеру",
      options: {
        descending: "По убыванию",
        increasing: "По возрастанию"
      }
    },
    release_date: {
      ruText: "дате выхода",
      options: {
        descending: "Сначала новые",
        increasing: "Сначала старые"
      }
    },
    duration_in_seconds: {
      ruText: "продолжительности",
      options: {
        descending: "Сначала долгие",
        increasing: "Сначала короткие"
      }
    },
  }

  const [expandedFilter, setExpandedFilter] = useState<string|undefined>();
  
  const handleButtonClick = (filterName: string) => {
    expandedFilter === filterName ? setExpandedFilter(undefined) : setExpandedFilter(filterName);
  }

  const content = props.filterBarOrder.map((name) => {
    if (["name", "author", "genre", "album"].includes(name)) {
      return (
        <FilterButton
          filterName={name}
          ruText={allElementsMissings[name].ruText}
          isOpened={expandedFilter === name}
          options={props.filterOptions[name as keyof typeof props.filterOptions]}
          checkedOptions={props.checkedFilters && props.checkedFilters[name as keyof typeof props.checkedFilters]}
          onBtnClick={() => {handleButtonClick(name)}}
          onDropDownClick={props.onFilterChange}
          key={name} />
      );
    }

    return (
      <FilterButton
        filterName={name}
        ruText={allElementsMissings[name].ruText}
        isOpened={expandedFilter === name}
        options={Object.values(allElementsMissings[name]["options" as keyof typeof allElementsMissings.name])}
        checkedOptions={props.checkedFilters && props.checkedFilters[name as keyof typeof props.checkedFilters]}
        onBtnClick={() => {handleButtonClick(name)}}
        onDropDownClick={props.onSortChange}
        key={name} />
    );
  });

  return (
    <div className="centerblock__filter filter">
      <div className="filter__title">Искать по:</div>
      {content}
    </div>
  );
}

function FilterButton(props: filterButtonProps) {
  return (
    <div className={`filter__button-wrapper`}>
      <div className={`filter__button${props.isOpened ? " filter__button_active" : ""} _btn-text`} onClick={props.onBtnClick}>
        {props.ruText}
      </div>
      {props.isOpened &&
      <FilterButtonDropdown
        filterName={props.filterName}
        options={props.options}
        checkedOptions={props.checkedOptions}
        onDropDownClick={props.onDropDownClick} />}
    </div>
  );
}

function FilterButtonDropdown(props: filterBtnDropdownProps) {
  return (
    <ul className="filter-button__dropdown">
      {props.options.map((option) => {
        let className = "dropdown__item";
        props.checkedOptions && props.checkedOptions.includes(option) && (className = "dropdown__item_checked")
        return (
          <li
            className={className}
            onClick={() => {
              props.onDropDownClick(props.filterName, option);
            }}
            key={option}>
              {option}
          </li>
        )
      })}
    </ul>
  );
}

function Content(props: playListProps) {
  return (
    <div className="centerblock__content" >
      <PlaylistTitle />
      <Playlist sortedTracks={props.sortedTracks} />
    </div>
  );
}

function PlaylistTitle() {
  return (
    <div className="content__title playlist-title">
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

function Playlist(props: playListProps) {
  return (
    <div className="content__playlist playlist">
      {props.sortedTracks.map((track) => {
        return <PlaylistItem {...track} key={track.id} />;
      })}
    </div>
  );
}

function PlaylistItem(props: track) {
  return (
    <div className="playlist__item">
      <Track trackData={props} />
    </div>
  );
}

function Track(props: trackProps) {
  return (
    <div className="playlist__track track">
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

function Bar(props: barProps) {
  return (
    <div className="bar">
      <div className="bar__content">
        <div className="bar__player-progress"></div>
        <PlayerBlock {...props} />
      </div>
    </div>
  );
}

function PlayerBlock(props: barProps) {
  return (
    <div className="bar__player-block">
      <Player {...props.currentTrack} />
      <Volume />
    </div>
  );
}

function Player(props: track) {
  return (
    <div className="bar__player player">
      <PlayerControls />
      <TrackPlay currentTrack={props} />
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
    <div className="player__track-play track-play">
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
