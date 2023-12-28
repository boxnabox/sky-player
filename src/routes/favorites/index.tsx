import { useLoaderData } from 'react-router-dom';
import * as S from './index.style';

export function loader() {
  const fData = 'favorites loader';
  console.log(fData);
  return fData;
}

export default function Favorites() {
  const data = useLoaderData();

  return (
    <S.Container>
      <div className="login">FAVORITES</div>
    </S.Container>
  );
}
