import { useEffect, useRef } from 'react';
import * as S from './styles';

interface SBProps {
  coef?: number;
  onSliderMove: (newCoef: number) => void;
}

export default function ScrollBar(props: SBProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  console.log('init: scroll; ' + props.coef);

  function sliderMDHandler(e: MouseEvent) {
    e.preventDefault();

    window.addEventListener('mousemove', windowMMHandler);
    window.addEventListener(
      'mouseup',
      () => {
        window.removeEventListener('mousemove', windowMMHandler);
      },
      { once: true },
    );
  }

  function windowMMHandler(e: MouseEvent) {
    console.log('');
    console.log('===========');
    console.log('x:' + e.movementX + '; ' + 'y:' + e.movementY + ';');
    console.log('===========');
    // if (sliderNode) sliderNode.style.top = sliderNode.style.top + e.movementY;
  }

  useEffect(() => {
    console.log('mounted: scroll; ' + 'props.coef: ' + props.coef);
    const barNode: HTMLDivElement = barRef.current as HTMLDivElement;
    const sliderNode: HTMLDivElement = sliderRef.current as HTMLDivElement;
    console.log(barNode);

    sliderNode.style.top = props.coef
      ? props.coef * (barNode.clientHeight - sliderNode.clientHeight) + 'px'
      : '0px';
  });

  return (
    <S.Wrapper>
      <S.Bar ref={barRef}>
        <S.Slider ref={sliderRef}></S.Slider>
      </S.Bar>
    </S.Wrapper>
  );
}
