type FilterKey = "name" | "author" | "genre" | "album";
type SortKey = "id" | "release_date" | "duration_in_seconds";
type TrackKey = FilterKey | SortKey | "logo"| "track_file" | "stared_user";
type PLModifierElems = (FilterKey | SortKey)[];
type FilterOptions = {
  [key in FilterKey]?: Set<string>;
};
type SortOptions = "descending" | "ascending";

type SortState = {
  field: SortKey
  option: SortOptions
};

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
  stared_user: user[];
}

interface TracksSelection {
  name: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
}

interface NavItem {
  link: string;
  text: string;
}

interface NavProps {
  navItems: NavItem[];
  isExpanded: boolean;
}

interface BurgerProps {
  onClick: () => void;
}
interface HomePageProps extends MainProps {
  currentTrack?: Track;
}

interface MainProps {
  sortedTracks?: Track[];
  plModifierProps: PLModifierProps;
  tracksSelection?: TracksSelection[]
}

interface PLModifierProps {
  modifierElems: PLModifierElems;
  filterOptions: {
    [key: FilterKey]: Set<string>;
  };
  filterState?: FilterOptions;
  checkedSorting?: SortState;
  onFilterChange: (filterName: FilterKey, filterOption: string) => void;
  onSortChange: (sortName: SortKey, filterOption: SortOptions) => void;
}

interface SidebarProps {
  tracksSelection?: TracksSelection[]
}

interface FilterButtonProps extends FilterBtnDropdownProps {
  ruText: string;
  isOpened: boolean;
  onBtnClick: () => void;
}

interface FilterBtnDropdownProps {
  filterName: FilterKey;
  options: Set<string>;
  checkedOptions?: Set<string>;
  onDropDownClick: (filterName: FilterKey, filterOption: string) => void;
}

interface SortButtonProps extends SortBtnDropdownProps {
  ruText: string;
  isOpened: boolean;
  onBtnClick: () => void;
}

interface SortBtnDropdownProps {
  sortName: SortKey;
  options: {
    descending: string;
    ascending: string;
  };
  checkedOption?: SortOptions;
  onDropDownClick: (sortName: SortKey, sortOption: SortOptions) => void;
}

interface PLProps {
  sortedTracks?: Track[];
}

interface SVGProps {
  className?: string;
  ariaLabel?: string;
  href: string;
}

interface PlayerBarProps {
  currentTrack?: Track;
  onLikeClick?: () => void;
  onDisClick?: () => void;
}

interface TrackOnPlayProps {
  track: Track;
  onLikeClick?: () => void;
  onDisClick?: () => void;
}

interface ReactionBtnProps {
  parentBlockName?: string;
  onClick?: () => void;
}
