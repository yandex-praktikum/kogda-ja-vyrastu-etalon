import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { batch } from 'react-redux';
import { useDispatch, useSelector } from '../services/hooks';

import { ProfileWidget, FeedRibbon } from '../widgets';
import {
  getPublicFeedThunk,
  getUserProfileThunk,
} from '../thunks';
import {
  clearProfileFetchNotFound, clearErrorMessage, clearErrorObject, clearView,
} from '../store';
import ProfilePageLayout from '../layouts/profile-page-layout';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(
    (state) => state.view.profile,
  )
    ?? {
      username: '',
      nickname: '',
      email: '',
      bio: '',
      image: '',
      isCurrentUserSubscribed: false,
    };

  const isUser = useSelector(
    (state) => !!state.profile.username
      && !!state.profile.email
      && (state.profile.username === state.view.profile?.username),
  );
  const { isProfileNotFound } = useSelector((state) => state.api);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    batch(() => {
      dispatch(clearView());
      dispatch(getUserProfileThunk(username));
    });
    return () => {
      dispatch(clearView());
    };
  }, [dispatch, username]);

  useEffect(() => {
    if (profile.username) {
      dispatch(getPublicFeedThunk({ author: username }));
    }
  }, [dispatch, username, profile.username]);

  useEffect(() => {
    if (isProfileNotFound) {
      batch(() => {
        dispatch(clearProfileFetchNotFound());
        dispatch(clearErrorObject());
        dispatch(clearErrorMessage());
      });
      navigate('/no-user');
    }
  }, [dispatch, navigate, isProfileNotFound]);

  return (
    <ProfilePageLayout>
      <ProfileWidget
        userName={profile.nickname ?? profile.username}
        isFollow={profile.isCurrentUserSubscribed || false}
        userImage={profile.image ?? undefined}
        isUser={isUser}
        size='large'
        distance={0}
        color='' />
      <FeedRibbon filters={{ author: username }} />

    </ProfilePageLayout>

  );
};

export default Profile;
