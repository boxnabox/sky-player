import { useEffect, useMemo, useState, createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import * as S from './style';

import Player from '../../components/Player';
import { getSelections } from '../../utils/server-like';
import Navigation from '../../components/Navigation';
import CenterBlock from '../../components/CenterBlock';
import Sidebar from '../../components/Sidebar';

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
      <S.Main>
        <Navigation
          isNavOpen={isNavOpen}
          onBurgerClick={toggleNavVisibility}
        />
        <CenterBlock />
        <Sidebar tracksSelection={selections} />
      </S.Main>
      </TracksBypassContext.Provider>
      <Player tracks={tracksPool} />
    </S.Container>
  );
}