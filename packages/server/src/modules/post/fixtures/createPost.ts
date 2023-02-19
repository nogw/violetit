import { DeepPartial } from '@violetit/types';

import { getCounter } from '../../../../test';
import { IPost, PostModel } from '../PostModel';

import { createCommunityWithAdmin } from '../../community/fixtures/createCommunityWithAdmin';

export const createPost = async (args: DeepPartial<IPost> = {}) => {
  const i = getCounter('post');

  const { user, community } = await createCommunityWithAdmin();

  return new PostModel({
    community,
    author: user,
    title: `title#${i}`,
    content: `content#${i}`,
    ...args,
  }).save();
};
