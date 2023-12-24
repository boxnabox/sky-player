import { useEffect, useRef } from 'react';
import * as S from './styles';

export default ScrollBar;

interface SBProps {
  progress?: number;
  // onScroll: (newProgress: number) => void;
  onSliderMove: (newProgress: number) => void;
}

function ScrollBar(props: SBProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Outer scroll reaction
  useEffect(() => {
    const barNode: HTMLDivElement = barRef.current as HTMLDivElement;
    const sliderNode: HTMLDivElement = sliderRef.current as HTMLDivElement;

    sliderNode.style.top = props.progress
      ? props.progress * (barNode.clientHeight - sliderNode.clientHeight) + 'px'
      : '0px';
  });

  // Inner slider drag reaction: 2023-12-11 - it doesn't work :(
  // useEffect(() => {
  //   const barNode: HTMLDivElement = barRef.current as HTMLDivElement;
  //   const sliderNode: HTMLDivElement = sliderRef.current as HTMLDivElement;

  //   function sliderMDHandler(e: MouseEvent) {
  //     e.preventDefault();
  //     console.log('down');

  //     window.addEventListener('mousemove', windowMMHandler);
  //     window.addEventListener(
  //       'mouseup',
  //       () => {
  //         console.log('up');
  //         window.removeEventListener('mousemove', windowMMHandler);
  //       },
  //       { once: true },
  //     );
  //   }

  //   function windowMMHandler(e: MouseEvent) {
  //     console.log(props.progress);
  //     props.onSliderMove(
  //       props.progress
  //         ? props.progress +
  //             e.movementY / (barNode.clientHeight - sliderNode.clientHeight)
  //         : 0 + e.movementY / (barNode.clientHeight - sliderNode.clientHeight),
  //     );
  //   }

  //   sliderNode.addEventListener('mousedown', sliderMDHandler);

  //   return () => {
  //     sliderNode.removeEventListener('mousedown', sliderMDHandler);
  //   };
  // }, []);

  return (
    <S.Wrapper>
      <S.Bar ref={barRef}>
        <S.Slider ref={sliderRef}></S.Slider>
      </S.Bar>
    </S.Wrapper>
  );
}
