import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import {
  EditIcon,
  CrossIcon,
  DeleteIcon,
  AvatarIcon,
  PlusIcon,
  MinusIcon,
  LoginIcon,
  HomeIcon,
  AsterixIcon,
  CheckIcon,
  LikeIcon,
  LogoutIcon,
  NoLikeIcon,
  PaperClipIcon,
  EyeIcon,
  EyeNoIcon,
} from './icons';

import {
  EditPostButton,
  DeletePostButton,
  OpenMenuButton,
  FollowButton,
  UnfollowButton,
  LoginButton,
  RegisterButton,
  UpdateProfileButton,
  PostCommentButton,
  PublishPostButton,
  SavePostButton,
  ConfirmDeleteButton,
  MenuNewPostButton,
  MenuSettingsButton,
  MenuLogoutButton,
} from './buttons';

import {
  FieldUrl,
  FieldLogin,
  FieldEmail,
  FieldPassword,
  FieldNameArticle,
  FieldDescriptionArticle,
  FieldTags,
  FieldNick,
  FieldProfileImage,
}
  from './inputs/input-fields';
import {
  FieldTextComment,
  FieldAboutArticle,
  FieldAboutUser,
  FieldTextArticle,
} from './inputs/textarea-fields';
import {
  HeaderOneText,
  HeaderTwoText,
  HeaderThreeText,
  HeaderFourText,
  HeaderFiveText,
  RegularText,
} from './text-elements';

import Divider from './divider';

const GlobalStyles = createGlobalStyle`
  ${normalize}
`;

export default GlobalStyles;

export {
  PlusIcon,
  HomeIcon,
  LoginIcon,
  MinusIcon,
  EditIcon,
  DeleteIcon,
  AvatarIcon,
  AsterixIcon,
  CheckIcon,
  LikeIcon,
  NoLikeIcon,
  LogoutIcon,
  PaperClipIcon,
  CrossIcon,
  EyeIcon,
  EyeNoIcon,
  EditPostButton,
  DeletePostButton,
  OpenMenuButton,
  FollowButton,
  UnfollowButton,
  LoginButton,
  RegisterButton,
  UpdateProfileButton,
  PostCommentButton,
  PublishPostButton,
  SavePostButton,
  ConfirmDeleteButton,
  Divider,
  FieldUrl,
  FieldLogin,
  FieldEmail,
  FieldPassword,
  FieldNick,
  FieldNameArticle,
  FieldDescriptionArticle,
  FieldTags,
  FieldProfileImage,
  FieldTextArticle,
  FieldAboutUser,
  FieldAboutArticle,
  HeaderOneText,
  HeaderTwoText,
  HeaderThreeText,
  HeaderFourText,
  HeaderFiveText,
  RegularText,
  MenuNewPostButton,
  MenuSettingsButton,
  MenuLogoutButton,
  FieldTextComment,
};
