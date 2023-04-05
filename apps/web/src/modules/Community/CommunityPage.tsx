import { useParams } from 'react-router-dom';

import { CommunityLayout } from './CommunityLayout';
import { Feed } from 'src/modules/Feed/Feed';

type CommunityPageParams = {
  community: string;
  tags?: string;
};

export const CommunityPage = () => {
  const { community, tags } = useParams<CommunityPageParams>();

  return (
    <CommunityLayout withInfo key={community} id={String(community)}>
      <Feed community={String(community)} tags={tags} />
    </CommunityLayout>
  );
};
