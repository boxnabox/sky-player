import * as S from './style';

interface ButtonProps {
  name: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <S.Button $type={props.type} onClick={props.onClick}>
      {props.name}
    </S.Button>
  );
}
