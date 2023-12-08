import * as S from './styles';

import ProgressBar from './ProgressBar';
import PlayerBlock from './PlayerBlock';

export default function Bar(props: PlayerBarProps) {
  return (
    <S.Bar>
      <S.BarContent>
        <ProgressBar />
        <PlayerBlock {...props} />
      </S.BarContent>
    </S.Bar>
  );
}
