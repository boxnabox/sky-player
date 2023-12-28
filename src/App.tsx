import { RouterProvider } from 'react-router-dom';
import { router as appRouter } from './router';

import * as S from './style';

export default function App() {
  return (
    <S.AppWrapper>
      <RouterProvider router={appRouter} />
    </S.AppWrapper>
  );
}
