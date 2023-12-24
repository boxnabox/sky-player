import { useEffect, useRef, useState } from 'react';

import * as S from './center-block.style';

import isFilter from '../../../../utils/isFilter';
import formatTime from '../../../../utils/formatTime';
import ScrollBar from '../../../../components/ScrollBar';

export default function CenterBlock(props: MainProps) {
  return (
    <S.CenterBlock>
      <SearchBar />
      <S.Heading>Треки</S.Heading>
      <PLModifierBar {...props.plModifierProps} />
      <Content sortedTracks={props.sortedTracks} />
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

function PLModifierBar(props: PLModifierProps) {
  const MODES_FILLER = {
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

  const content = props.modifierElems.map((name) => {
    if (isFilter(name)) {
      return (
        <FilterButton
          key={name}
          filterName={name}
          ruText={MODES_FILLER[name].ruText}
          options={
            props.filterOptions[name as keyof typeof props.filterOptions]
          }
          checkedOptions={
            props.filterState &&
            props.filterState[name as keyof typeof props.filterState]
          }
          onDropDownClick={props.onFilterChange}
        />
      );
    }

    return (
      <SortButton
        sortName={name}
        ruText={MODES_FILLER[name].ruText}
        options={MODES_FILLER[name].options}
        checkedOption={props.sortState?.option}
        onDropDownClick={props.onSortChange}
        key={name}
      />
    );
  });

  return (
    <S.PLModBar>
      <S.PLModBarTitle>Искать по:</S.PLModBarTitle>
      {content}
    </S.PLModBar>
  );
}

function FilterButton(props: FilterButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleBtnExpansion() {
    setIsExpanded(!isExpanded);
  }

  return (
    <S.PLModBarWrapper>
      <S.PLModButton
        type={'button'}
        $isOpened={isExpanded}
        onClick={toggleBtnExpansion}
      >
        {props.ruText}
      </S.PLModButton>
      {props.checkedOptions && <BTNCounter count={props.checkedOptions.size} />}
      {isExpanded && (
        <FilterButtonDropdown {...props} onOutClick={toggleBtnExpansion} />
      )}
    </S.PLModBarWrapper>
  );
}

function FilterButtonDropdown(props: FilterDropdownProps) {
  const [isScrollable, setScrollable] = useState<boolean>();
  const [progress, setProgress] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const WrapperNode = wrapperRef.current as HTMLDivElement;

    function onWindowClick(e: MouseEvent) {
      if (WrapperNode.contains(e.target as Node)) return;
      props.onOutClick();
    }

    // timer just to fix unexpected React18 clicks behaviour
    // https://stackoverflow.com/questions/72315874/react-click-outside-event-happens-right-after-click-to-open-preventing-the-mod/72316017#72316017
    const timerID = setTimeout(() => {
      window.addEventListener('click', onWindowClick);
    }, 0);

    return () => {
      clearTimeout(timerID);
      window.removeEventListener('click', onWindowClick);
    };
  }, []);

  return (
    <S.ScrollWrapper ref={wrapperRef}>
      <FiltersList
        onScroll={setProgress}
        lengthHandler={setScrollable}
        {...props}
      />
      {isScrollable && (
        <ScrollBar progress={progress} onSliderMove={setProgress} />
      )}
    </S.ScrollWrapper>
  );
}

function FiltersList(props: FilterOptionsList) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const listNode: HTMLUListElement = listRef.current as HTMLUListElement;
    props.lengthHandler(listNode.scrollHeight > listNode.clientHeight);

    function handleScroll(e: Event) {
      const target: HTMLUListElement = e.target as HTMLUListElement;
      props.onScroll(
        target.scrollTop / (target.scrollHeight - target.clientHeight),
      );
    }

    listNode.addEventListener('scroll', handleScroll);

    return () => {
      listNode.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <S.FilterDropdownList ref={listRef}>
      {Array.from(props.options).map((option) => {
        return (
          <S.FilterDropdownItem
            $isChecked={props.checkedOptions?.has(option)}
            onClick={() => {
              props.onDropDownClick(props.filterName, option);
            }}
            key={option}
          >
            {option}
          </S.FilterDropdownItem>
        );
      })}
    </S.FilterDropdownList>
  );
}

function SortButton(props: SortButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleBtnExpansion() {
    setIsExpanded(!isExpanded);
  }

  return (
    <S.PLModBarWrapper>
      <S.PLModButton
        type={'button'}
        $isOpened={isExpanded}
        onClick={toggleBtnExpansion}
      >
        {props.ruText}
      </S.PLModButton>
      {props.checkedOption && <BTNCounter count={1} />}
      {isExpanded && (
        <SortButtonDropdown {...props} onOutClick={toggleBtnExpansion} />
      )}
    </S.PLModBarWrapper>
  );
}

