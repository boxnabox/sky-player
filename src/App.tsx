// import { fchown } from "fs";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import "./App.scss";
import tracks from "./tracks";
import { forEachChild, isPropertySignature } from "typescript";
import { addAbortSignal } from "stream";
import { get } from "http";
// import { TrackKey, Filter, Sort } from "./react-app-env";

export default App;

// plugs ==================
const MENU_ITEMS = [
  { link: "#", text: "Главное" },
  { link: "#", text: "Мои треки" },
  { link: "#", text: "Войти" },
];

const FILTER_BAR_ELEMENTS: FilterBarOrder = ["author", "genre", "release_date"];

const ALL_TRACK_KEYS = [
  "id",
  "name",
  "author",
  "release_date",
  "genre",
  "duration_in_seconds",
  "album",
  "logo",
  "track_file",
  "stared_user",
] as const;
const ALL_FILTER_OPTIONS = ["name", "author", "genre", "album"]; //as const;
const ALL_SORT_OPTIONS = ["id", "release_date", "duration_in_seconds"]; //as const;

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

function isTrackKey(value: string): value is TrackKey {
  return ALL_TRACK_KEYS.includes(value as TrackKey);
}
function isFilter(value: string): value is Filter {
  return ALL_FILTER_OPTIONS.includes(value as Filter);
}
function isSort(value: string): value is Sort {
  return ALL_SORT_OPTIONS.includes(value as Sort);
}

// const a: { asd?: { zxc: number } } = {};
// console.log(a.asd?.zxc);

// ============ end ================

