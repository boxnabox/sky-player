import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// also SB, as Sidebar
export const Sidebar = styled.div`
  max-width: 418px;
  padding: 20px 90px 20px 78px;
`;

export const SBMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 0 15px 0;
`;

export const SBUserName = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-right: 16px;
`;

export const SBUserAvatar = styled.div`
  width: 43px;
  height: 43px;
  background-color: #313131;
  border-radius: 50%;
`;

export const SBBlock = styled.div`
  height: 100%;
  padding: 240px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const SBList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SBItem = styled.div<{ $isPlug?: boolean }>`
  width: 250px;
  height: 150px;

  &:not(:last-child) {
    margin-bottom: 30px;
  }

  ${(props) => {
    return (
      props.$isPlug &&
      css`
        background: #313131;
      `
    );
  }}
`;

export const SBItemLink = styled(Link)`
  width: 100%;
  height: 100%;
`;

export const SBItemImg = styled.img`
  width: 100%;
  height: auto;
`;