function SortButtonDropdown(props: SortBtnDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const WrapperNode = wrapperRef.current as HTMLDivElement;

    function onWindowClick(e: MouseEvent) {
      if (WrapperNode.contains(e.target as Node)) return;
      props.onOutClick();
    }

    // timer just to fix unexpected React18 clicks behaviour
    // https://stackoverflow.com/questions/72315874/react-click-outside-event-happens-right-after-click-to-open-preventing-the-mod/72316017#72316017
    const timerID = setTimeout(() => {
      window.addEventListener('click', onWindowClick);
    }, 0);

    return () => {
      clearTimeout(timerID);
      window.removeEventListener('click', onWindowClick);
    };
  }, []);

  return (
    <S.ScrollWrapper ref={wrapperRef}>
      <SortOptionsList {...props} />
    </S.ScrollWrapper>
  );
}

function SortOptionsList(props: SortBtnDropdownProps) {
  return (
    <S.DropdownList>
      {Object.keys(props.options).map((option) => {
        return (
          <S.SortDropdownItem
            onClick={() => {
              props.onDropDownClick(props.sortName, option as SortOptions);
            }}
            key={option}
          >
            {props.checkedOption === option ? (
              <S.RadioSVG
                aria-label="radio button is ON"
                href="img/icon/sprite.svg#icon-radio-on"
              />
            ) : (
              <S.RadioSVG
                aria-label="radio button is OFF"
                href="img/icon/sprite.svg#icon-radio-off"
              />
            )}
            <S.SortOptionText>
              {props.options[option as keyof typeof props.options]}
            </S.SortOptionText>
          </S.SortDropdownItem>
        );
      })}
    </S.DropdownList>
  );
}

function BTNCounter({ count }: { count: number }) {
  return <S.PLModButtonCounter>{count}</S.PLModButtonCounter>;
}

function Content(props: PLProps) {
  return (
    <S.Content>
      <PlaylistTitle />
      <Playlist sortedTracks={props.sortedTracks} />
    </S.Content>
  );
}

function PlaylistTitle() {
  return (
    <S.PLTitle>
      <S.PLCol $col={1}>Трек</S.PLCol>
      <S.PLCol $col={2}>ИСПОЛНИТЕЛЬ</S.PLCol>
      <S.PLCol $col={3}>АЛЬБОМ</S.PLCol>
      <S.PLCol $col={4}>
        <S.ClockSVG aria-label="time" href="img/icon/sprite.svg#icon-watch" />
      </S.PLCol>
    </S.PLTitle>
  );
}

function Playlist(props: PLProps) {
  if (!props.sortedTracks) {
    const result = [];
    for (let i = 0; i < 19; i++) {
      result.push(<PlayListItemPlug key={i} />);
    }
    return <S.PL>{result}</S.PL>;
  }
  return (
    <S.PL>
      {props.sortedTracks.map((track) => {
        return <PlaylistItem {...track} key={track.id} />;
      })}
    </S.PL>
  );
}

function PlaylistItem(props: Track) {
  return (
    <S.PLItem>
      <Track {...props} />
    </S.PLItem>
  );
}

function PlayListItemPlug() {
  return (
    <S.PLItem>
      <TrackPlug />
    </S.PLItem>
  );
}

function Track(props: Track) {
  return (
    <S.Track>
      <S.TrTitle>
        <S.TrTitleImg>
          <S.AlbumSVG
            aria-label="music"
            href={props.logo || 'img/icon/sprite.svg#icon-note'}
          />
        </S.TrTitleImg>
        <S.TrName>
          <S.TrNameLink href={props.track_file}>
            {props.name}
            <S.TrNamePostfix></S.TrNamePostfix>
          </S.TrNameLink>
        </S.TrName>
      </S.TrTitle>
      <S.TrAuthor>
        <S.TrAuthorLink href="http://">{props.author}</S.TrAuthorLink>
      </S.TrAuthor>
      <S.TrAlbum>
        <S.TrAlbumLink href="http://">{props.album}</S.TrAlbumLink>
      </S.TrAlbum>
      <S.TrDurationWrapper>
        <S.IsLikedSVG ariaLabel="like" href={'img/icon/sprite.svg#icon-like'} />
        <S.TrDuration>{formatTime(props.duration_in_seconds)}</S.TrDuration>
      </S.TrDurationWrapper>
    </S.Track>
  );
}

function TrackPlug() {
  return (
    <S.Track>
      <S.TrTitle>
        <S.TrTitleImg></S.TrTitleImg>
        <S.TrName $isPlug={true}></S.TrName>
      </S.TrTitle>
      <S.TrAuthor $isPlug={true}></S.TrAuthor>
      <S.TrAlbum $isPlug={true}></S.TrAlbum>
    </S.Track>
  );
}
