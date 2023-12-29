import * as S from './style';

import ProgressBar from '../../../../components/ProgressBar';
import PlayerBlock from '../../../../components/PlayerBlock';

export default function Bar(props: PlayerProps) {
  return (
    <S.Bar>
      <S.BarContent>
        <ProgressBar />
        <PlayerBlock track={props.tracks?.[0]} />
      </S.BarContent>
    </S.Bar>
  );
}
