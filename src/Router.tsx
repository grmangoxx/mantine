import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthenticationPage from './components/AuthenticationPage';
import { ForgotPassword } from './components/ForgotPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticationPage />,
  },
  {
    path: '/forgot',
    element: <ForgotPassword />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
