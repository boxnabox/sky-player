import * as S from './style';

import ProgressBar from '../ProgressBar';
import PlayerInterface from '../PlayerInterface';
import Playback from '../Playback';

export default function Player(props: PlayerProps) {
  return (
    <S.Wrapper>
      <S.PlayerContent>
        <ProgressBar />
        <PlayerInterface track={props.tracks?.[0]} />
        <Playback trackSrc={props.tracks?.[0].track_file} />
      </S.PlayerContent>
    </S.Wrapper>
  );
}