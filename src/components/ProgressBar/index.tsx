import { forwardRef, useEffect } from 'react';
import * as S from './style';

const ProgressBar = forwardRef(function ProgressBar(props: object, ref: React.ForwardedRef<HTMLDivElement>) {
  useEffect(() => {
    console.log("render: ProgressBar");
  })

  return (
    <S.ProgressBar>
      <S.ProgressLine ref={ref}/>
    </S.ProgressBar>
  )
})

export default ProgressBar;