import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import {
  TButtonProps,
  TAvatarButtonProps,
} from '../types/styles.types';

import {
  EditIcon,
  AvatarIcon,
  DeleteIcon,
  PlusIcon,
  MinusIcon,
  AsterixIcon,
  LogoutIcon,
  HomeIcon,
  LoginIcon,
} from './icons';
import { getPropOnCondition, setColor } from '../services/helpers';
import useMouseEvents from '../services/hooks/use-mouse-events';
import { RegularText } from './text-elements';

export const iconDistance = 8;

type TBasicButtonProps = {
  colorScheme: string;
  disabled?: boolean;
};

export const BasicNormalButton = styled.button<TBasicButtonProps>`
 // width: 100%;
  padding: 8px 16px;
  border-radius: 4px;
  border-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].default, button[colorScheme].disabled)};
  color: ${({ colorScheme, theme: { button } }) => button[colorScheme].font};

  &:hover {
    background-color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].hover, button[colorScheme].disabled)};
    }
  &:active {
    background-color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].active, button[colorScheme].disabled)};
    }
  &:focus {
    background-color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].active, button[colorScheme].disabled)};
    }
  `;

const BasicInvertedButton = styled.button<TBasicButtonProps>`
  padding: 8px 16px;
  border-radius: 4px;
  border-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].default, button[colorScheme].disabled)};
  background-color: ${({ colorScheme, theme: { button } }) => button[colorScheme].font};

  &:hover {
    color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].hover, button[colorScheme].disabled)};
    }
  &:active {
    color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].active, button[colorScheme].disabled)};
    }
  &:focus {
    color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].active, button[colorScheme].disabled)};
    }
`;

const MenuButton = styled.button<TBasicButtonProps>`
  width: 100%;
  padding: 8px 16px;
  border-radius: 4px;
  border-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].default, button[colorScheme].disabled)};
  color: ${({ colorScheme, theme: { button } }) => button[colorScheme].font};

  &:hover {
    background-color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].hover, button[colorScheme].disabled)};
  }
  &:active {
    background-color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].active, button[colorScheme].disabled)};
  }
  &:focus {
    background-color: ${({ colorScheme, theme: { button }, disabled }) => getPropOnCondition(disabled, button[colorScheme].active, button[colorScheme].disabled)};
  }
`;

export const EditPostButton : FC<TButtonProps> = ({ onClick, disabled = false }) => {
  const theme = useTheme();
  return (
    <BasicNormalButton
      colorScheme='blue'
      disabled={disabled}
      onClick={onClick}>
      <EditIcon
        color={theme.button.blue.font}
        distance={iconDistance} />
      <RegularText size='large' weight={400} sansSerif>
        <FormattedMessage id='editArticle' />
      </RegularText>
    </BasicNormalButton>
  );
};
export const DeletePostButton : FC<TButtonProps> = ({ onClick, disabled = false }) => {
  const theme = useTheme();
  const {
    status: {
      isActive,
      isHovered,
      isFocused,
    },
    handlers: {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onMouseDown,
      onMouseUp,
    },
  } = useMouseEvents({});

  return (
    <BasicInvertedButton
      colorScheme='red'
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}>
      <DeleteIcon
        color={theme.button.red[setColor(isHovered, isFocused, isActive, !!disabled)]}
        distance={iconDistance} />
      <RegularText size='large' weight={400} sansSerif>
        <FormattedMessage id='deleteArticle' />
      </RegularText>
    </BasicInvertedButton>
  );
};
export const OpenMenuButton: FC<TAvatarButtonProps> = ({
  onClick,
  disabled = false,
  name,
  image,
}) => {
  const theme = useTheme();
  const {
    status: {
      isActive,
      isHovered,
      isFocused,
    },
    handlers: {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onMouseDown,
      onMouseUp,
    },
  } = useMouseEvents({});
  return (
    <BasicNormalButton
      colorScheme='menu'
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}>
      <AvatarIcon
        size='small'
        name={name}
        image={image}
        distance={iconDistance}
        color={theme.button.blue[setColor(isHovered, isFocused, isActive, !!disabled)]} />
      <RegularText size='large' weight={500} clampLines heightLimit={40} align='left'>
        {name}
      </RegularText>
    </BasicNormalButton>
  );
};

export const SavePostButton : FC<Omit<TButtonProps, 'onClick'>> = ({ disabled = false }) => (
  <BasicNormalButton type='submit' colorScheme='blue' disabled={disabled}>
    <FormattedMessage id='saveArticle' />
  </BasicNormalButton>
);

export const ConfirmDeleteButton : FC<TButtonProps> = ({ onClick, disabled = false }) => (
  <BasicNormalButton colorScheme='red' disabled={disabled} onClick={onClick}>
    <RegularText size='large' weight={500}>
      <FormattedMessage id='deleteArticle' />
    </RegularText>
  </BasicNormalButton>
);

