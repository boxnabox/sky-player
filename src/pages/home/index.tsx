import Bar from './blocks/Bar';
import Main from './blocks/Main';
import * as S from './index.style';

export default function HomePage(props: HomePageProps) {
  return (
    <S.Container>
      <Main
        sortedTracks={props.sortedTracks}
        plModifierProps={props.plModifierProps}
        tracksSelection={props.tracksSelection}
      />
      <Bar currentTrack={props.currentTrack} />
    </S.Container>
  );
}
