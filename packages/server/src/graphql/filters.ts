import { GraphQLEnumType, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { DirectionEnumType, SortDirection } from '@entria/graphql-mongo-helpers';

type DateSort = 'createdAt' | 'updatedAt';

type DateOrdering = {
  field: DateSort;
  direction: SortDirection;
};

const dateFields = {
  CREATED_AT: {
    value: 'createdAt',
    description: 'creation date',
  },
  UPDATED_AT: {
    value: 'updatedAt',
    description: 'document update date',
  },
};

const DateEnumType = new GraphQLEnumType({
  name: 'DateEnumType',
  values: dateFields,
});

const DateOrderingInputType = new GraphQLInputObjectType({
  name: 'DateOrdering',
  description: 'Input to order by createdAt or updatedAt.',
  fields: () => ({
    field: {
      type: new GraphQLNonNull(DateEnumType),
      description: 'Field used to sort, e.g. CREATED_AT.',
    },
    direction: {
      type: new GraphQLNonNull(DirectionEnumType),
      description: 'Direction used to sort, e.g. ASC.',
    },
  }),
});

export { dateFields, DateSort, DateOrdering, DateEnumType, DateOrderingInputType };
