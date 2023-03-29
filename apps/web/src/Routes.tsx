import { Routes as Router, Route } from 'react-router-dom';

import { AuthLayout } from './modules/Auth/AuthLayout';
import { LoginRoutes } from './modules/User/LoginRoutes';

import { CommunityPanelPage } from './modules/Community/CommunityPanelPage';
import { CommunityPage } from './modules/Community/CommunityPage';
import { PostDetailPage } from './modules/Post/PostPage';
import { PostComposer } from './modules/Post/PostComposer';
import { FeedPage } from './modules/Feed/FeedPage';

export const Routes = () => {
  return (
    <Router>
      <Route path="/auth/*" element={<LoginRoutes />} />
      <Route element={<AuthLayout />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/submit" element={<PostComposer />} />
        <Route path="/r/:community" element={<CommunityPage />} />
        <Route path="/r/:community/:post" element={<PostDetailPage />} />
        <Route path="/r/panel/:community" element={<CommunityPanelPage />} />
      </Route>
    </Router>
  );
};
