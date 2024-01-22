import * as S from './style';
import SkyLogo from '../SkyLogo';
import Button from '../Button';

export default function SignUpForm() {
  return (
    <S.FormWrapper>
      <S.Form>
        <SkyLogo w="140px" />
        <S.ElemsWrapper>
          <S.Input
            id="login"
            name="login"
            autoFocus={true}
            placeholder="Логин"
          />
          <S.Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
          <S.Input
            id="password-again"
            name="password-again"
            type="password"
            placeholder="Повторите пароль"
          />
        </S.ElemsWrapper>
        <S.ElemsWrapper>
          <Button name="Зарегистрироваться" type="submit" />
        </S.ElemsWrapper>
      </S.Form>
    </S.FormWrapper>
  );
}
