import React, { forwardRef } from 'react';
import * as S from './style';

const AudioPlayer = forwardRef(function AudioPlayer(props: {ref: React.RefObject<HTMLAudioElement>}) {
  return (
    <S.HiddenAudio ref={props.ref}></S.HiddenAudio>
  )
})

export default AudioPlayer;