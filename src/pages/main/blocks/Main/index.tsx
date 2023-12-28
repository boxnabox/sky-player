import Navigation from '../../../../components/Navigation';
import CenterBlock from '../../../../components/CenterBlock';
import Sidebar from '../../../../components/Sidebar';

import * as PLUG from '../../../../data/plugs';
import * as S from './style';

export default function Main(props: MainProps) {
  return (
    <S.Main>
      <Navigation navItems={PLUG.MENU_ITEMS} isExpanded={false} />
      <CenterBlock />
      <Sidebar tracksSelection={props.tracksSelection} />
    </S.Main>
  );
}
