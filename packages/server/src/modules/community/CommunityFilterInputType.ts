import { buildSortFromArg, FILTER_CONDITION_TYPE } from '@entria/graphql-mongo-helpers';
import { FilterMapping } from '@entria/graphql-mongo-helpers/lib/types';

import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from 'graphql';

import { GraphQLArgFilter } from '../../types';
import { DateOrdering, DateOrderingInputType } from '../../graphql/filters';

export type CommunitiesArgFilters = GraphQLArgFilter<{
  orderBy?: DateOrdering[];
}>;

export const communityFilterMapping: FilterMapping = {
  orderBy: {
    type: FILTER_CONDITION_TYPE.AGGREGATE_PIPELINE,
    pipeline: (value: DateOrdering[]) => [{ $sort: buildSortFromArg(value) }],
  },
};

export const CommunityFiltersInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CommunityFilters',
  description: 'Used to filter communities',
  fields: () => ({
    orderBy: {
      type: new GraphQLNonNull(new GraphQLList(DateOrderingInputType)),
      description: 'Order reviews by DateOrderingInputType.',
    },
    OR: {
      type: new GraphQLList(CommunityFiltersInputType),
    },
    AND: {
      type: new GraphQLList(CommunityFiltersInputType),
    },
  }),
});
