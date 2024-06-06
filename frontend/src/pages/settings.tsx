import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SettingsForm from '../widgets/forms/settings-form';
import { useSelector } from '../services/hooks';

const Page = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Settings = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(
    (state) => state.system.isLoggedIn
        && !!state.profile.id,
  );

  React.useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged, navigate]);

  return (
    <Page>
      <SettingsForm />
    </Page>
  );
};

export default Settings;
