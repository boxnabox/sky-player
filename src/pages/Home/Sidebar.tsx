import clsx from 'clsx';

export default function Sidebar(props: SidebarProps) {
  return (
    <div className={clsx('main__sidebar', 'sidebar')}>
      <SidebarMenu />
      <div className="sidebar__block">
        <SidebarList tracksSelection={props.tracksSelection} />
      </div>
    </div>
  );
}

function SidebarMenu() {
  return (
    <div className={clsx('sidebar__personal', 'sidebar-menu')}>
      <p className="sidebar__personal-name">Sergey.Popov</p>
      <div className="sidebar__avatar"></div>
    </div>
  );
}

function SidebarList(props: SidebarProps) {
  if (!props.tracksSelection) {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(<SidebarItemPlug key={i} />);
    }
    return <div className="sidebar__list">{result}</div>;
  }

  return (
    <div className="sidebar__list">
      {props.tracksSelection.map((selection) => {
        return <SidebarItem {...selection} key={selection.name} />;
      })}
    </div>
  );
}

function SidebarItem(props: TracksSelection) {
  return (
    <div className="sidebar__item">
      <a className="sidebar__link" href={props.href}>
        <img
          className="sidebar__img"
          src={props.imgSrc}
          aria-label={props.imgAlt}
        />
      </a>
    </div>
  );
}

function SidebarItemPlug() {
  return <div className="sidebar__item sidebar-item-plug"></div>;
}
