/// <reference types="react-scripts" />

interface stdProps {
  className?: string;
}

interface linkTextProps {
  link: string;
  text: string;
}

interface filterTextProps {
  filter: string;
  text: string;
}

interface menuProps extends stdProps {
  listOfItems: linkTextProps[];
}

interface trackProps extends stdProps {
  trackData: track;
}

interface svgProps extends stdProps {
  ariaLabel?: string;
  href: string;
}

interface trackPlayProps extends stdProps {
  currentTrack: track;
}

interface likeBtnProps extends stdProps {
  parentBlockName?: string;
}

interface track {
  id: number;
  name: string;
  author: string;
  release_date: string | null;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: null | string;
  track_file: string;
  stared_user: user[];
}

interface user {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface selection {
  name: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
}
