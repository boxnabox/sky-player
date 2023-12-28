import PLModifierBar from '../../components/MdifierBar';
import Playlist from '../../components/PlayList';
import * as S from './style';

export default function AllTracks(props: MainProps) {
  return (
    <>
      <S.Heading>Треки</S.Heading>
      <PLModifierBar {...props.plModifierProps} />
      <Playlist sortedTracks={props.sortedTracks} />
    </>
  );
}
