import styled from 'styled-components';

export const LogoImage = styled.img<{
  $w?: string;
  $h?: string;
  $color?: 'black' | 'white';
}>`
  width: ${(props) => props.$w || 'auto'};
  height: ${(props) => props.$h || 'auto'};
  fill: ${(props) => props.$color || 'black'};
`;
