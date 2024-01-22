import { useContext, useEffect } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import SimpleList from '../components/SimpleList';
import { TracksBypassContext } from '../pages/main';
import { getSelection } from '../utils/server-like';

export const loader: LoaderFunction = ({ params }) => {
  const selection = getSelection(Number(params.selectionId));

  console.log(`selection #${params.selectionId} loader`);
  if (!selection) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return selection;
};

export default function SelectionRoute() {
  const selection = useLoaderData() as TracksSelection;

  const onDataLoad = useContext(TracksBypassContext);

  useEffect(() => {
    onDataLoad && onDataLoad(selection.items);
  }, []);

  return <SimpleList {...selection} />;
}
