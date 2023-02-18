import { IUserDocument } from '../../user/UserModel';
import { ICommunityDocument } from '../CommunityModel';

export const addUserToCommunity = async (user: IUserDocument, community: ICommunityDocument) => {
  await user.updateOne({ $addToSet: { communities: community._id } });
  await community.updateOne({ $addToSet: { members: user._id } });
};
