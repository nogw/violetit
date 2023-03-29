import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from 'graphql';

import { FILTER_CONDITION_TYPE, buildSortFromArg, getObjectId } from '@entria/graphql-mongo-helpers';
import { FilterMapping } from '@entria/graphql-mongo-helpers/lib/types';

import { DateOrdering, DateOrderingInputType } from '../../graphql/filters';
import { GraphQLArgFilter, ObjectId } from '../../types';

export type TagArgFilters = GraphQLArgFilter<{
  orderBy?: DateOrdering[];
  category?: ObjectId;
}>;

export const TagFilterMapping: FilterMapping = {
  orderBy: {
    type: FILTER_CONDITION_TYPE.AGGREGATE_PIPELINE,
    pipeline: (value: DateOrdering[]) => [{ $sort: buildSortFromArg(value) }],
  },
  community: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (value: string) => value && getObjectId(value),
  },
};

export const TagFiltersInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'TagFilter',
  description: 'Used to filter tags',
  fields: () => ({
    OR: {
      type: new GraphQLList(TagFiltersInputType),
    },
    AND: {
      type: new GraphQLList(TagFiltersInputType),
    },
    orderBy: {
      type: new GraphQLList(new GraphQLNonNull(DateOrderingInputType)),
      description: 'Order reviews by DateOrderingInputType.',
    },
    community: {
      type: GraphQLID,
      description: 'Filter by community.',
    },
  }),
});
