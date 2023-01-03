import { LoginRoutes } from '../modules/user/LoginRoutes';
import { Routes as Router, Route } from 'react-router-dom';
import FeedPage from '../modules/feed/FeedPage';

export const Routes = () => {
  return (
    <Router>
      <Route path="/auth/*" element={<LoginRoutes />} />
      <Route path="/" element={<FeedPage />} />
    </Router>
  );
};
