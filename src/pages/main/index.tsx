import { useEffect, useMemo, useState } from 'react';
import * as S from './style';
import * as PLUG from '../../data/plugs';
import { tracks as plugTracks } from '../../data/tracks';
import { selections as plugSelections } from '../../data/selections';

import isFilter from '../../utils/isFilter';
import Main from './blocks/Main';
import Bar from './blocks/Bar';

export default function MainPage() {
  const [tracksPool, setTracksPool] = useState<Track[]>();
  const [selections, setSelection] = useState<TracksSelection[]>();
  // getting data every time we choose playlist|log-in

  const [filterState, setfilterState] = useState<FilterOptions>();
  const [sortState, setSortOption] = useState<SortState>();

  const [currnetTracksQueue, setCurrentTracksQueue] =
    useState<typeof tracksPool>(); // getting tracks from sortedTracks after track was clicked; It is to keep tracks order when we browse other playlists
  const trackOnPlay = useMemo(() => {
    return tracksPool && tracksPool[0];
  }, [tracksPool]);

  const sortedTracks = useMemo(() => {
    if (!tracksPool) return undefined;
    return getSortedTracks(tracksPool, sortState);
  }, [tracksPool, sortState]); // being updated every time we modify sorts

  function emulateContentDownload() {
    setTracksPool(plugTracks);
    setSelection(plugSelections);
    console.log('downloaded');
  }

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
    const timerID = setTimeout(() => {
      emulateContentDownload();
    }, 500);

    return () => {
      clearTimeout(timerID);
    };
  }, []);

  return (
    <S.Container>
      <Main
        sortedTracks={sortedTracks}
        plModifierProps={gatherFilterBarProps()}
        tracksSelection={selections}
      />
      <Bar currentTrack={trackOnPlay} />
    </S.Container>
  );
}
