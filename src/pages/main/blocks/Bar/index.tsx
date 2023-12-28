import * as S from './style';

import ProgressBar from '../../../../components/ProgressBar';
import PlayerBlock from '../../../../components/PlayerBlock';

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
