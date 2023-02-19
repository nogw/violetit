import { DeepPartial } from '@violetit/types';

import { getCounter } from '../../../../test';
import { upsertModel } from '../../../../test/upsertModel';

import { ICommunity, CommunityModel } from '../CommunityModel';
import { IUserDocument, UserModel } from '../../user/UserModel';
import { createUser } from '../../user/fixtures/createUser';

export const createCommunityWithAdmin = async (args: DeepPartial<ICommunity> = {}) => {
  const { name, ...rest } = args;

  const i = getCounter('community');

  const user = await upsertModel<IUserDocument, typeof createUser>(UserModel, createUser);

  const community = await new CommunityModel({
    name: name || `community_name#${i}`,
    title: `community_title#${i}`,
    admin: user._id,
    members: [user._id],
    ...rest,
  }).save();

  await user.updateOne({ $addToSet: { communities: community._id } });

  return {
    user,
    community,
  };
};
