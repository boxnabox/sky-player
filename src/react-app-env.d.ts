type TrackKey =
  | "id"
  | "name"
  | "author"
  | "release_date"
  | "genre"
  | "duration_in_seconds"
  | "album"
  | "logo"
  | "track_file"
  | "stared_user";
type Filter = "name" | "author" | "genre" | "album";
type Sort = "id" | "release_date" | "duration_in_seconds";

// interface stdProps {
//   className?: string;
// }

interface CheckedFilters {
  [key: string]: string[] | [];
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
  filterProps: FilterAndSortProps;
}

type FilterBarOrder = (Filter | Sort)[];

type FilterOptions = {
  [key in Filter]?: Set<string>;
};

type SortOption = {
  [key in Sort]?: descending | ascending;
};

type SortOption = {
  [key in Sort]?: {
    descending: string;
    ascending: string;
  };
};

type CheckedSorting = {
  [key in Sort]?: "descending" | "ascending";
};

interface FilterAndSortProps {
  filterBarOrder: FilterBarOrder;
  filterOptions: {
    [key: Filter]: Set<string>;
  };
  checkedFilters?: FilterOptions;
  checkedSorting?: CheckedSorting;
  onFilterChange: (filterName: string, filterOption: string) => void;
  onSortChange: (filterName: string, filterOption: string) => void;
}

interface FilterButtonProps {
  filterName: Filter;
  ruText: string;
  isOpened: boolean;
  options: Set<string>;
  checkedOptions?: Set<string>;
  onBtnClick: () => void;
  onDropDownClick: (filterName: string, filterOption: string) => void;
}

interface SortButtonProps {
  sortName: Sort;
  ruText: string;
  isOpened: boolean;
  options: {
    descending: string;
    ascending: string;
  };
  checkedOption?: "descending" | "ascending";
  onBtnClick: () => void;
  onDropDownClick: (filterName: string, filterOption: string) => void;
}

interface FilterBtnDropdownProps {
  filterName: string;
  options: Set<string>;
  checkedOptions?: Set<string>;
  onDropDownClick: (filterName: string, filterOption: string) => void;
}

interface SortBtnDropdownProps {
  sortName: string;
  options: {
    descending: string;
    ascending: string;
  };
  checkedOption?: "descending" | "ascending";
  onDropDownClick: (sortName: string, sortOption: string) => void;
}

interface playListProps {
  sortedTracks: track[];
}

interface trackProps {
  trackData: track;
}

interface svgProps {
  className?: string;
  ariaLabel?: string;
  href: string;
}

interface trackPlayProps {
  currentTrack: track;
}

interface likeBtnProps {
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
