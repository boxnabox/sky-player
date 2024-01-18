import styled from 'styled-components';

export const ProgressBar = styled.div`
  width: 100%;
  height: 5px;

  display: block;
  box-sizing: border-box;
  background-color: #2e2e2e;
`;

export const ProgressLine = styled.div<{ $progress?: number; }>`
  width: 100%;
  height: 5px;

  display: block;
  box-sizing: border-box;
  background-color: #580EA2;

  transform-origin: 0;
  transform: scaleX(${props => props.$progress ? props.$progress : 0});
`;
