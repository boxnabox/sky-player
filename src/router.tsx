import { createBrowserRouter, LoaderFunction, Params } from 'react-router-dom';

import MainPage, { loader as mainPageLoader } from './pages/main';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import ErrorPage from './pages/error';
import ErrorComponent from './components/ErrorComponent';

import AllTracksRoute, { loader as allTracksLoader } from './routes/all-tracks';
import SelectionRoute, { loader as selectionLoader } from './routes/selection';
import FavoritesRoute, { loader as favoritesLoader } from './routes/favorites';
import ProtectedRoute from './routes/protected';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        loader: mainPageLoader,
        children: [
          {
            errorElement: <ErrorComponent />,
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
                loader: selectionLoader as LoaderFunction<Params<string>>,
              },
            ],
          },
        ],
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
