import { createBrowserRouter, LoaderFunction } from 'react-router-dom';
import AllTracksRoute, { loader as allTracksLoader } from './routes/all-tracks';
import SelectionRoute, { loader as selectionLoader } from './routes/selection';
import FavoritesRoute, { loader as favoritesLoader } from './routes/favorites';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';

import MainPage, { loader as mainPageLoader } from './pages/main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainPageLoader,
    children: [
      {
        path: '/',
        element: <AllTracksRoute />,
        loader: allTracksLoader,
      },
      {
        path: 'favorites',
        element: <FavoritesRoute />,
        loader: favoritesLoader,
      },
      {
        path: 'selection/:selectionId',
        element: <SelectionRoute />,
        loader: selectionLoader as unknown as LoaderFunction<unknown>,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
]);
