import styled from 'styled-components';
import { Form as RouterForm } from 'react-router-dom';

export const FormWrapper = styled.div`
  color: black;
  background-color: transperent;
`;

export const Form = styled(RouterForm)`
  width: 366px;
  height: 439px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  background-color: white;
  padding: 44px;
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  border-bottom: 1px solid #d0cece;
`;

export const ElemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
