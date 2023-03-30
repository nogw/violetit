import { DeepPartial } from '@violetit/types';

import { getCounter } from '../../../../test';
import { IPost, PostModel } from '../PostModel';

import { createCommunityWithAdmin } from '../../community/fixtures/createCommunityWithAdmin';

export const createPost = async (args: DeepPartial<IPost> = {}) => {
  const { tags, title, content, ...rest } = args;

  const i = getCounter('post');

  const { user, community } = await createCommunityWithAdmin();

  return new PostModel({
    community,
    author: user,
    tags: tags || [],
    title: title || `title#${i}`,
    content: content || `content#${i}`,
    ...rest,
  }).save();
};
