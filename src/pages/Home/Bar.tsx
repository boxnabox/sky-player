import clsx from "clsx";
import SvgImg from "../../components/SvgImg";

export default function Bar(props: PlayerBarProps) {
    return (
      <div className="bar">
        <div className="bar__content">
          <div className="bar__player-progress"></div>
          <PlayerBlock {...props} />
        </div>
      </div>
    );
  }
  
  function PlayerBlock(props: PlayerBarProps) {
    return (
      <div className="bar__player-block">
        <Player {...props} />
        <Volume />
      </div>
    );
  }
  
  function Player(props: PlayerBarProps) {
    if (!props.currentTrack) {
      return (
      <div className={clsx("bar__player", "player")}>
        <PlayerControls />
        <TrackOnPlayPlug />
      </div>
      )
    }
    return (
      <div className={clsx("bar__player", "player")}>
        <PlayerControls />
        <TrackOnPlay track={props.currentTrack} />
      </div>
    );
  }
  
  function PlayerControls() {
    return (
      <div className="player__controls">
        <div className="player__btn-prev">
          <SvgImg
            className="player__btn-prev-svg"
            ariaLabel="prev"
            href="img/icon/sprite.svg#icon-prev"
          />
        </div>
        <div className={clsx("player__btn-play", "_btn")}>
          <SvgImg
            className="player__btn-play-svg"
            ariaLabel="play"
            href="img/icon/sprite.svg#icon-play"
          />
        </div>
        <div className="player__btn-next">
          <SvgImg
            className="player__btn-next-svg"
            ariaLabel="next"
            href="img/icon/sprite.svg#icon-next"
          />
        </div>
        <div className={clsx("player__btn-repeat", "_btn-icon")}>
          <SvgImg
            className="player__btn-repeat-svg"
            ariaLabel="repeat"
            href="img/icon/sprite.svg#icon-repeat"
          />
        </div>
        <div className={clsx("player__btn-shuffle", "_btn-icon")}>
          <SvgImg
            className="player__btn-shuffle-svg"
            ariaLabel="shuffle"
            href="img/icon/sprite.svg#icon-shuffle"
          />
        </div>
      </div>
    );
  }
  
  function TrackOnPlay(props: TrackOnPlayProps) {
    return (
      <div className={clsx("player__track-on-play", "track-on-play")}>
        <div className="track-on-play__contain">
          <div className="track-on-play__image">
            <SvgImg
              className="track-on-play__svg"
              ariaLabel="music"
              href={props.track.logo || "img/icon/sprite.svg#icon-note"}
            />
          </div>
          <div className="track-on-play__name">
            <a className="track-on-play__name-link" href="http://">
              {props.track.name}
            </a>
          </div>
          <div className="track-on-play__author">
            <a className="track-on-play__author-link" href="http://">
              {props.track.author}
            </a>
          </div>
        </div>
  
        <div className="track-on-play__like-dis">
          <LikeBtn
            parentBlockName="track-on-play"
            onClick={() => {console.log(`track #${props.track.id} was liked`)}}
          />
          <DisLikeBtn
            parentBlockName="track-on-play"
            onClick={() => {console.log(`track #${props.track.id} was disliked`)}}
          />
        </div>
      </div>
    );
  }
  
  function TrackOnPlayPlug() {
    return (
      <div className={clsx("player__track-on-play", "track-on-play-plug")}>
        <div className={clsx("track-on-play__contain", "track-on-play-plug__contain")}>
          <div className={clsx("track-on-play__image", "track-on-play-plug__image")}>
          </div>
          <div className={clsx("track-on-play__name", "track-on-play-plug__name")}>
          </div>
          <div className={clsx("track-on-play__author", "track-on-play-plug__author")}>
          </div>
        </div>
  
        <div className="track-on-play__like-dis">
          <LikeBtn parentBlockName="track-on-play" />
  
          <div
            className={clsx(
              "track-on-play__dislike-btn",
              "dislike-btn",
              "_btn-icon"
            )}
          >
            <svg className="track-on-play__dislike-svg" aria-label="dislike">
              <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
            </svg>
          </div>
        </div>
      </div>
    );
  }
  
  function LikeBtn(props: ReactionBtnProps) {
    return (
      <div
        className={clsx(
          props.parentBlockName && props.parentBlockName + "__like-btn",
          "like-btn",
          "_btn-icon"
        )}
        onClick={props.onClick}
      >
        <SvgImg
          className={clsx(
            props.parentBlockName && props.parentBlockName + "__like-svg",
            "like-btn__like-svg",
            "like-svg"
          )}
          ariaLabel="like"
          href={"img/icon/sprite.svg#icon-like"}
        />
      </div>
    );
  }
  
  function DisLikeBtn(props: ReactionBtnProps) {
    return (
      <div
        className={clsx(
          props.parentBlockName && props.parentBlockName + "__dislike-btn",
          "dislike-btn",
          "_btn-icon"
        )}
        onClick={props.onClick}
      >
        <SvgImg
          className={clsx(
            props.parentBlockName && props.parentBlockName + "__dislike-svg",
            "dislike-btn__dislike-svg",
            "dislike-svg"
          )}
          ariaLabel="dislike"
          href={"img/icon/sprite.svg#icon-dislike"}
        />
      </div>
    );
  }
  
  function Volume() {
    return (
      <div className={clsx("bar__volume-block", "volume")}>
        <div className="volume__content">
          <div className="volume__image">
            <svg className="volume__svg" aria-label="volume">
              <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
            </svg>
          </div>
          <div className={clsx("volume__progress", "_btn")}>
            <input
              className={clsx("volume__progress-line", "_btn")}
              type="range"
              name="range"
            />
          </div>
        </div>
      </div>
    );
  }