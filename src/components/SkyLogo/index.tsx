import * as S from './style';

interface LogoProps {
  w?: string;
  h?: string;
  color?: 'black' | 'white';
}

export default function SkyLogo(props: LogoProps) {
  return (
    <S.LogoImage
      $w={props.w}
      $h={props.h}
      src={
        props.color === 'white' ? '/img/logo_white.svg' : '/img/logo_black.svg'
      }
      aria-label="skypro logo"
    />
  );
}
