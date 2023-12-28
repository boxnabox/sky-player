import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 1;
`;

export const Bar = styled.div`
  display: block;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #4b4949;
  width: 4px;
  height: 100%;
  position: relative;
`;

export const Slider = styled.div`
  display: block;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #ffffff;
  width: 4px;
  height: 80px;
  position: absolute;

  &:hover,
  &:active {
    cursor: pointer;
  }
`;
