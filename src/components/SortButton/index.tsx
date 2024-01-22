import { useEffect, useRef, useState } from 'react';
import BTNCounter from '../BtnCounter';

import * as S from './style';

export default function SortButton(props: SortButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleBtnExpansion() {
    setIsExpanded(!isExpanded);
  }

  return (
    <S.PLModBarWrapper>
      <S.PLModButton
        type={'button'}
        $isOpened={isExpanded}
        onClick={toggleBtnExpansion}
      >
        {props.ruText}
      </S.PLModButton>
      {props.checkedOption && <BTNCounter count={1} />}
      {isExpanded && (
        <SortButtonDropdown {...props} onOutClick={toggleBtnExpansion} />
      )}
    </S.PLModBarWrapper>
  );
}

function SortButtonDropdown(props: SortBtnDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const WrapperNode = wrapperRef.current as HTMLDivElement;

    function onWindowClick(e: MouseEvent) {
      if (WrapperNode.contains(e.target as Node)) return;
      props.onOutClick();
    }

    // timer just to fix unexpected React18 clicks behaviour
    // https://stackoverflow.com/questions/72315874/react-click-outside-event-happens-right-after-click-to-open-preventing-the-mod/72316017#72316017
    const timerID = setTimeout(() => {
      window.addEventListener('click', onWindowClick);
    }, 0);

    return () => {
      clearTimeout(timerID);
      window.removeEventListener('click', onWindowClick);
    };
  }, []);

  return (
    <S.ScrollWrapper ref={wrapperRef}>
      <SortOptionsList {...props} />
    </S.ScrollWrapper>
  );
}

function SortOptionsList(props: SortBtnDropdownProps) {
  return (
    <S.DropdownList>
      {Object.keys(props.options).map((option) => {
        return (
          <S.SortDropdownItem
            onClick={() => {
              props.onDropDownClick(props.sortName, option as SortOptions);
            }}
            key={option}
          >
            {props.checkedOption === option ? (
              <S.RadioSVG
                aria-label="radio button is ON"
                href="img/icon/sprite.svg#icon-radio-on"
              />
            ) : (
              <S.RadioSVG
                aria-label="radio button is OFF"
                href="img/icon/sprite.svg#icon-radio-off"
              />
            )}
            <S.SortOptionText>
              {props.options[option as keyof typeof props.options]}
            </S.SortOptionText>
          </S.SortDropdownItem>
        );
      })}
    </S.DropdownList>
  );
}
