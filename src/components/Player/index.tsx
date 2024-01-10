import * as S from './style';

import ProgressBar from '../ProgressBar';
import PlayerInterface from '../PlayerInterface';

export default function Player(props: PlayerProps) {
  return (
    <S.Wrapper>
      <S.PlayerContent>
        <ProgressBar />
        <PlayerInterface track={props.tracks?.[0]} />
        <audio className='audio' controls src="/temp/Bobby_Marleni_-_Dropin.mp3"></audio>
      </S.PlayerContent>
    </S.Wrapper>
  );
}
