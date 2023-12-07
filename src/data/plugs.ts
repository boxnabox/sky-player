export const ALL_TRACK_KEYS = [
  'id',
  'name',
  'author',
  'release_date',
  'genre',
  'duration_in_seconds',
  'album',
  'logo',
  'track_file',
  'stared_user',
] as const;
export const ALL_FILTER_OPTIONS = ['name', 'author', 'genre', 'album'] as const;
export const ALL_SORT_OPTIONS = [
  'id',
  'release_date',
  'duration_in_seconds',
] as const;

export const MENU_ITEMS = [
  { link: '#', text: 'Главное' },
  { link: '#', text: 'Мои треки' },
  { link: '#', text: 'Войти' },
];

export const PL_MODIFIER_BAR_ELEMENTS: PLModifierElems = [
  'author',
  'genre',
  'release_date',
];

export const SELECTIONS = [
  {
    name: 'today plst',
    href: 'https://',
    imgSrc: 'img/playlist01.png',
    imgAlt: "day's playlist",
  },
  {
    name: '100 hits',
    href: 'https://',
    imgSrc: 'img/playlist02.png',
    imgAlt: "day's playlist",
  },
  {
    name: 'indie',
    href: 'https://',
    imgSrc: 'img/playlist03.png',
    imgAlt: 'indie boost',
  },
];
