import { ErrorText } from '@violetit/ui';

import { graphql, useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';

import { CommunityPanelPageQuery } from './__generated__/CommunityPanelPageQuery.graphql';
import { CommunityLayout } from './CommunityLayout';
import { TagPanel } from '../Tag/TagPanel';

type CommunityPanelPageParams = {
  community: string;
};

const CommunityPanelPageQ = graphql`
  query CommunityPanelPageQuery($id: ID!) {
    community: node(id: $id) {
      ...TagPanel_community
    }
  }
`;

export const CommunityPanelPage = () => {
  const { community } = useParams<CommunityPanelPageParams>();
  const data = useLazyLoadQuery<CommunityPanelPageQuery>(CommunityPanelPageQ, { id: String(community) });

  if (!data || !data.community) {
    return <ErrorText>Community not found</ErrorText>;
  }

  return (
    <CommunityLayout withInfo={false} id={String(community)}>
      <TagPanel community={data.community} />
    </CommunityLayout>
  );
};
