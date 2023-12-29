import { useEffect, useMemo, useState } from 'react';
import PLModifierBar from '../MdifierBar';
import Playlist from '../PlayList';

import * as PLUG from '../../data/plugs';
import * as S from './style';
import isFilter from '../../utils/isFilter';

export default function MasterList(props: { tracks: Track[] }) {
  const [filterState, setfilterState] = useState<FilterOptions>();
  const [sortState, setSortOption] = useState<SortState>();

  const sortedTracks = useMemo(() => {
    if (!props.tracks) return undefined;
    return getSortedTracks(props.tracks, sortState);
  }, [props.tracks, sortState]);
  // being updated every time we modify sorts

  function getSortedTracks(tracksArray: Track[], sortState?: SortState) {
    const result: Track[] = [];
    tracksArray.forEach((track) => result.push(track));

    if (!sortState) return result;

    return result.sort((trackOne, trackTwo) => {
      const a = trackOne[sortState.field];
      const b = trackTwo[sortState.field];
      if (a === b) return 0;
      if (a === null) return -1;
      if (b === null) return 1;

      if (sortState.option === 'ascending') {
        return a < b ? -1 : 1;
      }
      return a > b ? -1 : 1;
    });
  }

  const handleFilterChange = (filterKey: FilterKey, filterOption: string) => {
    console.log('Filter: ' + filterKey + ': ' + filterOption);
    let duplicateFilters: FilterOptions | undefined = { ...filterState };

    if (
      duplicateFilters[filterKey as keyof typeof duplicateFilters]?.delete(
        filterOption,
      )
    ) {
      duplicateFilters[filterKey as keyof typeof duplicateFilters]?.size ||
        delete duplicateFilters[filterKey as keyof typeof duplicateFilters];

      Object.keys(duplicateFilters).length || (duplicateFilters = undefined);

      setfilterState(duplicateFilters);
      return;
    }

    duplicateFilters[filterKey as keyof typeof duplicateFilters] = new Set(
      duplicateFilters[filterKey as keyof typeof duplicateFilters],
    );
    duplicateFilters[filterKey as keyof typeof duplicateFilters]?.add(
      filterOption,
    );

    setfilterState(duplicateFilters);
  };

  const handleSortChange = (sortrKey: SortKey, sortOption: SortOptions) => {
    console.log('Sort: ' + sortrKey + ': ' + sortOption);
    if (
      sortState &&
      sortState.field === sortrKey &&
      sortState.option === sortOption
    ) {
      setSortOption(undefined);
      return;
    }
    setSortOption({ field: sortrKey, option: sortOption });
  };

  function getFilterOptionsByCategory(
    tracksArray: Track[] | undefined,
    category: FilterKey,
  ) {
    const result = tracksArray
      ? new Set(
          tracksArray
            .map((track) => {
              return track[category];
            })
            .sort(),
        )
      : new Set([]);
    return result;
  }

  function gatherFilterBarProps() {
    const filterOptions: FilterOptions = {};
    PLUG.PL_MODIFIER_BAR_ELEMENTS.forEach((element) => {
      if (isFilter(element)) {
        filterOptions[element] = getFilterOptionsByCategory(
          sortedTracks,
          element,
        );
      }
    });

    const result: PLModifierProps = {
      modifierElems: PLUG.PL_MODIFIER_BAR_ELEMENTS,
      filterOptions: filterOptions,
      filterState: filterState,
      sortState: sortState,
      onFilterChange: handleFilterChange,
      onSortChange: handleSortChange,
    };
    return result;
  }

  useEffect(() => {
    console.log('render: Master list');
  });

  return (
    <>
      <S.Heading>Треки</S.Heading>
      <PLModifierBar {...gatherFilterBarProps()} />
      <Playlist sortedTracks={sortedTracks} />
    </>
  );
}
