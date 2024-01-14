type FilterKey = 'name' | 'author' | 'genre' | 'album';
type SortKey = 'id' | 'release_date' | 'duration_in_seconds';
type TrackKey = FilterKey | SortKey | 'logo' | 'track_file' | 'stared_user';
type PLModifierElems = (FilterKey | SortKey)[];
type FilterOptions = {
  [key in FilterKey]?: Set<string>;
};
type SortOptions = 'descending' | 'ascending';

type SortState = {
  field: SortKey;
  option: SortOptions;
};

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Track {
  id: number;
  name: string;
  author: string;
  release_date: string | null;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: null | string;
  track_file: string;
  stared_user: User[];
}

interface TracksSelection {
  id: number;
  name: string;
  imgSrc?: string;
  owner: User;
  items: Track[];
}

interface BurgerProps {
  onClick: () => void;
}

interface MainProps extends NavProps {
  tracksSelection?: TracksSelection[];
}

interface NavProps {
  isNavOpen?: boolean;
  onBurgerClick: () => void;
}

interface NavItem {
  link: string;
  text: string;
}

interface MenuProps {
  items: NavItem[];
}

interface PLModifierProps {
  modifierElems: PLModifierElems;
  filterOptions: {
    [key: FilterKey]: Set<string>;
  };
  filterState?: FilterOptions;
  sortState?: SortState;
  onFilterChange: (filterName: FilterKey, filterOption: string) => void;
  onSortChange: (sortName: SortKey, filterOption: SortOptions) => void;
}

interface SidebarProps {
  tracksSelection?: TracksSelection[];
}

interface CommonFilterProps {
  filterName: FilterKey;
  options: Set<string>;
  checkedOptions?: Set<string>;
  onDropDownClick: (filterName: FilterKey, filterOption: string) => void;
}

interface FilterButtonProps extends CommonFilterProps {
  ruText: string;
}

interface FilterDropdownProps extends CommonFilterProps {
  onOutClick: (filterName?: FilterKey) => void;
}

interface FilterOptionsList extends CommonFilterProps {
  onScroll: (progress: number) => void;
  lengthHandler: (isLong: boolean) => void;
}

interface CommonSortProps {
  sortName: SortKey;
  options: {
    [key: SortOptions]: string;
  };
  checkedOption?: SortOptions;
  onDropDownClick: (sortName: SortKey, sortOption: SortOptions) => void;
}

interface SortButtonProps extends CommonSortProps {
  ruText: string;
}

interface SortBtnDropdownProps extends CommonSortProps {
  onOutClick: (sortName?: SortKey) => void;
}

interface PLProps {
  sortedTracks?: Track[];
}

interface SVGProps {
  className?: string;
  ariaLabel?: string;
  href: string;
}

interface PlayerProps {
  tracks?: Track[];
  onLikeClick?: () => void;
  onDisClick?: () => void;
}

interface PlayerBlockProps {
  track?: Track;
  onPlayClick: () => void;
  onPauseClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onLikeClick?: () => void;
  onDisClick?: () => void;
}

interface AudioControlsProps {
  onClick: () => void;
}

interface TracOnPlayProps {
  track: Track;
  onLikeClick?: () => void;
  onDisClick?: () => void;
}

interface ReactionBtnProps {
  parentBlockName?: string;
  onClick?: () => void;
}
