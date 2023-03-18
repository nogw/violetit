import { Routes, Route } from 'react-router-dom';

import LoginLayout from './LoginLayout';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

export const LoginRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginLayout />}>
      <Route index element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Route>
  </Routes>
);
