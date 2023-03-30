import { DeepPartial } from '@violetit/types';

import { getCounter } from '../../../../test';
import { ITag, TagModel } from '../TagModel';

export const createTag = async (args: DeepPartial<ITag> = {}) => {
  const { label, color, community, ...rest } = args;

  const i = getCounter('tag');

  return new TagModel({
    community,
    label: label || `tag#${i}`,
    color: color || `color#${i}`,
    ...rest,
  }).save();
};
