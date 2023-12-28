import { createBrowserRouter } from 'react-router-dom';
import Selection from './routes/selection';
import Favorites, { loader as favoritesLoader } from './routes/favorites';
import Login from './pages/login';
import Signup from './pages/signup';
import AllTracks from './routes/all-tracks';
import MainPage from './pages/main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { index: true, loader: favoritesLoader, element: <Favorites /> },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'selections/:selectionId',
        element: <Selection />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
]);
