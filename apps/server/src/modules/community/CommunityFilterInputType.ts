import { GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { buildSortFromArg, FILTER_CONDITION_TYPE } from '@entria/graphql-mongo-helpers';

import { DateOrdering, DateOrderingInputType } from '../../graphql/filters';
import { escapeRegex } from '../../utils/escapeRegex';

export const communityFilterMapping = {
  orderBy: {
    type: FILTER_CONDITION_TYPE.AGGREGATE_PIPELINE,
    pipeline: (value: DateOrdering[]) => [{ $sort: buildSortFromArg(value) }],
  },
  search: {
    type: FILTER_CONDITION_TYPE.CUSTOM_CONDITION,
    key: 'name',
    format: (value: string) => {
      const search = escapeRegex(value);
      return value && { $or: [{ name: { $regex: search } }, { title: { $regex: search } }] };
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
      description: 'Order communities by DateOrderingInputType.',
    },
    search: {
      type: GraphQLString,
      description: 'Filter by search.',
    },
    joinedByMe: {
      type: GraphQLBoolean,
      description: 'Filter communities joined by the user in context.',
    },
  }),
});
