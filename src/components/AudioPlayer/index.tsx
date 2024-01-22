import React, { forwardRef } from 'react';
import * as S from './style';

const AudioPlayer = forwardRef(function AudioPlayer(props: object, ref: React.ForwardedRef<HTMLAudioElement> ) {
  return (
    <S.HiddenAudio ref={ref}></S.HiddenAudio>
  )
})

export default AudioPlayer;