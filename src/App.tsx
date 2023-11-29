import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import "./App.scss";
import tracks from "./tracks";


export default App;

// plugs ==================

// const ALL_TRACK_KEYS = [
//   "id",
//   "name",
//   "author",
//   "release_date",
//   "genre",
//   "duration_in_seconds",
//   "album",
//   "logo",
//   "track_file",
//   "stared_user",
// ] as const;
const ALL_FILTER_OPTIONS = ["name", "author", "genre", "album"] as const;
// const ALL_SORT_OPTIONS = ["id", "release_date", "duration_in_seconds"] as const;

const MENU_ITEMS = [
  { link: "#", text: "Главное" },
  { link: "#", text: "Мои треки" },
  { link: "#", text: "Войти" },
];

const PL_MODIFIER_BAR_ELEMENTS: PLModifierElems = ["author", "genre", "release_date"];

const SELECTIONS = [
  {
    name: "today plst",
    href: "https://",
    imgSrc: "assets/img/playlist01.png",
    imgAlt: "day's playlist",
  },
  {
    name: "100 hits",
    href: "https://",
    imgSrc: "assets/img/playlist02.png",
    imgAlt: "day's playlist",
  },
  {
    name: "indie",
    href: "https://",
    imgSrc: "assets/img/playlist03.png",
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

// function isTrackKey(value: string): value is TrackKey {
//   return ALL_TRACK_KEYS.includes(value as TrackKey);
// }
// function isSort(value: string): value is Sort {
//   return ALL_SORT_OPTIONS.includes(value as Sort);
// }
function isFilter(value: string): value is FilterKey {
  return ALL_FILTER_OPTIONS.includes(value as FilterKey);
}


// ============ end ================

function App() {
  const [tracksPool, setTracksPool] = useState<Track[]|undefined>(); // getting data every time we choose playlist|log-in
  const [filterState, setCheckedFilters] = useState<FilterOptions>();
  const [sortState, setSortOption] = useState<SortState>();
  const [currnetTracksQueue, setCurrentTracksQueue] = useState<typeof tracksPool>(); // getting tracks from sortedTracks after track was clicked; It is to keep tracks order when we browse other playlists
  const [selections, setSelection] = useState<typeof SELECTIONS|undefined>();

  const trackOnPlay = useMemo(() => {return tracksPool && tracksPool[0]}, [tracksPool])
  const sortedTracks = useMemo(() => {
    if (!tracksPool) return undefined;
    return getSortedTracks(tracksPool, sortState)
  }, [tracksPool, sortState]); // being updated every time we modify sorts

  function emulateContentDownload() {
    setTracksPool(tracks);
    setSelection(SELECTIONS);
    console.log("downloaded");
  }

  function getSortedTracks(tracksArray: Track[], sortState?: SortState) {
    const result: Track[] = [];
    tracksArray.forEach(track => result.push(track));

    if (!sortState) return result;

    return result.sort(
      (trackOne, trackTwo) => {
        let a = trackOne[sortState.field];
        let b = trackTwo[sortState.field];
        if (a === b) return 0;
        if (a === null) return -1;
        if (b === null) return 1;

        if (sortState.option === "ascending") {
          return a < b ? -1 : 1;
        }
        return a > b ? -1 : 1;
      }
    )
  }

  const handleFilterChange = (filterKey: FilterKey, filterOption: string) => {
    console.log("Filter: " + filterKey + ": " + filterOption);
    let duplicateFilters: FilterOptions | undefined = { ...filterState };

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

  const handleSortChange = (sortrKey: SortKey, sortOption: SortOptions) => {
    console.log("Sort: " + sortrKey + ": " + sortOption);
    if (
      sortState &&
      sortState.field === sortrKey &&
      sortState.option === sortOption
    ) {
      setSortOption(undefined);
      return;
    }
    setSortOption({"field": sortrKey, "option": sortOption});
  };

  function getFilterOptionsByCategory(tracksArray: Track[] | undefined, category: FilterKey) {
    const result = tracksArray
      ? new Set(tracksArray
        .map((track) => {return track[category];})
        .sort())
      : new Set([]);
    return result;
  }

  function gatherFilterBarProps() {
    const filterOptions: FilterOptions = {};
    PL_MODIFIER_BAR_ELEMENTS.forEach((element) => {
      if (isFilter(element)) {
        filterOptions[element] = getFilterOptionsByCategory(
          sortedTracks,
          element
        );
      }
    });

    const result: PLModifierProps = {
      modifierElems: PL_MODIFIER_BAR_ELEMENTS,
      filterOptions: filterOptions,
      filterState: filterState,
      checkedSorting: sortState,
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
        <Main
          sortedTracks={sortedTracks}
          plModifierProps={gatherFilterBarProps()}
          tracksSelection={selections}
        />
        <Bar currentTrack={trackOnPlay} />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

function Main(props: MainProps) {
  return (
    <main className="main">
      <Navigation
        navItems={MENU_ITEMS}
        isExpanded={false}
      />
      <CenterBlock {...props} />
      <Sidebar tracksSelection={props.tracksSelection}/>
    </main>
  );
}

function Navigation(props: NavProps) {
  const [isExpanded, setMenuVisibility] = useState(props.isExpanded);

  const toggleMenuVisibility = () => {
    setMenuVisibility(!isExpanded);
  };

  return (
    <nav className={clsx("main__nav", "nav")}>
      <Logo />
      <Burger onClick={toggleMenuVisibility} />
      {isExpanded && <Menu {...props} />}
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

function Burger(props: BurgerProps) {
  return (
    <div className={clsx("nav__burger", "burger")} onClick={props.onClick}>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
    </div>
  );
}

function Menu({navItems}: NavProps) {
  return (
    <div className={clsx("nav__menu", "menu")}>
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

function CenterBlock(props: MainProps) {
  return (
    <div className="main__centerblock">
      <SearchBar />
      <h2 className="centerblock__h2">Треки</h2>
      <PLModifierBar {...props.plModifierProps} />
      <Content sortedTracks={props.sortedTracks} />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="centerblock__search">
      <SvgImg
        className="search__svg"
        href="assets/img/icon/sprite.svg#icon-search"
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

function PLModifierBar(props: PLModifierProps) {
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

  const content = props.modifierElems.map((name) => {
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
            props.filterState &&
            props.filterState[name as keyof typeof props.filterState]
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
    <div className={clsx("centerblock__pl-modifier", "pl-modifier")}>
      <div className="pl-modifier__title">Искать по:</div>
      {content}
    </div>
  );
}

function FilterButton(props: FilterButtonProps) {
  return (
    <div className="pl-modifier__button-wrapper">
      <div
        className={clsx(
          "pl-modifier__button",
          props.isOpened && "pl-modifier__button_active",
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
    <div className="pl-modifier__button-wrapper">
      <div
        className={clsx(
          "pl-modifier__button",
          props.isOpened && "pl-modifier__button_active",
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
    <ul className="pl-modifier-button__dropdown">
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
    <ul className="pl-modifier-button__dropdown">
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

function Content(props: PLProps) {
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
          <use xlinkHref="assets/img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  );
}

function Playlist(props: PLProps) {
  if (!props.sortedTracks) {
    const result = [];
    for (let i = 0; i < 19; i++) {
      result.push(<PlayListItemPlug key={i}/>)
    }
    return (
      <div className={clsx("content__playlist", "playlist")}>
        {result}
      </div>
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

function PlaylistItem(props: Track) {
  return (
    <div className="playlist__item">
      <Track {...props} />
    </div>
  );
}

function PlayListItemPlug() {
  return (
    <div className={clsx("playlist__item", "playlist__item_plug")}>
      <TrackPlug />
    </div>
  )
}

function Track(props: Track) {
  return (
    <div className={clsx("playlist__track", "track")}>
      <div className="track__title">
        <div className="track__title-image">
          <svg className="track__title-svg" aria-label="music">
            <use
              xlinkHref={
                props.logo || "assets/img/icon/sprite.svg#icon-note"
              }
            ></use>
          </svg>
        </div>
        <div className="track__title-text">
          <a className="track__title-link" href={props.track_file}>
            {props.name}
            <span className="track__title-span"></span>
          </a>
        </div>
      </div>
      <div className="track__author">
        <a className="track__author-link" href="http://">
          {props.author}
        </a>
      </div>
      <div className="track__album">
        <a className="track__album-link" href="http://">
          {props.album}
        </a>
      </div>
      <div className="track__time">
        <SvgImg
          className="track__time-svg"
          ariaLabel="like"
          href={"assets/img/icon/sprite.svg#icon-like"}
        />
        <span className="track__time-text">
          {formatTime(props.duration_in_seconds)}
        </span>
      </div>
    </div>
  );
}

function TrackPlug() {
  return (
    <div className={clsx("playlist__track-plug", "track-plug")}>
      <div className="track-plug__title">
        <div className="track-plug__title-image">
        </div>
        <div className="track-plug__title-text">
        </div>
      </div>
      <div className="track-plug__author">
      </div>
      <div className="track-plug__album">
      </div>
      <div className="track-plug__time">
      </div>
    </div>
  );
}

function Sidebar(props: SidebarProps) {
  return (
    <div className={clsx("main__sidebar", "sidebar")}>
      <SidebarMenu />
      <div className="sidebar__block">
        <SidebarList tracksSelection={props.tracksSelection}/>
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

function SidebarList(props: SidebarProps) {
  if (!props.tracksSelection) {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(<SidebarItemPlug key={i}/>)
    }
    return (
      <div className="sidebar__list">
        {result}
      </div>
    )
  }

  return (
    <div className="sidebar__list">
      {props.tracksSelection.map((selection) => {
        return <SidebarItem {...selection} key={selection.name} />;
      })}
    </div>
  );
}

function SidebarItem(props: TracksSelection) {
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

function SidebarItemPlug() {
  return (
    <div className="sidebar__item sidebar-item-plug">
    </div>
  );
}

function Bar(props: PlayerBarProps) {
  return (
    <div className="bar">
      <div className="bar__content">
        <div className="bar__player-progress"></div>
        <PlayerBlock {...props} />
      </div>
    </div>
  );
}

function PlayerBlock(props: PlayerBarProps) {
  return (
    <div className="bar__player-block">
      <Player {...props} />
      <Volume />
    </div>
  );
}

function Player(props: PlayerBarProps) {
  if (!props.currentTrack) {
    return (
    <div className={clsx("bar__player", "player")}>
      <PlayerControls />
      <TrackOnPlayPlug />
    </div>
    )
  }
  return (
    <div className={clsx("bar__player", "player")}>
      <PlayerControls />
      <TrackOnPlay track={props.currentTrack} />
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
          href="assets/img/icon/sprite.svg#icon-prev"
        />
      </div>
      <div className={clsx("player__btn-play", "_btn")}>
        <SvgImg
          className="player__btn-play-svg"
          ariaLabel="play"
          href="assets/img/icon/sprite.svg#icon-play"
        />
      </div>
      <div className="player__btn-next">
        <SvgImg
          className="player__btn-next-svg"
          ariaLabel="next"
          href="assets/img/icon/sprite.svg#icon-next"
        />
      </div>
      <div className={clsx("player__btn-repeat", "_btn-icon")}>
        <SvgImg
          className="player__btn-repeat-svg"
          ariaLabel="repeat"
          href="assets/img/icon/sprite.svg#icon-repeat"
        />
      </div>
      <div className={clsx("player__btn-shuffle", "_btn-icon")}>
        <SvgImg
          className="player__btn-shuffle-svg"
          ariaLabel="shuffle"
          href="assets/img/icon/sprite.svg#icon-shuffle"
        />
      </div>
    </div>
  );
}

function SvgImg(props: SVGProps) {
  return (
    <svg
      className={clsx(props.className, "std-svg")}
      aria-label={`${props.ariaLabel || "no desc"}`}
    >
      <use xlinkHref={props.href}></use>
    </svg>
  );
}

function TrackOnPlay(props: TrackOnPlayProps) {
  return (
    <div className={clsx("player__track-on-play", "track-on-play")}>
      <div className="track-on-play__contain">
        <div className="track-on-play__image">
          <SvgImg
            className="track-on-play__svg"
            ariaLabel="music"
            href={props.track.logo || "assets/img/icon/sprite.svg#icon-note"}
          />
        </div>
        <div className="track-on-play__name">
          <a className="track-on-play__name-link" href="http://">
            {props.track.name}
          </a>
        </div>
        <div className="track-on-play__author">
          <a className="track-on-play__author-link" href="http://">
            {props.track.author}
          </a>
        </div>
      </div>

      <div className="track-on-play__like-dis">
        <LikeBtn
          parentBlockName="track-on-play"
          onClick={() => {console.log(`track #${props.track.id} was liked`)}}
        />
        <DisLikeBtn
          parentBlockName="track-on-play"
          onClick={() => {console.log(`track #${props.track.id} was disliked`)}}
        />
      </div>
    </div>
  );
}

function TrackOnPlayPlug() {
  return (
    <div className={clsx("player__track-on-play", "track-on-play-plug")}>
      <div className={clsx("track-on-play__contain", "track-on-play-plug__contain")}>
        <div className={clsx("track-on-play__image", "track-on-play-plug__image")}>
        </div>
        <div className={clsx("track-on-play__name", "track-on-play-plug__name")}>
        </div>
        <div className={clsx("track-on-play__author", "track-on-play-plug__author")}>
        </div>
      </div>

      <div className="track-on-play__like-dis">
        <LikeBtn parentBlockName="track-on-play" />

        <div
          className={clsx(
            "track-on-play__dislike-btn",
            "dislike-btn",
            "_btn-icon"
          )}
        >
          <svg className="track-on-play__dislike-svg" aria-label="dislike">
            <use xlinkHref="assets/img/icon/sprite.svg#icon-dislike"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LikeBtn(props: ReactionBtnProps) {
  return (
    <div
      className={clsx(
        props.parentBlockName && props.parentBlockName + "__like-btn",
        "like-btn",
        "_btn-icon"
      )}
      onClick={props.onClick}
    >
      <SvgImg
        className={clsx(
          props.parentBlockName && props.parentBlockName + "__like-svg",
          "like-btn__like-svg",
          "like-svg"
        )}
        ariaLabel="like"
        href={"assets/img/icon/sprite.svg#icon-like"}
      />
    </div>
  );
}

function DisLikeBtn(props: ReactionBtnProps) {
  return (
    <div
      className={clsx(
        props.parentBlockName && props.parentBlockName + "__dislike-btn",
        "dislike-btn",
        "_btn-icon"
      )}
      onClick={props.onClick}
    >
      <SvgImg
        className={clsx(
          props.parentBlockName && props.parentBlockName + "__dislike-svg",
          "dislike-btn__dislike-svg",
          "dislike-svg"
        )}
        ariaLabel="dislike"
        href={"assets/img/icon/sprite.svg#icon-dislike"}
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
            <use xlinkHref="assets/img/icon/sprite.svg#icon-volume"></use>
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
