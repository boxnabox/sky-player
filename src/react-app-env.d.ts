// <reference types="react-scripts" />
type filterCtgs = "name"| "author" | "genre" | "album";
type sortCtgs = "id" | "release_date" | "duration_in_seconds";

interface UserPrefs {
  filterBarElements: (filterCtgs|sortCtgs)[];
}

interface stdProps {
  className?: string;
}

interface CheckedFilters {
  [key: string]: string[]|[]
}

interface linkTextProps {
  link: string;
  text: string;
}

interface navProps {
  navItems: linkTextProps[];
  isOpened: boolean;
}

interface menuProps {
  listOfItems: linkTextProps[];
}

interface burgerProps {
  onClick: () => void;
}

interface mainProps {
  sortedTracks: track[];
  filterProps: filterProps;
}

interface FilterOptions {
  [key: filterCtgs]: string[];
}

interface filterSortProps {
  filterBarOrder: (filterCtgs|sortCtgs)[];
  filterOptions: {
    [key: filterCtgs]: string[];
  };
  checkedFilters?: {
    [key: filterCtgs]: string[]
  };
  checkedSorting?: {
    [key: sortCtgs]: "descending" | "increasing"
  };
  onFilterChange: (filterName: string, filterOption: string) => void;
  onSortChange: (filterName: string, filterOption: string) => void;
}

interface filterButtonProps {
  filterName: string;
  ruText: string;
  isOpened: boolean;
  options: string[];
  checkedOptions?: string[];
  onBtnClick: () => void;
  onDropDownClick: (filterName: string, filterOption: string) => void;
}

interface filterBtnDropdownProps {
  filterName: string;
  options: string[];
  checkedOptions?: string[];
  onDropDownClick: (filterName: string, filterOption: string) => void;
}

interface playListProps {
  sortedTracks: track[]
}

interface trackProps {
  trackData: track;
}

interface svgProps extends stdProps {
  ariaLabel?: string;
  href: string;
}

interface trackPlayProps {
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

interface barProps {
  currentTrack: track;
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
