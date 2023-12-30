import * as S from './style';
import SkyLogo from '../SkyLogo';
import Button from '../Button';

export default function LoginForm() {
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
        </S.ElemsWrapper>
        <S.ElemsWrapper>
          <Button name="Войти" type="submit" />
          <Button name="Зарегистрироваться" />
        </S.ElemsWrapper>
      </S.Form>
    </S.FormWrapper>
  );
}
