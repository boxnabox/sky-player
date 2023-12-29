import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import MasterList from '../components/MasterList';
import { getAllTracks } from '../utils/server-like';
import { TracksBypassContext } from '../pages/main';

export function loader() {
  console.log('all tracks loader');
  return getAllTracks();
}

export default function AllTracksRoute() {
  const tracks = useLoaderData() as Track[];
  const onDataLoad = useContext(TracksBypassContext);

  useEffect(() => {
    onDataLoad && onDataLoad(tracks);
  }, []);

  return <MasterList tracks={tracks} />;
}
