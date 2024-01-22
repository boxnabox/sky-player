import { useEffect, useRef, useState } from 'react';
import BTNCounter from '../BtnCounter';
import ScrollBar from '../ScrollBar';

import * as S from './style';

export default function FilterButton(props: FilterButtonProps) {
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
      {props.checkedOptions && <BTNCounter count={props.checkedOptions.size} />}
      {isExpanded && (
        <FilterButtonDropdown {...props} onOutClick={toggleBtnExpansion} />
      )}
    </S.PLModBarWrapper>
  );
}

function FilterButtonDropdown(props: FilterDropdownProps) {
  const [isScrollable, setScrollable] = useState<boolean>();
  const [progress, setProgress] = useState(0);

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
      <FiltersList
        onScroll={setProgress}
        lengthHandler={setScrollable}
        {...props}
      />
      {isScrollable && (
        <ScrollBar progress={progress} onSliderMove={setProgress} />
      )}
    </S.ScrollWrapper>
  );
}

function FiltersList(props: FilterOptionsList) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const listNode: HTMLUListElement = listRef.current as HTMLUListElement;
    props.lengthHandler(listNode.scrollHeight > listNode.clientHeight);

    function handleScroll(e: Event) {
      const target: HTMLUListElement = e.target as HTMLUListElement;
      props.onScroll(
        target.scrollTop / (target.scrollHeight - target.clientHeight),
      );
    }

    listNode.addEventListener('scroll', handleScroll);

    return () => {
      listNode.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <S.FilterDropdownList ref={listRef}>
      {Array.from(props.options).map((option) => {
        return (
          <S.FilterDropdownItem
            $isChecked={props.checkedOptions?.has(option)}
            onClick={() => {
              props.onDropDownClick(props.filterName, option);
            }}
            key={option}
          >
            {option}
          </S.FilterDropdownItem>
        );
      })}
    </S.FilterDropdownList>
  );
}
