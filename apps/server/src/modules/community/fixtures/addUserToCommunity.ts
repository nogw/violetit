import { IUserDocument, UserModel } from '../../user/UserModel';
import { ICommunityDocument } from '../CommunityModel';

export const addUserToCommunity = async (user: IUserDocument, community: ICommunityDocument) => {
  await user.updateOne({ $addToSet: { communities: community._id } });
  await community.updateOne({ $addToSet: { members: user._id } });

  const refreshedUser = await UserModel.findById(user._id);

  if (!refreshedUser) {
    throw new Error('Failed to get updated user');
  }

  return refreshedUser;
};
