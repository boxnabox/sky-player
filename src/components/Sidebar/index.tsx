import * as S from './style';

export default function Sidebar(props: SidebarProps) {
  return (
    <S.Sidebar>
      <SidebarMenu />
      <S.SBBlock>
        <SidebarList tracksSelection={props.tracksSelection} />
      </S.SBBlock>
    </S.Sidebar>
  );
}

function SidebarMenu() {
  return (
    <S.SBMenu>
      <S.SBUserName>Sergey.Popov</S.SBUserName>
      <S.SBUserAvatar></S.SBUserAvatar>
    </S.SBMenu>
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
    <S.SBList>
      {props.tracksSelection.map((selection) => {
        return <SidebarItem {...selection} key={selection.id} />;
      })}
    </S.SBList>
  );
}

function SidebarItem(props: TracksSelection) {
  return (
    <S.SBItem>
      <S.SBItemLink to={`/selection/${props.id}`}>
        <S.SBItemImg src={`${props.imgSrc}`} aria-label={props.name} />
      </S.SBItemLink>
    </S.SBItem>
  );
}

function SidebarItemPlug() {
  return <S.SBItem $isPlug={true}></S.SBItem>;
}
