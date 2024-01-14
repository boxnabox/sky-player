import { useRef } from 'react';

import * as S from './style';

import ProgressBar from '../ProgressBar';
import PlayerInterface from '../PlayerInterface';
import AudioPlayer from '../AudioPlayer';

export default function Player(props: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <S.Wrapper>
      <S.PlayerContent>
        <ProgressBar />
        <PlayerInterface track={props.tracks?.[0]} />
        <AudioPlayer ref={audioRef} />
      </S.PlayerContent>
    </S.Wrapper>
  );
}