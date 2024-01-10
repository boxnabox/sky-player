import * as S from './style';

export default function Playback(props: {trackSrc?: string}) {
  !props.trackSrc && console.log('audio: no link found');

  return (
    <S.HiddenAudio src={props.trackSrc}></S.HiddenAudio>
  )
}