export const FollowButton: FC<TButtonProps> = ({ onClick, disabled = false }) => {
  const theme = useTheme();
  return (
    <BasicNormalButton colorScheme='blue' disabled={disabled} onClick={onClick}>
      <PlusIcon color={theme.button.blue.font} distance={iconDistance} />
      <RegularText size='large' weight={500}>
        <FormattedMessage id='subscribe' />
      </RegularText>
    </BasicNormalButton>
  );
};

export const UnfollowButton : FC<TButtonProps> = ({ onClick, disabled = false }) => {
  const theme = useTheme();
  return (
    <BasicNormalButton colorScheme='blue' disabled={disabled} onClick={onClick}>
      <MinusIcon color={theme.button.blue.font} distance={iconDistance} />
      <RegularText size='large' weight={500}>
        <FormattedMessage id='unsubscribe' />
      </RegularText>
    </BasicNormalButton>
  );
};

export const PostCommentButton : FC<TButtonProps> = ({ onClick, disabled = false }) => (
  <BasicNormalButton colorScheme='blue' disabled={disabled} onClick={onClick}>
    <RegularText size='large' weight={500}>
      <FormattedMessage id='sendComment' />
    </RegularText>
  </BasicNormalButton>
);

export const RegisterButton : FC<Omit<TButtonProps, 'onClick'>> = ({ disabled = false }) => (
  <BasicNormalButton type='submit' colorScheme='blue' disabled={disabled}>
    <RegularText size='large' weight={500}>
      <FormattedMessage id='register' />
    </RegularText>
  </BasicNormalButton>
);

export const LoginButton : FC<Omit<TButtonProps, 'onClick'>> = ({ disabled = false }) => (
  <BasicNormalButton type='submit' colorScheme='blue' disabled={disabled}>
    <RegularText size='large' weight={500}>
      <FormattedMessage id='userLogin' />
    </RegularText>
  </BasicNormalButton>
);

export const UpdateProfileButton : FC<Omit<TButtonProps, 'onClick'>> = ({ disabled = false }) => (
  <BasicNormalButton type='submit' colorScheme='blue' disabled={disabled}>
    <RegularText size='large' weight={500}>
      <FormattedMessage id='refreshUser' />
    </RegularText>
  </BasicNormalButton>
);
export const PublishPostButton : FC<Omit<TButtonProps, 'onClick'>> = ({ disabled = false }) => (
  <BasicNormalButton type='submit' colorScheme='blue' disabled={disabled}>
    <RegularText size='large' weight={500}>
      <FormattedMessage id='publishArticle' />
    </RegularText>
  </BasicNormalButton>
);

export const PublishCommentButton : FC<Omit<TButtonProps, 'onClick'>> = ({ disabled = false }) => (
  <BasicNormalButton type='submit' colorScheme='blue' disabled={disabled}>
    <FormattedMessage id='publishComment' />
  </BasicNormalButton>
);

export const MenuSettingsButton : FC<TButtonProps> = ({ onClick, disabled = false }) => {
  const theme = useTheme();
  return (
    <MenuButton
      colorScheme='menu'
      disabled={disabled}
      onClick={onClick}>
      <AsterixIcon
        color={theme.button.menu.font}
        distance={iconDistance} />
      <RegularText size='large' weight={500}>
        <FormattedMessage id='settings' />
      </RegularText>
    </MenuButton>
  );
};

export const MenuNewPostButton : FC<TButtonProps> = ({ onClick, disabled = false }) => {
  const theme = useTheme();
  return (
    <MenuButton
      colorScheme='menu'
      disabled={disabled}
      onClick={onClick}>
      <EditIcon
        color={theme.button.menu.font}
        distance={iconDistance} />
      <RegularText size='large' weight={500}>
        <FormattedMessage id='newArticle' />
      </RegularText>
    </MenuButton>
  );
};

export const MenuLogoutButton : FC<TButtonProps> = ({ onClick, disabled = false }) => {
  const theme = useTheme();
  return (
    <MenuButton
      colorScheme='menu'
      disabled={disabled}
      onClick={onClick}>
      <LogoutIcon
        color={theme.button.menu.font}
        distance={iconDistance} />
      <RegularText size='large' weight={500}>
        <FormattedMessage id='exitProfile' />
      </RegularText>
    </MenuButton>
  );
};

export const HomeButton : FC<TButtonProps> = ({ onClick, disabled = false }) => {
  const theme = useTheme();
  return (
    <BasicNormalButton
      colorScheme='menu'
      disabled={disabled}
      onClick={onClick}>
      <HomeIcon
        color={theme.button.menu.font}
        distance={iconDistance} />
      <RegularText size='large' weight={500}>
        <FormattedMessage id='headerLink' />
      </RegularText>
    </BasicNormalButton>
  );
};

export const HeaderLoginButton : FC<TButtonProps> = ({ onClick, disabled = false }) => {
  const theme = useTheme();
  return (
    <BasicNormalButton
      colorScheme='menu'
      disabled={disabled}
      onClick={onClick}>
      <LoginIcon
        color={theme.button.menu.font}
        distance={iconDistance} />
      <RegularText size='large' weight={500}>
        <FormattedMessage id='userLogin' />
      </RegularText>
    </BasicNormalButton>
  );
};
