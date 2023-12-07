import { ALL_FILTER_OPTIONS } from '../data/plugs';

export default function isFilter(value: string): value is FilterKey {
  return ALL_FILTER_OPTIONS.includes(value as FilterKey);
}
