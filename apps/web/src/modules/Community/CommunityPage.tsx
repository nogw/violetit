import { useParams } from 'react-router-dom';

import { CommunityLayout } from './CommunityLayout';
import { Feed } from 'src/modules/Feed/Feed';

type CommunityPageParams = {
  community: string;
};

export const CommunityPage = () => {
  const { community } = useParams<CommunityPageParams>();

  return (
    <CommunityLayout withInfo id={String(community)}>
      <Feed community={String(community)} />
    </CommunityLayout>
  );
};
