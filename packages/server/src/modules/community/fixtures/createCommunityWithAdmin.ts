import { DeepPartial } from '@violetit/types';

import { getCounter } from '../../../../test';
import { upsertModel } from '../../../../test/upsertModel';

import { ICommunity, CommunityModel } from '../CommunityModel';
import { IUserDocument, UserModel } from '../../user/UserModel';
import { createUser } from '../../user/fixtures/createUser';

export const createCommunityWithAdmin = async (args: DeepPartial<ICommunity> = {}) => {
  const i = getCounter('community');

  const user = await upsertModel<IUserDocument, typeof createUser>(UserModel, createUser);

  const community = await new CommunityModel({
    name: `community_name#${i}`,
    title: `community_title#${i}`,
    admin: user._id,
    members: [user._id],
    ...args,
  }).save();

  const refreshedUser = await UserModel.findOneAndUpdate(
    { _id: user._id },
    { $addToSet: { communities: community._id } },
    { new: true },
  );

  if (!refreshedUser) {
    throw new Error('Failed to get updated user');
  }

  return {
    user: refreshedUser,
    community,
  };
};
