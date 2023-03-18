import { Routes as Router, Route } from 'react-router-dom';

import { AuthLayout } from './modules/auth/AuthLayout';
import { LoginRoutes } from './modules/user/LoginRoutes';

import { FeedPage } from './modules/feed/FeedPage';
import { PostDetailPage } from './modules/post/PostPage';
import { PostComposerDetail } from './modules/post/PostComposerDetail';
import { SearchPage } from './modules/search/SearchPage';
import { CommunityPage } from './modules/community/CommunityPage';

export const Routes = () => {
  return (
    <Router>
      <Route path="/auth/*" element={<LoginRoutes />} />
      <Route element={<AuthLayout />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/submit" element={<PostComposerDetail />} />
        <Route path="/r/search" element={<SearchPage />} />
        <Route path="/r/:community" element={<CommunityPage />} />
        <Route path="/r/:community/:post" element={<PostDetailPage />} />
      </Route>
    </Router>
  );
};
