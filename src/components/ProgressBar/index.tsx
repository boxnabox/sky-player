import { useEffect } from 'react';
import * as S from './style';

export default function ProgressBar(props: ProgressBarProps) {
  useEffect(() => {
    console.log("render: ProgressBar");
  })

  return (
    <S.ProgressBar>
      <S.ProgressLine $progress={props.progress}/>
    </S.ProgressBar>
  )
}
