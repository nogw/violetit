import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { buildSortFromArg, FILTER_CONDITION_TYPE } from '@entria/graphql-mongo-helpers';

import { DateOrdering, DateOrderingInputType } from '../../graphql/filters';
import { GraphQLArgFilter } from '../../types';
import { escapeRegex } from '../../utils/escapeRegex';

export type CommunitiesArgFilters = GraphQLArgFilter<{
  orderBy?: DateOrdering[];
  search?: string;
}>;

export const communityFilterMapping = {
  orderBy: {
    type: FILTER_CONDITION_TYPE.AGGREGATE_PIPELINE,
    pipeline: (value: DateOrdering[]) => [{ $sort: buildSortFromArg(value) }],
  },
  search: {
    type: FILTER_CONDITION_TYPE.CUSTOM_CONDITION,
    key: 'name',
    format: (value: string) => {
      if (!value) return {};

      return {
        $or: [{ name: { $regex: escapeRegex(value) } }, { title: { $regex: escapeRegex(value) } }],
      };
    },
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
    search: {
      type: GraphQLString,
      description: 'Filter by search.',
    },
  }),
});
