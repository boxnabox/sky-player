import { tracks } from '../data/tracks';
import { selections, favorites } from '../data/selections';

export function getAllTracks() {
  return tracks;
}

export function getSelections() {
  return selections;
}

export function getSelection(id: number) {
  return (
    selections.find((selection) => {
      return selection.id === id;
    }) || null
  );
}

export function getFavorites() {
  return favorites;
}
