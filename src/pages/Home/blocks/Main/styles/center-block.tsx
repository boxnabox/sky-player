import styled, { css } from 'styled-components';

import SvgImg from '../../../../../components/SvgImg';

// SVGs_______________________________
export const SearchSVG = styled(SvgImg)`
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: #ffffff;
  fill: transparent;
`;

export const ClockSVG = styled(SvgImg)`
  width: 12px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

export const AlbumSVG = styled(SvgImg)`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
`;

export const IsLikedSVG = styled(SvgImg)`
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: transparent;
  stroke: #696969;
`;
// .

export const CenterBlock = styled.div`
  width: auto;
  flex-grow: 3;
  padding: 20px 40px 20px 111px;
`;

export const SearchBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 51px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Heading = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
`;

export const SearchInput = styled.input.attrs({ type: 'search' })`
  flex-grow: 100;
  background-color: transparent;
  border: none;
  padding: 13px 10px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;

  &::placeholder {
    background-color: transparent;
    color: #ffffff;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`;

export const PLModBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 51px;
`;

export const PLModBarTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
`;

export const PLModBarWrapper = styled.div`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const btnActiveMixin = css`
  border: 1px solid #ad61ff;
  color: #ad61ff;

  &:hover {
    border-color: #ad61ff;
    color: #ad61ff;
    cursor: pointer;
  }
`;

export const PLModButton = styled.button<{ $isOpened?: boolean }>`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-radius: 60px;
  padding: 6px 20px;
  background-color: transparent;

  &:active {
    border-color: #ad61ff;
    color: #ad61ff;
    cursor: pointer;
  }

  ${(props) => {
    return props.$isOpened
      ? btnActiveMixin
      : css`
          border: 1px solid #ffffff;
          color: #ffffff;

          &:hover {
            border-color: #d9b6ff;
            color: #d9b6ff;
            cursor: pointer;
          }
        `;
  }}
`;

export const PLModDropdown = styled.ul`
  width: 288px;
  max-height: 294px;
  padding: 34px;
  border-radius: 12px;
  background-color: #313131;
  position: absolute;
  overflow: hidden;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DropdownItem = styled.li<{ $isChecked?: boolean }>`
  font-size: 20px;
  line-height: 24px;

  &:active {
    color: #b672ff;
    cursor: pointer;
  }

  ${(props) => {
    return props.$isChecked
      ? css`
          color: #b672ff;
          text-decoration-line: underline;

          &:hover {
            color: #b672ff;
            cursor: pointer;
          }
        `
      : css`
          color: #ffffff;

          &:hover {
            color: #b672ff;
            cursor: pointer;
          }
        `;
  }}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PLTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const PLCol = styled.div<{ $col?: 1 | 2 | 3 | 4 }>`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  color: #696969;
  text-transform: uppercase;
  ${(props) => {
    switch (props.$col) {
      case 1:
        return css`
          width: 447px;
        `;
      case 2:
        return css`
          width: 321px;
        `;
      case 3:
        return css`
          width: 245px;
        `;
      case 4:
        return css`
          width: 60px;
          text-align: end;
        `;
      default:
        break;
    }
  }}
`;

export const PL = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const PLItem = styled.div`
  width: 100%;
  display: block;
  margin-bottom: 12px;
`;

// Tr as Track
export const Track = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TrTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 447px;
`;

export const TrTitleImg = styled.div`
  width: 51px;
  height: 51px;
  padding: 16px;
  background: #313131;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 17px;
`;

export const TrName = styled.div<{ $isPlug?: boolean }>`
  width: 329px;
  height: 19px;
  flex-shrink: 0;
  background: ${(props) => (props.$isPlug ? '#313131' : 'transparent')};
`;

export const TrNameLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

export const TrNamePostfix = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
`;

export const TrAuthor = styled.div<{ $isPlug?: boolean }>`
  ${(props) =>
    props.$isPlug
      ? css`
          width: 271px;
          height: 19px;
          margin-right: 50px;
          background: #313131;
        `
      : css`
          width: 321px;
          display: flex;
          justify-content: flex-start;
        `};
`;

export const TrAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
`;

export const TrAlbum = styled.div<{ $isPlug?: boolean }>`
  ${(props) =>
    props.$isPlug
      ? css`
          width: 305px;
          height: 19px;
          background: #313131;
        `
      : css`
          width: 245px;
        `};
`;

export const TrAlbumLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
`;

export const TrDurationWrapper = styled.div``;

export const TrDuration = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
`;