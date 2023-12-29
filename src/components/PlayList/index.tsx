import formatTime from '../../utils/formatTime';
import * as S from './style';

export default function Playlist(props: PLProps) {
  return (
    <S.Content>
      <PlaylistTitle />
      <PlaylistContent sortedTracks={props.sortedTracks} />
    </S.Content>
  );
}

function PlaylistTitle() {
  return (
    <S.PLTitle>
      <S.PLCol $col={1}>Трек</S.PLCol>
      <S.PLCol $col={2}>ИСПОЛНИТЕЛЬ</S.PLCol>
      <S.PLCol $col={3}>АЛЬБОМ</S.PLCol>
      <S.PLCol $col={4}>
        <S.ClockSVG aria-label="time" href="/img/icon/sprite.svg#icon-watch" />
      </S.PLCol>
    </S.PLTitle>
  );
}

function PlaylistContent(props: PLProps) {
  if (!props.sortedTracks) {
    const result = [];
    for (let i = 0; i < 19; i++) {
      result.push(<PlayListItemPlug key={i} />);
    }
    return <S.PL>{result}</S.PL>;
  }
  return (
    <S.PL>
      {props.sortedTracks.map((track) => {
        return <PlaylistItem {...track} key={track.id} />;
      })}
    </S.PL>
  );
}

function PlaylistItem(props: Track) {
  return (
    <S.PLItem>
      <Track {...props} />
    </S.PLItem>
  );
}

function PlayListItemPlug() {
  return (
    <S.PLItem>
      <TrackPlug />
    </S.PLItem>
  );
}

function Track(props: Track) {
  return (
    <S.Track>
      <S.TrTitle>
        <S.TrTitleImg>
          <S.AlbumSVG
            aria-label="music"
            href={props.logo || '/img/icon/sprite.svg#icon-note'}
          />
        </S.TrTitleImg>
        <S.TrName>
          <S.TrNameLink href={props.track_file}>
            {props.name}
            <S.TrNamePostfix></S.TrNamePostfix>
          </S.TrNameLink>
        </S.TrName>
      </S.TrTitle>
      <S.TrAuthor>
        <S.TrAuthorLink href="http://">{props.author}</S.TrAuthorLink>
      </S.TrAuthor>
      <S.TrAlbum>
        <S.TrAlbumLink href="http://">{props.album}</S.TrAlbumLink>
      </S.TrAlbum>
      <S.TrDurationWrapper>
        <S.IsLikedSVG
          ariaLabel="like"
          href={'/img/icon/sprite.svg#icon-like'}
        />
        <S.TrDuration>{formatTime(props.duration_in_seconds)}</S.TrDuration>
      </S.TrDurationWrapper>
    </S.Track>
  );
}

function TrackPlug() {
  return (
    <S.Track>
      <S.TrTitle>
        <S.TrTitleImg></S.TrTitleImg>
        <S.TrName $isPlug={true}></S.TrName>
      </S.TrTitle>
      <S.TrAuthor $isPlug={true}></S.TrAuthor>
      <S.TrAlbum $isPlug={true}></S.TrAlbum>
    </S.Track>
  );
}
