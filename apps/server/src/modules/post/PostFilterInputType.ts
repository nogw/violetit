import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

import { FILTER_CONDITION_TYPE, buildSortFromArg, getObjectId } from '@entria/graphql-mongo-helpers';
import { FilterMapping } from '@entria/graphql-mongo-helpers/lib/types';

import { DateOrdering, DateOrderingInputType } from '../../graphql/filters';

export const PostFilterMapping: FilterMapping = {
  orderBy: {
    type: FILTER_CONDITION_TYPE.AGGREGATE_PIPELINE,
    pipeline: (value: DateOrdering[]) => [{ $sort: buildSortFromArg(value) }],
  },
  community: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (value: string) => value && getObjectId(value),
  },
  tags: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (value: string) => value && { $in: [getObjectId(value)] },
  },
  title: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (value: string) => value && { $regex: new RegExp(value, 'i') },
  },
};

export const PostFiltersInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'PostFilter',
  description: 'Used to filter posts',
  fields: () => ({
    OR: {
      type: new GraphQLList(PostFiltersInputType),
    },
    AND: {
      type: new GraphQLList(PostFiltersInputType),
    },
    orderBy: {
      type: new GraphQLList(new GraphQLNonNull(DateOrderingInputType)),
      description: 'Order reviews by DateOrderingInputType.',
    },
    community: {
      type: GraphQLID,
      description: 'Filter by community.',
    },
    tags: {
      type: GraphQLID,
      description: 'Filter by tag.',
    },
    title: {
      type: GraphQLString,
      description: 'Filter by title.',
    },
  }),
});
