import * as S from './player-block.style';

export default function PlayerBlock(props: PlayerBarProps) {
  return (
    <S.PlayerBlock>
      <Player {...props} />
      <Volume />
    </S.PlayerBlock>
  );
}

function Player(props: PlayerBarProps) {
  if (!props.currentTrack) {
    return (
      <S.Player>
        <PlayerControls />
        <TrackOnPlayPlug />
      </S.Player>
    );
  }
  return (
    <S.Player>
      <PlayerControls />
      <TrackOnPlay track={props.currentTrack} />
    </S.Player>
  );
}

function PlayerControls() {
  return (
    <S.PLRControls>
      <S.ControlBtn>
        <S.BtnSVG
          $size="medium"
          ariaLabel="prev"
          href="img/icon/sprite.svg#icon-prev"
        />
      </S.ControlBtn>
      <S.ControlBtn>
        <S.BtnSVG
          $size="large"
          ariaLabel="play"
          href="img/icon/sprite.svg#icon-play"
        />
      </S.ControlBtn>
      <S.ControlBtn $isLast={true}>
        <S.BtnSVG
          $size="medium"
          ariaLabel="next"
          href="img/icon/sprite.svg#icon-next"
        />
      </S.ControlBtn>
      <S.PlayOrderBtn>
        <S.BtnSVG
          $size="small"
          ariaLabel="repeat"
          href="img/icon/sprite.svg#icon-repeat"
        />
      </S.PlayOrderBtn>
      <S.PlayOrderBtn $isLast={true}>
        <S.BtnSVG
          $size="small"
          ariaLabel="shuffle"
          href="img/icon/sprite.svg#icon-shuffle"
        />
      </S.PlayOrderBtn>
    </S.PLRControls>
  );
}

function TrackOnPlay(props: TrackOnPlayProps) {
  return (
    <S.TrackOnPlay>
      <S.TOPContainer>
        <S.TOPAlbum>
          <S.AlbumSVG
            ariaLabel="music"
            href={props.track.logo || 'img/icon/sprite.svg#icon-note'}
          />
        </S.TOPAlbum>
        <S.TOPName>
          <S.TOPNameLink href="http://">{props.track.name}</S.TOPNameLink>
        </S.TOPName>
        <S.TOPAuthor>
          <S.TOPAuthorLink href="http://">{props.track.author}</S.TOPAuthorLink>
        </S.TOPAuthor>
      </S.TOPContainer>

      <S.LikeDisBlock>
        <LikeBtn
          onClick={() => {
            console.log(`track #${props.track.id} was liked`);
          }}
        />
        <DisLikeBtn
          onClick={() => {
            console.log(`track #${props.track.id} was disliked`);
          }}
        />
      </S.LikeDisBlock>
    </S.TrackOnPlay>
  );
}

function TrackOnPlayPlug() {
  return (
    <S.TrackOnPlay>
      <S.TOPContainer>
        <S.TOPAlbum></S.TOPAlbum>
        <S.TOPNamePlug></S.TOPNamePlug>
        <S.TOPAuthorPlug></S.TOPAuthorPlug>
      </S.TOPContainer>

      <S.LikeDisBlock>
        <LikeBtn />
        <DisLikeBtn />
      </S.LikeDisBlock>
    </S.TrackOnPlay>
  );
}

function LikeBtn(props: ReactionBtnProps) {
  return (
    <S.ReactBtn onClick={props.onClick}>
      <S.ReactSVG
        $option="like"
        ariaLabel="like"
        href={'img/icon/sprite.svg#icon-like'}
      />
    </S.ReactBtn>
  );
}

function DisLikeBtn(props: ReactionBtnProps) {
  return (
    <S.ReactBtn onClick={props.onClick}>
      <S.ReactSVG
        $option="dis"
        ariaLabel="dislike"
        href={'img/icon/sprite.svg#icon-dislike'}
      />
    </S.ReactBtn>
  );
}

function Volume() {
  return (
    <S.VolumeComtrol>
      <S.VCContainer>
        <S.VCIcon>
          <S.VolumeSVG
            aria-label="volume"
            href="img/icon/sprite.svg#icon-volume"
          />
        </S.VCIcon>
        <S.VolumeInputWrapper>
          <S.VolumeInput
          // className={clsx('volume__progress-line', '_btn')}
          // type="range"
          // name="range"
          />
        </S.VolumeInputWrapper>
      </S.VCContainer>
    </S.VolumeComtrol>
  );
}
