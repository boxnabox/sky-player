import { useEffect } from 'react';
import * as S from './style';

export default function PlayerInterface(props: PlayerBlockProps) {

  useEffect(() => {
    console.log("render: PlayerInterface");
  })

  return (
    <S.PlayerInterface>
      <ControlsWrapper {...props} />
      <Volume />
    </S.PlayerInterface>
  );
}

function ControlsWrapper(props: PlayerBlockProps) {
  if (!props.track) {
    return (
      <S.ControlsWrapper>
        <PlayerControls {...props}/>
        <TrackInfoPlug />
      </S.ControlsWrapper>
    );
  }
  return (
    <S.ControlsWrapper>
      <PlayerControls {...props}/>
      <TrackInfo track={props.track} />
    </S.ControlsWrapper>
  );
}

function PlayerControls(props: PlayerBlockProps) {
  return (
    <S.PLRControls>
      <PrevBtn onClick={props.onPrevClick}/>
      {props.isPlaying ? <PauseBtn onClick={props.onPauseClick}/> : <PlayBtn onClick={props.onPlayClick}/>}
      <NextBtn onClick={props.onNextClick}/>
      <RepeatBtn onClick={()=> {console.log("repeat btn click");}}/>
      <ShuffleBtn onClick={()=> {console.log("shuffle btn click");}}/>
    </S.PLRControls>
  );
}

function PrevBtn(props: AudioControlsProps) {
  return (
    <S.ControlBtn onClick={props.onClick}>
      <S.BtnSVG
        $size="medium"
        ariaLabel="prev"
        href="/img/icon/sprite.svg#icon-prev"
      />
    </S.ControlBtn>
  )
}

function PlayBtn(props: AudioControlsProps) {
  return (
    <S.ControlBtn onClick={props.onClick}>
      <S.BtnSVG
        $size="large"
        ariaLabel="play"
        href="/img/icon/sprite.svg#icon-play"
      />
    </S.ControlBtn>
  )
}

function PauseBtn(props: AudioControlsProps) {
  return (
    <S.ControlBtn onClick={props.onClick}>
      <S.BtnSVG
        $size="large"
        ariaLabel="pause"
        href="/img/icon/sprite.svg#icon-pause"
      />
    </S.ControlBtn>
  )
}

function NextBtn(props: AudioControlsProps) {
  return (
    <S.ControlBtn $isLast={true} onClick={props.onClick}>
      <S.BtnSVG
        $size="medium"
        ariaLabel="next"
        href="/img/icon/sprite.svg#icon-next"
      />
    </S.ControlBtn>
  )
}

function RepeatBtn(props: AudioControlsProps) {
  return (
    <S.PlayOrderBtn onClick={props.onClick}>
      <S.BtnSVG
        $size="small"
        ariaLabel="repeat"
        href="/img/icon/sprite.svg#icon-repeat"
      />
    </S.PlayOrderBtn>
  )
}

function ShuffleBtn(props: AudioControlsProps) {
  return (
    <S.PlayOrderBtn $isLast={true} onClick={props.onClick}>
      <S.BtnSVG
        $size="small"
        ariaLabel="shuffle"
        href="/img/icon/sprite.svg#icon-shuffle"
      />
    </S.PlayOrderBtn>
  )
}

function TrackInfo(props: TracOnPlayProps) {
  return (
    <S.TrackOnPlay>
      <S.TOPContainer>
        <S.TOPAlbum>
          <S.AlbumSVG
            ariaLabel="music"
            href={props.track.logo || '/img/icon/sprite.svg#icon-note'}
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

function TrackInfoPlug() {
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
        href={'/img/icon/sprite.svg#icon-like'}
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
        href={'/img/icon/sprite.svg#icon-dislike'}
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
            href="/img/icon/sprite.svg#icon-volume"
          />
        </S.VCIcon>
        <S.VolumeInputWrapper>
          <S.VolumeInput />
        </S.VolumeInputWrapper>
      </S.VCContainer>
    </S.VolumeComtrol>
  );
}
