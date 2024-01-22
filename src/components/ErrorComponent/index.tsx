import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import * as S from './style';

export default function ErrorComponent() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <S.Container>
        <div>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{`Status ${error.status || 'NA'}: ${error.statusText}`}</i>
          </p>
        </div>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </S.Container>
  );
}
