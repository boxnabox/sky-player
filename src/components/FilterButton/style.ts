import styled, { css } from 'styled-components';

export const PLModBarWrapper = styled.div`
  position: relative;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const btnActiveMixin = css`
  border: 1px solid #ad61ff;
  color: #ad61ff;

  &:hover {
    border-color: #d9b6ff;
    color: #d9b6ff;
    cursor: pointer;
  }

  &:active {
    border-color: #ad61ff;
    color: #ad61ff;
    cursor: pointer;
  }
`;

const btnRegularMixin = css`
  border: 1px solid #ffffff;
  color: #ffffff;

  &:hover {
    border-color: #d9b6ff;
    color: #d9b6ff;
    cursor: pointer;
  }

  &:active {
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
    return props.$isOpened ? btnActiveMixin : btnRegularMixin;
  }}
`;

export const DropdownList = styled.ul`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const FilterDropdownList = styled(DropdownList)`
  padding-right: 12px;
  flex-grow: 1;
`;

export const ScrollWrapper = styled.div`
  min-width: 248px;
  max-width: 348px;
  max-height: 305px;
  margin-top: 10px;
  padding: 34px;
  position: absolute;

  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  border-radius: 12px;
  background-color: #313131;
`;

export const FilterDropdownItem = styled.li<{ $isChecked?: boolean }>`
  display: block;
  font-size: 20px;
  line-height: 25px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  &:not(:last-child) {
    margin-bottom: 28px;
  }

  &:hover {
    color: #d9b6ff;
    cursor: pointer;
  }

  ${(props) => {
    return props.$isChecked
      ? css`
          color: #ad61ff;
          text-decoration-line: underline;
          &:active {
            color: #ad61ff;
            cursor: pointer;
          }
        `
      : css`
          color: #ffffff;
          &:active {
            color: #ad61ff;
            cursor: pointer;
          }
        `;
  }}
`;
