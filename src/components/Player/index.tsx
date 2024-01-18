import { useEffect, useRef, useState } from 'react';

import ProgressBar from '../ProgressBar';
import PlayerInterface from '../PlayerInterface';
import AudioPlayer from '../AudioPlayer';

import * as S from './style';

export default function Player(props: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const [progress, setProgress] = useState<number>();
  const audioRef = useRef<HTMLAudioElement>(null);

  function play () {
    if (!audioRef.current) {
      console.log('playback failed or null');
      return;
    }
    audioRef.current.play();
  }

  function pause () {
    if (!audioRef.current) {
      console.log('playback failed or null');
      return;
    }
    audioRef.current.pause();
  }

  useEffect(() => {
    const AudioNode = audioRef.current as HTMLAudioElement;
    
    // 1. Setting track source (now it's plug, then would be props)
    AudioNode.src = '/temp/Terminalhead - Poison.mp3';
    
    // 2. Setting <audio /> events handlers
    AudioNode.onpause = () => setIsPlaying(false);
    AudioNode.onplay = () => setIsPlaying(true);
    AudioNode.ontimeupdate = () => {setProgress(AudioNode.currentTime / AudioNode.duration)};
  }, [])

  useEffect(() => {
    console.log("render: Player");
  })

  return (
    <S.Wrapper>
      <S.PlayerContent>
        <ProgressBar progress={progress}/>
        <PlayerInterface
          track={props.tracks?.[0]}
          isPlaying={isPlaying}
          onPlayClick={play}
          onPauseClick={pause}
          onPrevClick={() => (console.log("PrevBtn click"))}
          onNextClick={() => (console.log("NextBtn click"))}
        />
        <AudioPlayer ref={audioRef} />
      </S.PlayerContent>
    </S.Wrapper>
  );
}