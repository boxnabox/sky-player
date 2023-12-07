import clsx from 'clsx';
import { useState } from 'react';
import SvgImg from '../../components/SvgImg';
import isFilter from '../../utils/isFilter';
import formatTime from '../../utils/formatTime';

export default function CenterBlock(props: MainProps) {
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

function PLModifierBar(props: PLModifierProps) {
  const allElementsMissings = {
    name: {
      ruText: 'треку',
    },
    author: {
      ruText: 'исполнителю',
    },
    genre: {
      ruText: 'жанру',
    },
    album: {
      ruText: 'альбому',
    },
    id: {
      ruText: 'номеру',
      options: {
        descending: 'По убыванию',
        ascending: 'По возрастанию',
      },
    },
    release_date: {
      ruText: 'дате выхода',
      options: {
        descending: 'Сначала новые',
        ascending: 'Сначала старые',
      },
    },
    duration_in_seconds: {
      ruText: 'продолжительности',
      options: {
        descending: 'Сначала долгие',
        ascending: 'Сначала короткие',
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
    <div className={clsx('centerblock__pl-modifier', 'pl-modifier')}>
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
          'pl-modifier__button',
          props.isOpened && 'pl-modifier__button_active',
          '_btn-text',
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
          'pl-modifier__button',
          props.isOpened && 'pl-modifier__button_active',
          '_btn-text',
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
              'dropdown__item',
              props.checkedOptions?.has(option) && 'dropdown__item_checked',
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
              'dropdown__item',
              props.checkedOption === option && 'dropdown__item_checked',
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
    <div className={clsx('content__title', 'playlist-title')}>
      <div className={clsx('playlist-title__col', 'col01')}>Трек</div>
      <div className={clsx('playlist-title__col', 'col02')}>ИСПОЛНИТЕЛЬ</div>
      <div className={clsx('playlist-title__col', 'col03')}>АЛЬБОМ</div>
      <div className={clsx('playlist-title__col', 'col04')}>
        <svg className="playlist-title__svg" aria-label="time">
          <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  );
}

function Playlist(props: PLProps) {
  if (!props.sortedTracks) {
    const result = [];
    for (let i = 0; i < 19; i++) {
      result.push(<PlayListItemPlug key={i} />);
    }
    return (
      <div className={clsx('content__playlist', 'playlist')}>{result}</div>
    );
  }
  return (
    <div className={clsx('content__playlist', 'playlist')}>
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
    <div className={clsx('playlist__item', 'playlist__item_plug')}>
      <TrackPlug />
    </div>
  );
}

function Track(props: Track) {
  return (
    <div className={clsx('playlist__track', 'track')}>
      <div className="track__title">
        <div className="track__title-image">
          <svg className="track__title-svg" aria-label="music">
            <use
              xlinkHref={props.logo || 'img/icon/sprite.svg#icon-note'}
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
          href={'img/icon/sprite.svg#icon-like'}
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
    <div className={clsx('playlist__track-plug', 'track-plug')}>
      <div className="track-plug__title">
        <div className="track-plug__title-image"></div>
        <div className="track-plug__title-text"></div>
      </div>
      <div className="track-plug__author"></div>
      <div className="track-plug__album"></div>
      <div className="track-plug__time"></div>
    </div>
  );
}
