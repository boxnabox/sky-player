import {ALL_TRACK_KEYS} from "../data/plugs"

export default function isTrackKey(value: string): value is TrackKey {
    return ALL_TRACK_KEYS.includes(value as TrackKey);
}