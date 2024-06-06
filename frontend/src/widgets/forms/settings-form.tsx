import React, {
  ChangeEventHandler, FC, FormEventHandler, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from '../../services/hooks';

import {
  setUsernameProfile,
  setEmailProfile,
  setBioProfile,
  setImageProfile,
  setNicknameProfile,
  setFormProfile,
  setPasswordProfile,
} from '../../store';

import { patchCurrentUserThunk } from '../../thunks';

import {
  ButtonContainer,
  Form,
  FormContainer,
  FormTitle,
  InputFieldset,
} from './forms-styles';

import {
  FieldEmail,
  FieldLogin,
  FieldNick,
  FieldPassword,
  FieldProfileImage,
  UpdateProfileButton,
  FieldAboutUser,
} from '../../ui-lib';

const SettingsForm: FC = () => {
  const {
    bio, email, image, username, password, nickname,
  } = useSelector((state) => state.forms.profile);

  const profile = useSelector((state) => state.profile);

  const { isSettingsPatching, isSettingsUpdateSucceeded } = useSelector((state) => state.api);

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setFormProfile({
      username: profile.username || '',
      email: profile.email || '',
      nickname: profile.nickname || '',
      bio: profile.bio || '',
      image: profile.image || '',
    }));
  }, [dispatch, profile]);

  useEffect(() => {
    if (isSettingsUpdateSucceeded) {
      navigate('/');
    }
  //  return () => { dispatch(settingsResetUpdateSucceeded()); };
  }, [dispatch, isSettingsUpdateSucceeded, navigate]);

  const submitForm : FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    dispatch(patchCurrentUserThunk());
  };

  const changeImage : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setImageProfile(evt.target.value));
  };

  const changeUsername : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setUsernameProfile(evt.target.value));
  };

  const changeBioProfile : ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    dispatch(setBioProfile(evt.target.value));
  };

  const changeEmail : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setEmailProfile(evt.target.value));
  };
  const changeNickname : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setNicknameProfile(evt.target.value));
  };
  const changePassword : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setPasswordProfile(evt.target.value));
  };

  return (
    <FormContainer>
      <FormTitle>
        <FormattedMessage id='usersettings' />
      </FormTitle>
      <Form onSubmit={submitForm}>
        <InputFieldset rowGap={16}>
          <FieldProfileImage value={image ?? ''} onChange={changeImage} />
          <FieldLogin value={username ?? ''} onChange={changeUsername} />
          <FieldNick value={nickname ?? ''} onChange={changeNickname} />
          <FieldAboutUser
            onChange={changeBioProfile}
            value={bio ?? ''}
            minHeight={theme.text18.height * 5} />
          <FieldEmail value={email ?? ''} onChange={changeEmail} />
          <FieldPassword value={password ?? ''} onChange={changePassword} />
        </InputFieldset>
        <ButtonContainer>
          <UpdateProfileButton disabled={isSettingsPatching} />
        </ButtonContainer>
      </Form>
    </FormContainer>

  );
};

export default SettingsForm;
