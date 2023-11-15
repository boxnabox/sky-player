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

type SortOptions = "descending" | "ascending";

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
  sortedTracks?: track[];
  filterProps: FilterAndSortProps;
}

type FilterBarOrder = (Filter | Sort)[];

type FilterOptions = {
  [key in Filter]?: Set<string>;
};

type SortState = {
  field: Sort
  option: "descending" | "ascending";
};

// type SortOption = {
//   [key in Sort]?: {
//     descending: string;
//     ascending: string;
//   };
// };

type CheckedSorting = {
  [key in Sort]?: SortOptions;
};

interface FilterAndSortProps {
  filterBarOrder: FilterBarOrder;
  filterOptions: {
    [key: Filter]: Set<string>;
  };
  checkedFilters?: FilterOptions;
  checkedSorting?: SortState;
  onFilterChange: (filterName: Filter, filterOption: string) => void;
  onSortChange: (sortName: Sort, filterOption: SortOptions) => void;
}

interface FilterButtonProps {
  filterName: Filter;
  ruText: string;
  isOpened: boolean;
  options: Set<string>;
  checkedOptions?: Set<string>;
  onBtnClick: () => void;
  onDropDownClick: (filterName: Filter, filterOption: string) => void;
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
  onDropDownClick: (sortName: Sort, filterOption: SortOptions) => void;
}

interface FilterBtnDropdownProps {
  filterName: Filter;
  options: Set<string>;
  checkedOptions?: Set<string>;
  onDropDownClick: (filterName: Filter, filterOption: string) => void;
}

interface SortBtnDropdownProps {
  sortName: Sort;
  options: {
    descending: string;
    ascending: string;
  };
  checkedOption?: "descending" | "ascending";
  onDropDownClick: (sortName: Sort, sortOption: SortOptions) => void;
}

interface playListProps {
  sortedTracks?: track[];
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
  currentTrack?: track;
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
