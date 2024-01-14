import { useEffect, useRef } from 'react';

import ProgressBar from '../ProgressBar';
import PlayerInterface from '../PlayerInterface';
import AudioPlayer from '../AudioPlayer';

import * as S from './style';

export default function Player(props: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  function play () {
    if (!audioRef.current) {
      console.log('playback failed or null');
      return;
    }
    audioRef.current.play()
  }

  function pause () {
    if (!audioRef.current) {
      console.log('playback failed or null');
      return;
    }
    audioRef.current.pause()
  }

  useEffect(() => {
    const PlayBack = audioRef.current as HTMLAudioElement;
    PlayBack.src = '/temp/Terminalhead - Poison.mp3'
  }, [])

  return (
    <S.Wrapper>
      <S.PlayerContent>
        <ProgressBar />
        <PlayerInterface
          track={props.tracks?.[0]}
          onPlayClick={play}
          onPauseClick={pause}
          onPrevClick={() => (console.log("PrevBtn click"))}
          onNextClick={() => (console.log("NextBtn click"))}/>
        <AudioPlayer ref={audioRef} />
      </S.PlayerContent>
    </S.Wrapper>
  );
}