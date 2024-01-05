import styled from 'styled-components';

export const AuthBtn = styled.button`
  width: 80px;
  height: 28px;
  color: white;
  line-height: 28px;
  border-radius: 8px;
  background-color: #be3995;
  position: fixed;
  top: 4px;
  right: 4px;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`;

export const Bip = styled.div<{ $isOn?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => {
    return props.$isOn ? '#00db00' : 'red';
  }};

  position: fixed;
  top: 4px;
  right: 88px;
  z-index: 1;
`;
