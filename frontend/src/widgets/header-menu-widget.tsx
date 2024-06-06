import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { batch } from 'react-redux';
import { remove as logout } from '../services/auth';

import {
  OpenMenuButton, MenuSettingsButton, MenuNewPostButton, MenuLogoutButton,
} from '../ui-lib';
import { useDispatch, useSelector } from '../services/hooks';
import {
  clearSelectedTags,
  clearUser, clearViewArticle, onLogout,
} from '../store';

const HeaderMenuWrapper = styled.nav`
  position: absolute;
  top: 24px;
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  gap: 1px;
  width: 173px;
  background: ${({ theme: { bgPrimary } }) => bgPrimary};

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 0 4px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

const HeaderMenuWidget : FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nickname, username, image } = useSelector((store) => store.profile);
  const { isLoggedIn } = useSelector((state) => state.system);
  const onProfileClick : MouseEventHandler<HTMLButtonElement> = () => navigate(`/profile/${username || ''}`);
  const onUpdateProfileClick : MouseEventHandler<HTMLButtonElement> = () => navigate('/settings');
  const onNewPostClick : MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(clearViewArticle());
    navigate('/editArticle');
  };
  const onLogoutClick : MouseEventHandler<HTMLButtonElement> = () => {
    batch(() => {
      dispatch(onLogout());
      dispatch(clearUser());
      dispatch(clearViewArticle());
      dispatch(clearSelectedTags());
    });

    logout();

    navigate('/');
  };
  if (!isLoggedIn || !username) {
    return null;
  }
  return (
    <HeaderMenuWrapper>
      <OpenMenuButton onClick={onProfileClick} name={(nickname ?? username) || ''} image={image || ''} />
      <MenuNewPostButton onClick={onNewPostClick} />
      <MenuSettingsButton onClick={onUpdateProfileClick} />
      <MenuLogoutButton onClick={onLogoutClick} />
    </HeaderMenuWrapper>
  );
};

export default HeaderMenuWidget;
