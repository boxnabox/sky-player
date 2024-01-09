import * as S from './style';

import ProgressBar from '../ProgressBar';
import PlayerInterface from '../PlayerBlock';

export default function Player(props: PlayerProps) {
  return (
    <S.Wrapper>
      <S.PlayerContent>
        <ProgressBar />
        <PlayerInterface track={props.tracks?.[0]} />
      </S.PlayerContent>
    </S.Wrapper>
  );
}
