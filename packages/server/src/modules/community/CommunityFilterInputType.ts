import { buildSortFromArg, FILTER_CONDITION_TYPE } from '@entria/graphql-mongo-helpers';
import { FilterMapping } from '@entria/graphql-mongo-helpers/lib/types';

import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from 'graphql';

import { DateOrdering, DateOrderingInputType } from '../../graphql/filters';
import { GraphQLArgFilter } from '../../types';

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
    OR: {
      type: new GraphQLList(CommunityFiltersInputType),
    },
    AND: {
      type: new GraphQLList(CommunityFiltersInputType),
    },
    orderBy: {
      type: new GraphQLList(new GraphQLNonNull(DateOrderingInputType)),
      description: 'Order reviews by DateOrderingInputType.',
    },
  }),
});
