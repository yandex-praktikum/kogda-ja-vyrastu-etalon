import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../widgets/forms/register-form';
import { useSelector } from '../services/hooks';

const Page = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px 0 40px 0;
  position: relative;
  z-index: 10;
`;

const Register = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(
    (state) => state.system.isLoggedIn
        && !!state.profile.id,
  );

  React.useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);
  return (
    <Page>
      <RegisterForm />
    </Page>

  );
};

export default Register;
