import React, {
  useEffect,
  FC,
  ChangeEventHandler,
  FormEventHandler,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import { useSelector, useDispatch } from '../../services/hooks';

import { changeEmailLogin, changePasswordLogin } from '../../store';
import { loginUserThunk } from '../../thunks';
import {
  ButtonContainer, Form, FormContainer, FormLoginLink, FormTitle, InputFieldset,
} from './forms-styles';
import { FieldEmail, FieldPassword, LoginButton } from '../../ui-lib';

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.system);
  const { email, password } = useSelector((state) => state.forms.login);
  const { isUserLoggingIn } = useSelector((state) => state.api);

  const changeEmail : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeEmailLogin(evt.target.value));
  };

  const changePassword : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changePasswordLogin(evt.target.value));
  };

  const submitForm : FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    dispatch(loginUserThunk());
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <FormContainer>
      <FormTitle>
        <FormattedMessage id='userLogin' />
      </FormTitle>
      <FormLoginLink to='/registration'>
        <FormattedMessage id='register' />
      </FormLoginLink>
      <Form onSubmit={submitForm}>
        <InputFieldset rowGap={16}>
          <FieldEmail value={email ?? ''} onChange={changeEmail} />
          <FieldPassword value={password ?? ''} onChange={changePassword} />
        </InputFieldset>
        <ButtonContainer>
          <LoginButton disabled={isUserLoggingIn} />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};
export default LoginForm;
