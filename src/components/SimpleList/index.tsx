import Playlist from '../../components/PlayList';
import * as S from './style';

export default function SimpleList(props: TracksSelection) {
  return (
    <>
      <S.Heading>{props.name}</S.Heading>
      <Playlist sortedTracks={props.items} />
    </>
  );
}
