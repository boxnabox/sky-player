import styled, { css } from 'styled-components';
import SvgImg from '../../../../../components/SvgImg';

export const PlayerBlock = styled.div`
  height: 73px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// also PLR, as Player
export const Player = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const PLRControls = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 27px 0 31px;
`;

export const ControlBtn = styled.div<{ $isLast?: boolean }>`
  padding: 5px;
  display: flex;
  align-items: center;
  fill: #d9d9d9;
  stroke: #d9d9d9;

  &:hover {
    fill: #696969;
    stroke: #696969;
    cursor: pointer;
  }

  &:active {
    fill: #d9d9d9;
    stroke: #d9d9d9;
    cursor: pointer;
  }

  ${(props) => {
    switch (props.$isLast) {
      case true:
        return css`
          margin-right: 28px;
        `;

      default:
        return css`
          margin-right: 24px;
        `;
    }
  }}
`;

export const PlayOrderBtn = styled.div<{ $isLast?: boolean }>`
  padding: 5px;
  display: flex;
  align-items: center;
  fill: #696969;
  stroke: #696969;

  &:hover {
    fill: #acacac;
    stroke: #acacac;
    cursor: pointer;
  }

  &:active {
    fill: #ffffff;
    stroke: #ffffff;
    cursor: pointer;
  }

  ${(props) => {
    switch (props.$isLast) {
      case true:
        return css`
          margin-right: 0px;
        `;
      default:
        return css`
          margin-right: 24px;
        `;
    }
  }}
`;

export const BtnSVG = styled(SvgImg)<{ $size?: 'small' | 'medium' | 'large' }>`
  ${(props) => {
    switch (props.$size) {
      case 'small':
        return css`
          width: 15px;
          height: 14px;
        `;
      case 'medium':
        return css`
          width: 18px;
          height: 14px;
        `;

      case 'large':
        return css`
          width: 22px;
          height: 20px;
        `;
    }
  }}
`;

// also TOP, as TrackOnPlay
export const TrackOnPlay = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TOPContainer = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'image album' 'image author';
  align-items: center;
`;

export const TOPAlbum = styled.div`
  width: 51px;
  height: 51px;
  grid-area: image;
  background-color: #313131;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AlbumSVG = styled(SvgImg)`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
`;

export const TOPName = styled.div`
  grid-area: album;
  width: auto;
`;

export const TOPNamePlug = styled.div`
  grid-area: album;
  width: 59px;
  height: 15px;
  background-color: #313131;
`;

export const TOPNameLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

export const TOPAuthor = styled.div`
  grid-area: author;
  width: auto;
`;

export const TOPAuthorPlug = styled.div`
  grid-area: author;
  width: 59px;
  height: 15px;
  background-color: #313131;
`;

export const TOPAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #ffffff;
  white-space: nowrap;
`;

export const LikeDisBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  margin-left: 28px;
`;

export const ReactBtn = styled.button`
  padding: 5px;
  fill: transparent;
  stroke: #696969;

  &:hover {
    stroke: #acacac;
    cursor: pointer;
  }

  &:active {
    fill: #696969;
    stroke: #ffffff;
    cursor: pointer;
  }
`;

export const ReactSVG = styled(SvgImg)<{ $option?: 'like' | 'dis' }>`
  ${(props) => {
    switch (props.$option) {
      case 'like':
        return css`
          width: 16px;
          height: 14px;
        `;
      case 'dis':
        return css`
          width: 16px;
          height: 15px;
        `;
    }
  }}
`;

// also VC, as VolumeComtrol
export const VolumeComtrol = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  padding: 0 92px 0 0;
`;

export const VCContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;

export const VCIcon = styled.div`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

export const VolumeSVG = styled(SvgImg)`
  width: 13px;
  height: 18px;
  fill: transparent;
`;

export const VolumeInputWrapper = styled.div`
  width: 109px;
`;

export const VolumeInput = styled.input.attrs(() => ({
  type: 'range',
  name: 'volume range',
}))`
  width: 109px;
  height: 4px;
  background-color: #d9d9d9;
`;
