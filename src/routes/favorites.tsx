import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import SimpleList from '../components/SimpleList';
import { getFavorites } from '../utils/server-like';
import { TracksBypassContext } from '../pages/main';

export function loader() {
  console.log('favorites loader');
  return getFavorites();
}

export default function FavoritesRoute() {
  const selection = useLoaderData() as TracksSelection;

  const onDataLoad = useContext(TracksBypassContext);

  useEffect(() => {
    onDataLoad && onDataLoad(selection.items);
  }, []);

  return <SimpleList {...selection} />;
}
