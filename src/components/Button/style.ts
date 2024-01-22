import { styled, css } from 'styled-components';

export const Button = styled.button<{ $type?: 'submit' | 'button' }>`
  width: 278px;
  height: 52px;
  flex-shrink: 0;

  border-radius: 6px;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;

  ${(props) => {
    switch (true) {
      case props.$type === 'submit':
        return css`
          color: #ffffff;
          background-color: #580ea2;

          &:hover {
            background-color: #3f007d;
            cursor: pointer;
          }

          &:active {
            background-color: #271a58;
            cursor: pointer;
          }
        `;

      default:
        return css`
          color: #000000;
          background-color: #ffffff;
          border: 1px solid #d0cece;

          &:hover {
            background-color: #f4f5f6;
            cursor: pointer;
          }

          &:active {
            background-color: #d9d9d9;
            cursor: pointer;
          }
        `;
    }
  }}
`;
