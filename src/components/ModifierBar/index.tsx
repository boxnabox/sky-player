import FilterButton from '../FilterButton';
import SortButton from '../SortButton';

import isFilter from '../../utils/isFilter';

import * as S from './style';

export default function PLModifierBar(props: PLModifierProps) {
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
