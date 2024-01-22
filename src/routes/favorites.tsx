import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import SimpleList from '../components/SimpleList';
import { getFavorites } from '../utils/server-like';
import { TracksBypassContext } from '../pages/main';

export function loader() {
  const selection = getFavorites() as TracksSelection | null;
  console.log('favorites loader');

  if (!selection) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return selection;
}

export default function FavoritesRoute() {
  const selection = useLoaderData() as TracksSelection;

  const onDataLoad = useContext(TracksBypassContext);

  useEffect(() => {
    onDataLoad && onDataLoad(selection.items);
  }, []);

  return <SimpleList {...selection} />;
}
