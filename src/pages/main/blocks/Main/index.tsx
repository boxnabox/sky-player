import Navigation from '../../../../components/Navigation';
import CenterBlock from '../../../../components/CenterBlock';
import Sidebar from '../../../../components/Sidebar';

import * as S from './style';

export default function Main(props: MainProps) {
  return (
    <S.Main>
      <Navigation
        isNavOpen={props.isNavOpen}
        onBurgerClick={props.onBurgerClick}
      />
      <CenterBlock />
      <Sidebar tracksSelection={props.tracksSelection} />
    </S.Main>
  );
}
