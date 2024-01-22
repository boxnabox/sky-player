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

export function isLoggedIn() {
  const regex = new RegExp(`(^| )sky_token(;|$)`);
  const match = document.cookie.match(regex);
  return match ? true : false;
}

export function login() {
  document.cookie = 'sky_token; path=/';
}

export function logout() {
  document.cookie = 'sky_token; path=/; max-age=0';
  document.cookie = 'sky_token; path=/selection; max-age=0';
}
