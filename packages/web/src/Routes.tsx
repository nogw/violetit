import { Routes as Router, Route } from 'react-router-dom';

import { RequireAuthLayout } from './modules/auth/RequireAuthLayout';
import { LoginRoutes } from './modules/user/LoginRoutes';
import FeedPage from './modules/feed/FeedPage';

export const Routes = () => {
  return (
    <Router>
      <Route path="/auth/*" element={<LoginRoutes />} />
      <Route element={<RequireAuthLayout />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/post/:id" element={<FeedPage />} />
      </Route>
    </Router>
  );
};
