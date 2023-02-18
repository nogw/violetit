import { DeepPartial } from '@violetit/types';

import { getCounter } from '../../../../test';
import { createUser } from '../../user/fixtures/createUser';

import { ICommunity, CommunityModel } from '../CommunityModel';

export const createCommunity = async (args: DeepPartial<ICommunity> = {}) => {
  const { name, title, ...rest } = args;

  const i = getCounter('community');

  const user = await createUser();

  const community = await new CommunityModel({
    name: `community_name#${i}`,
    title: `community_title#${i}`,
    admin: user._id,
    members: [user._id],
    ...rest,
  }).save();

  await user.updateOne({ $addToSet: { communities: community._id } });

  return community;
};
