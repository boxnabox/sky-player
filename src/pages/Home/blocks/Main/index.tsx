import * as PLUG from '../../../../data/plugs';
import * as S from './styles';
import Navigation from './Navigation';
import CenterBlock from './CenterBlock';
import Sidebar from './Sidebar';

export default function Main(props: MainProps) {
  return (
    <S.Main>
      <Navigation navItems={PLUG.MENU_ITEMS} isExpanded={false} />
      <CenterBlock {...props} />
      <Sidebar tracksSelection={props.tracksSelection} />
    </S.Main>
  );
}
