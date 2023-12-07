import * as PLUG from '../../data/plugs';
import Navigation from './Navigation';
import CenterBlock from './CenterBlock';
import Sidebar from './Sidebar';

export default function Main(props: MainProps) {
  return (
    <main className="main">
      <Navigation navItems={PLUG.MENU_ITEMS} isExpanded={false} />
      <CenterBlock {...props} />
      <Sidebar tracksSelection={props.tracksSelection} />
    </main>
  );
}
