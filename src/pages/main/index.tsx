import { useEffect, useMemo, useState, createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import * as S from './style';

import Main from './blocks/Main';
import Bar from './blocks/Bar';
import { getSelections } from '../../utils/server-like';

export function loader() {
  console.log('Main page loader');
  return getSelections();
}

export const TracksBypassContext = createContext<React.Dispatch<
  React.SetStateAction<Track[] | undefined>
> | null>(null);

export default function MainPage() {
  const [isNavOpen, setNavVisibility] = useState<boolean>();
  const [tracksPool, setTracksPool] = useState<Track[]>();
  const [selections, setSelection] = useState<TracksSelection[]>(
    useLoaderData() as TracksSelection[],
  );
  // getting data every time we choose playlist|log-in

  const [currnetTracksQueue, setCurrentTracksQueue] =
    useState<typeof tracksPool>(); // getting tracks from sortedTracks after track was clicked; It is to keep tracks order when we browse other playlists
  const trackOnPlay = useMemo(() => {
    return tracksPool && tracksPool[0];
  }, [tracksPool]);

  const toggleNavVisibility = () => {
    setNavVisibility(!isNavOpen);
  };

  useEffect(() => {
    console.log('render: Main page');
  });

  return (
    <S.Container>
      <TracksBypassContext.Provider value={setTracksPool}>
        <Main
          tracksSelection={selections}
          isNavOpen={isNavOpen}
          onBurgerClick={toggleNavVisibility}
        />
      </TracksBypassContext.Provider>
      <Bar tracks={tracksPool} />
    </S.Container>
  );
}
