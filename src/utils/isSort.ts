import { ALL_SORT_OPTIONS } from "../data/plugs"

export default function isSort(value: string): value is SortKey {
    return ALL_SORT_OPTIONS.includes(value as SortKey);
}