import { Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

export const LoginRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Route>
  </Routes>
);
