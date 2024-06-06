import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../services/hooks';
import EditorForm from '../widgets/forms/editor-form';

const Page = styled.section`
  width: 100%;
  margin: 40px 0 40px 0;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
`;

const Editor = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(
    (state) => state.system.isLoggedIn
      && !!state.profile.username,
  );

  React.useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged, navigate]);

  return (
    <Page>
      <EditorForm />
    </Page>
  );
};

export default Editor;
