import React, { FC } from 'react';
import styled from 'styled-components';

import { TAvatarSizes, TAvatarIconProps, TIconProps } from '../types/styles.types';

import { ReactComponent as EditPic } from '../assets/images/icons/edit-icon.svg';
import { ReactComponent as BasketPic } from '../assets/images/icons/trash-icon.svg';
import { ReactComponent as AvatarPic } from '../assets/images/icons/avatar-icon.svg';
import { ReactComponent as AsterixPic } from '../assets/images/icons/asterix-icon.svg';
import { ReactComponent as CheckPic } from '../assets/images/icons/check-icon.svg';
import { ReactComponent as HomePic } from '../assets/images/icons/home-icon.svg';
import { ReactComponent as LikePic } from '../assets/images/icons/like-icon.svg';
import { ReactComponent as LoginPic } from '../assets/images/icons/login-icon.svg';
import { ReactComponent as LogoutPic } from '../assets/images/icons/logout-icon.svg';
import { ReactComponent as NoLikePic } from '../assets/images/icons/no-like-icon.svg';
import { ReactComponent as PaperclipPic } from '../assets/images/icons/paperclip-icon.svg';
import { ReactComponent as PlusPic } from '../assets/images/icons/plus-icon.svg';
import { ReactComponent as MinusPic } from '../assets/images/icons/minus-icon.svg';
import { ReactComponent as CrossPic } from '../assets/images/icons/cross-icon.svg';
import { ReactComponent as EyePic } from '../assets/images/icons/eye-icon.svg';
import { ReactComponent as EyeNoPic } from '../assets/images/icons/eyeNo-icon.svg';

import { getAvatarBorderProp, testImageUrl } from '../services/helpers';
import { blue, greySecondary } from '../constants/colors';

type TAvatarSize = {
  [size in TAvatarSizes]: {
    width: number;
    height: number;
  }
};

const avatarSize : TAvatarSize = {
  large: {
    width: 230,
    height: 230,
  },
  small: {
    width: 24,
    height: 24,
  },
};

type TBorderProps = {
  width: number;
  color: string;
  style: string;
};

interface IBasicAvatar {
  bordered: boolean,
  borderProps: TBorderProps,
  distance?: number,
  color?: string,
}

export const EditIcon = styled(EditPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;

export const CrossIcon = styled(CrossPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  color: ${({ color }) => color};
  & > path {
    stroke: ${({ color }) => color};
    }
`;

export const DeleteIcon = styled(BasketPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  cursor: pointer;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;
const DefaultAvatar = styled(AvatarPic)<TIconProps>`
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;

const BasicAvatar = styled.img<IBasicAvatar>`
  box-sizing: border-box;
  border-radius: 50%;
  margin-right: ${({ distance }) => distance ?? 0}px;
  border-width: ${({ bordered, borderProps: { width } }) => getAvatarBorderProp(bordered, width)}px;
  border-color: ${({ bordered, borderProps: { color } }) => getAvatarBorderProp(bordered, color)};
  border-style: ${({ bordered, borderProps: { style } }) => getAvatarBorderProp(bordered, style)};
`;

export const AvatarIcon : FC<TAvatarIconProps> = ({
  size,
  name,
  image,
  distance,
  color = greySecondary,
}) => {
  const borderProps : TBorderProps = {
    width: 2,
    color: blue,
    style: 'solid',
  };
  if ((!image) || (!!image && !testImageUrl(image))) {
    return (
      <DefaultAvatar
        width={`${avatarSize[size].width}px`}
        height={`${avatarSize[size].height}px`}
        distance={distance}
        color={color} />
    );
  }
  return (
    <BasicAvatar
      borderProps={borderProps}
      bordered={!!image && size === 'small'}
      alt={name}
      src={image}
      width={`${avatarSize[size].width}px`}
      height={`${avatarSize[size].height}px`}
      distance={distance} />
  );
};

export const AsterixIcon = styled(AsterixPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;

export const CheckIcon = styled(CheckPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;

export const HomeIcon = styled(HomePic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;

export const LikeIcon = styled(LikePic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  color: ${({ color }) => color};
  & > path {
    stroke: ${({ color }) => color};
    fill: ${({ color }) => color};
    }
`;

export const NoLikeIcon = styled(NoLikePic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;

export const PaperClipIcon = styled(PaperclipPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;

export const LoginIcon = styled(LoginPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;

export const LogoutIcon = styled(LogoutPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;

export const PlusIcon = styled(PlusPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;
export const MinusIcon = styled(MinusPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;
export const EyeIcon = styled(EyePic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;
export const EyeNoIcon = styled(EyeNoPic)<TIconProps>`
  width: 24px;
  height: 24px;
  display: block;
  margin-right: ${({ distance }) => distance ?? 0}px;
  & > path {
    stroke: ${({ color }) => color};
    }
`;
