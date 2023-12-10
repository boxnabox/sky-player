import { useEffect, useRef, useState } from 'react';

import * as S from './styles/center-block';

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
  const [expandedFilter, setExpandedFilter] = useState<string | undefined>();

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
    <S.PLModBar>
      <S.PLModBarTitle>Искать по:</S.PLModBarTitle>
      {content}
    </S.PLModBar>
  );
}

// function FilterButtonDropdown(props: FilterBtnDropdownProps) {
//   return (
//     <S.PLModDropdown>
//       {Array.from(props.options).map((option) => {
//         return (
//           <S.DropdownItem
//             $isChecked={props.checkedOptions?.has(option)}
//             onClick={() => {
//               props.onDropDownClick(props.filterName, option);
//             }}
//             key={option}
//           >
//             {option}
//           </S.DropdownItem>
//         );
//       })}
//     </S.PLModDropdown>
//   );
// }

function FilterButton(props: FilterButtonProps) {
  return (
    <S.PLModBarWrapper>
      <S.PLModButton
        type={'button'}
        $isOpened={props.isOpened}
        onClick={props.onBtnClick}
      >
        {props.ruText}
      </S.PLModButton>
      {props.isOpened && <FilterButtonDropdown {...props} />}
    </S.PLModBarWrapper>
  );
}

function FilterButtonDropdown(props: FilterBtnDropdownProps) {
  const [isScrollable, setScrollable] = useState<boolean>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('====================');
    console.log('mounted: wrapper; ' + 'wrapper state: ' + progress);
  });

  return (
    <S.ScrollWrapper>
      <FiltersList
        onScroll={setProgress}
        lengthHandler={setScrollable}
        {...props}
      />
      {isScrollable && <ScrollBar coef={progress} onSliderMove={setProgress} />}
    </S.ScrollWrapper>
  );
}

function FiltersList(props: FilterOptionsList) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    console.log('mounted: list');
    const listNode: HTMLUListElement = listRef.current as HTMLUListElement;
    props.lengthHandler(listNode.scrollHeight > listNode.clientHeight);

    listNode.addEventListener('scroll', (e: Event) => {
      const target: HTMLUListElement = e.target as HTMLUListElement;
      props.onScroll(
        target.scrollTop / (target.scrollHeight - target.clientHeight),
      );
    });
  });

  return (
    <S.DropdownList ref={listRef}>
      {Array.from(props.options).map((option) => {
        return (
          <S.DropdownItem
            $isChecked={props.checkedOptions?.has(option)}
            onClick={() => {
              props.onDropDownClick(props.filterName, option);
            }}
            key={option}
          >
            {option}
          </S.DropdownItem>
        );
      })}
    </S.DropdownList>
  );
}

// function SortButton(props: SortButtonProps) {
//   return (
//     <S.PLModBarWrapper>
//       <S.PLModButton
//         type={'button'}
//         $isOpened={props.isOpened}
//         onClick={props.onBtnClick}
//       >
//         {props.ruText}
//       </S.PLModButton>
//       {props.isOpened && (
//         <SortButtonDropdown
//           sortName={props.sortName}
//           options={props.options}
//           checkedOption={props.checkedOption}
//           onDropDownClick={props.onDropDownClick}
//         />
//       )}
//     </S.PLModBarWrapper>
//   );
// }

function SortButton(props: SortButtonProps) {
  return (
    <S.PLModBarWrapper>
      <S.PLModButton
        type={'button'}
        $isOpened={props.isOpened}
        onClick={props.onBtnClick}
      >
        {props.ruText}
      </S.PLModButton>
      {props.isOpened && <SortButtonDropdown {...props} />}
    </S.PLModBarWrapper>
  );
}

function SortButtonDropdown(props: SortButtonProps) {
  return (
    <S.ScrollWrapper>
      <SortOptionsList {...props} />
    </S.ScrollWrapper>
  );
}

function SortOptionsList(props: SortBtnDropdownProps) {
  return (
    <S.DropdownList>
      {Object.keys(props.options).map((option) => {
        return (
          <S.DropdownItem
            $isChecked={props.checkedOption === option}
            onClick={() => {
              props.onDropDownClick(props.sortName, option as SortOptions);
            }}
            key={option}
          >
            {props.options[option as keyof typeof props.options]}
          </S.DropdownItem>
        );
      })}
    </S.DropdownList>
  );
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
