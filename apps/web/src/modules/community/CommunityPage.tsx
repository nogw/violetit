import { useParams } from 'react-router-dom';

import { CommunityLayout } from './CommunityLayout';
import { Feed } from '../feed/Feed';

type CommunityPageParams = {
  community: string;
};

export const CommunityPage = () => {
  const { community } = useParams<CommunityPageParams>();

  return (
    <CommunityLayout id={String(community)}>
      <Feed community={String(community)} />
    </CommunityLayout>
  );
};