function App() {
  const [tracksPool, setTracksPool] = useState<track[]|undefined>(); // getting data every time we choose playlist|log-in
  const [checkedFilters, setCheckedFilters] = useState<FilterOptions>();
  const [checkedSortOption, setSortOption] = useState<SortState>();
  const [currnetTracksQueue, setCurrentTracksQueue] = useState<track[]|undefined>(); // getting tracks from sortedTracks after track was clicked; It is to keep tracks order when we browse other playlists
  const [trackInPlay, setTrackInPlay] = useState<track>(); // first currnetTracksQueue's track at the beginning, than track in play
  const [selections, setSelection] = useState<typeof SELECTIONS|undefined>();

  const sortedTracks = useMemo(() => {
    if (!tracksPool) return undefined;
    return getSortedTracks(tracksPool, checkedSortOption)
  }, [tracksPool, checkedSortOption]); // being updated every time we modify sorts

  // написать функцию которая будет сортировать треклист: trackList + checkedFilters => sortedTracks

  function emulateContentDownload() {
    setTracksPool(tracks);
    setSelection(SELECTIONS);
    setTrackInPlay(tracksPool && tracksPool[0]);
    console.log("downloaded");
  }

  function getSortedTracks(tracksArray: track[], sort: SortState | undefined) {
    const result: track[] = [];
    tracksArray.forEach(track => result.push(track));

    if (!sort) return result;

    return result.sort(
      (trackOne, trackTwo) => {
        let a = trackOne[sort.field];
        let b = trackTwo[sort.field];
        if (a === b) return 0;
        if (a === null) return -1;
        if (b === null) return 1;

        if (sort.option === "ascending") {
          return a < b ? -1 : 1;
        }
        return a > b ? -1 : 1;
      }
    )
  }

  const handleFilterChange = (filterKey: Filter, filterOption: string) => {
    console.log("Filter: " + filterKey + ": " + filterOption);
    let duplicateFilters: FilterOptions | undefined = { ...checkedFilters };

    if (
      duplicateFilters[filterKey as keyof typeof duplicateFilters]?.delete(
        filterOption
      )
    ) {
      duplicateFilters[filterKey as keyof typeof duplicateFilters]?.size ||
        delete duplicateFilters[filterKey as keyof typeof duplicateFilters];

      Object.keys(duplicateFilters).length || (duplicateFilters = undefined);

      setCheckedFilters(duplicateFilters);
      return;
    }

    duplicateFilters[filterKey as keyof typeof duplicateFilters] = new Set(
      duplicateFilters[filterKey as keyof typeof duplicateFilters]
    );
    duplicateFilters[filterKey as keyof typeof duplicateFilters]?.add(
      filterOption
    );

    setCheckedFilters(duplicateFilters);
  };

  const handleSortChange = (sortrKey: Sort, sortOption: SortOptions) => {
    console.log("Sort: " + sortrKey + ": " + sortOption);

    if (
      checkedSortOption &&
      checkedSortOption.field === sortrKey &&
      checkedSortOption.option === sortOption
    ) {
      setSortOption(undefined);
      return;
    }

    setSortOption({"field": sortrKey, "option": sortOption});
  };

  function getFilterOptionsByCategory(tracksArray: track[] | undefined, category: Filter) {
    const result = tracksArray
      ? new Set(tracksArray
        .map((track) => {return track[category];})
        .sort())
      : new Set([]);
    return result;
  }

  function gatherFilterProps() {
    const filterOptions: FilterOptions = {};
    FILTER_BAR_ELEMENTS.forEach((element) => {
      if (isFilter(element)) {
        filterOptions[element] = getFilterOptionsByCategory(
          sortedTracks,
          element
        );
      }
    });

    const result: FilterAndSortProps = {
      filterBarOrder: FILTER_BAR_ELEMENTS,
      filterOptions: filterOptions,
      checkedFilters: checkedFilters,
      checkedSorting: checkedSortOption,
      onFilterChange: handleFilterChange,
      onSortChange: handleSortChange,
    };
    return result;
  }

  useEffect(() => {
    const timerID = setTimeout(() => {
      emulateContentDownload();
    }, 2000);

    return () => {
      clearTimeout(timerID);
    };
  },[]);

  return (
    <div className="wrapper">
      <div className="container">
        <Main sortedTracks={sortedTracks} filterProps={gatherFilterProps()} />
        <Bar currentTrack={trackInPlay} />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}


function Main(props: mainProps) {
  return (
    <main className="main">
      <Navigation navItems={MENU_ITEMS} isOpened={false} />
      <CenterBlock {...props} />
      <Sidebar />
    </main>
  );
}

function Navigation(props: navProps) {
  const [isMenuVisible, setMenuVisibility] = useState(props.isOpened);

  const toggleMenuVisibility = () => {
    setMenuVisibility(!isMenuVisible);
  };

  return (
    <nav className={clsx("main__nav", "nav")}>
      <Logo />
      <Burger onClick={toggleMenuVisibility} />
      {isMenuVisible && <Menu listOfItems={props.navItems} />}
    </nav>
  );
}

function Logo() {
  return (
    <div className={clsx("nav__logo", "logo")}>
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
    <div className={clsx("nav__burger", "burger")} onClick={props.onClick}>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
    </div>
  );
}

function Menu(props: menuProps) {
  return (
    <div className={clsx("nav__menu", "menu")}>
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

function FilterBar(props: FilterAndSortProps) {
  const allElementsMissings = {
    name: {
      ruText: "треку",
    },
    author: {
      ruText: "исполнителю",
    },
    genre: {
      ruText: "жанру",
    },
    album: {
      ruText: "альбому",
    },
    id: {
      ruText: "номеру",
      options: {
        descending: "По убыванию",
        ascending: "По возрастанию",
      },
    },
    release_date: {
      ruText: "дате выхода",
      options: {
        descending: "Сначала новые",
        ascending: "Сначала старые",
      },
    },
    duration_in_seconds: {
      ruText: "продолжительности",
      options: {
        descending: "Сначала долгие",
        ascending: "Сначала короткие",
      },
    },
  };

  const [expandedFilter, setExpandedFilter] = useState<string | undefined>();

  const handleButtonClick = (filterName: string) => {
    expandedFilter === filterName
      ? setExpandedFilter(undefined)
      : setExpandedFilter(filterName);
  };

  const content = props.filterBarOrder.map((name) => {
    if (isFilter(name)) {
      return (
        <FilterButton
          filterName={name}
          ruText={allElementsMissings[name].ruText}
          isOpened={expandedFilter === name}
          options={
            props.filterOptions[name as keyof typeof props.filterOptions]
          }
          checkedOptions={
            props.checkedFilters &&
            props.checkedFilters[name as keyof typeof props.checkedFilters]
          }
          onBtnClick={() => {
            handleButtonClick(name);
          }}
          onDropDownClick={props.onFilterChange}
          key={name}
        />
      );
    }

    return (
      <SortButton
        sortName={name}
        ruText={allElementsMissings[name].ruText}
        isOpened={expandedFilter === name}
        options={allElementsMissings[name].options}
        checkedOption={props.checkedSorting?.option}
        onBtnClick={() => {
          handleButtonClick(name);
        }}
        onDropDownClick={props.onSortChange}
        key={name}
      />
    );
  });

  return (
    <div className={clsx("centerblock__filter", "filter")}>
      <div className="filter__title">Искать по:</div>
      {content}
    </div>
  );
}

function FilterButton(props: FilterButtonProps) {
  return (
    <div className="filter__button-wrapper">
      <div
        className={clsx(
          "filter__button",
          props.isOpened && "filter__button_active",
          "_btn-text"
        )}
        onClick={props.onBtnClick}
      >
        {props.ruText}
      </div>
      {props.isOpened && (
        <FilterButtonDropdown
          filterName={props.filterName}
          options={props.options}
          checkedOptions={props.checkedOptions}
          onDropDownClick={props.onDropDownClick}
        />
      )}
    </div>
  );
}

function SortButton(props: SortButtonProps) {
  return (
    <div className="filter__button-wrapper">
      <div
        className={clsx(
          "filter__button",
          props.isOpened && "filter__button_active",
          "_btn-text"
        )}
        onClick={props.onBtnClick}
      >
        {props.ruText}
      </div>
      {props.isOpened && (
        <SortButtonDropdown
          sortName={props.sortName}
          options={props.options}
          checkedOption={props.checkedOption}
          onDropDownClick={props.onDropDownClick}
        />
      )}
    </div>
  );
}

function FilterButtonDropdown(props: FilterBtnDropdownProps) {
  return (
    <ul className="filter-button__dropdown">
      {Array.from(props.options).map((option) => {
        return (
          <li
            className={clsx(
              "dropdown__item",
              props.checkedOptions?.has(option) && "dropdown__item_checked"
            )}
            onClick={() => {
              props.onDropDownClick(props.filterName, option);
            }}
            key={option}
          >
            {option}
          </li>
        );
      })}
    </ul>
  );
}

function SortButtonDropdown(props: SortBtnDropdownProps) {
  return (
    <ul className="filter-button__dropdown">
      {Object.keys(props.options).map((option) => {
        return (
          <li
            className={clsx(
              "dropdown__item",
              props.checkedOption === option && "dropdown__item_checked"
            )}
            onClick={() => {
              props.onDropDownClick(props.sortName, option as SortOptions);
            }}
            key={option}
          >
            {props.options[option as keyof typeof props.options]}
          </li>
        );
      })}
    </ul>
  );
}

function Content(props: playListProps) {
  return (
    <div className="centerblock__content">
      <PlaylistTitle />
      <Playlist sortedTracks={props.sortedTracks} />
    </div>
  );
}

function PlaylistTitle() {
  return (
    <div className={clsx("content__title", "playlist-title")}>
      <div className={clsx("playlist-title__col", "col01")}>Трек</div>
      <div className={clsx("playlist-title__col", "col02")}>ИСПОЛНИТЕЛЬ</div>
      <div className={clsx("playlist-title__col", "col03")}>АЛЬБОМ</div>
      <div className={clsx("playlist-title__col", "col04")}>
        <svg className="playlist-title__svg" aria-label="time">
          <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  );
}

function Playlist(props: playListProps) {
  if (!props.sortedTracks) {
    return (
      <PlayListItemPlug />
    )
  }
  return (
    <div className={clsx("content__playlist", "playlist")}>
      {props.sortedTracks.map((track) => {
        return <PlaylistItem {...track} key={track.id} />;
      })}
    </div>
  );
}

function PlayListItemPlug() {
  return (
    <div className={clsx("playlist__item", "playlist__item_plug")}>

    </div>
  )
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
    <div className={clsx("playlist__track", "track")}>
      <div className="track__title">
        <div className="track__title-image">
          <svg className="track__title-svg" aria-label="music">
            <use
              xlinkHref={
                props.trackData.logo || "img/icon/sprite.svg#icon-note"
              }
            ></use>
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
          ariaLabel="like"
          href={"img/icon/sprite.svg#icon-like"}
        />
        <span className="track__time-text">
          {formatTime(props.trackData.duration_in_seconds)}
        </span>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className={clsx("main__sidebar", "sidebar")}>
      <SidebarMenu />
      <div className="sidebar__block">
        <SidebarList />
      </div>
    </div>
  );
}

function SidebarMenu() {
  return (
    <div className={clsx("sidebar__personal", "sidebar-menu")}>
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
      <Player {...props} />
      <Volume />
    </div>
  );
}

function Player(props: barProps) {
  if (!props.currentTrack) {
    return (
    <div className={clsx("bar__player", "player")}>
      <PlayerControls />
      <div className={clsx("player__track-play_plug", "track-play_plug")}></div>
    </div>
    )
  }
  return (
    <div className={clsx("bar__player", "player")}>
      <PlayerControls />
      <TrackPlay {...props.currentTrack} />
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
      <div className={clsx("player__btn-play", "_btn")}>
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
      <div className={clsx("player__btn-repeat", "_btn-icon")}>
        <SvgImg
          className="player__btn-repeat-svg"
          ariaLabel="repeat"
          href="img/icon/sprite.svg#icon-repeat"
        />
      </div>
      <div className={clsx("player__btn-shuffle", "_btn-icon")}>
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
      className={clsx(props.className, "std-svg")}
      aria-label={`${props.ariaLabel || "no desc"}`}
    >
      <use xlinkHref={props.href}></use>
    </svg>
  );
}

function TrackPlay(props: track) {
  return (
    <div className={clsx("player__track-play", "track-play")}>
      <div className="track-play__contain">
        <div className="track-play__image">
          <SvgImg
            className="track-play__svg"
            ariaLabel="music"
            href={props.logo || "img/icon/sprite.svg#icon-note"}
          />
        </div>
        <div className="track-play__author">
          <a className="track-play__author-link" href="http://">
            {props.name}
          </a>
        </div>
        <div className="track-play__album">
          <a className="track-play__album-link" href="http://">
            {props.author}
          </a>
        </div>
      </div>

      <div className="track-play__like-dis">
        <LikeBtn parentBlockName="track-play" />

        <div
          className={clsx(
            "track-play__dislike-btn",
            "dislike-btn",
            "_btn-icon"
          )}
        >
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
      className={clsx(
        props.parentBlockName && props.parentBlockName + "__like-btn",
        "like-btn",
        "_btn-icon"
      )}
    >
      <SvgImg
        className={clsx(
          props.parentBlockName && props.parentBlockName + "__like-svg",
          "like-btn__like-svg",
          "like-svg"
        )}
        ariaLabel="like"
        href={"img/icon/sprite.svg#icon-like"}
      />
    </div>
  );
}

function Volume() {
  return (
    <div className={clsx("bar__volume-block", "volume")}>
      <div className="volume__content">
        <div className="volume__image">
          <svg className="volume__svg" aria-label="volume">
            <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className={clsx("volume__progress", "_btn")}>
          <input
            className={clsx("volume__progress-line", "_btn")}
            type="range"
            name="range"
          />
        </div>
      </div>
    </div>
  );
}
