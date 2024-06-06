import React, { FC } from 'react';
import styled from 'styled-components';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';
import { AvatarIcon } from '../../ui-lib';
import { TAuthorProps } from '../../types/widgets.types';

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 0 8px;
`;

const AuthorContainerInfo = styled.div`
  display: flex;
  gap: 4px 0;
  flex-flow: column nowrap;
  justify-content: space-around;
`;

const UserNameLink = styled(Link)`
  font-family: ${({ theme: { text16Sans: { family } } }) => family};
  font-size: ${({ theme: { text16Sans: { size } } }) => size}px;
  font-weight: ${({ theme: { text16Sans: { weight } } }) => weight};
  line-height: ${({ theme: { text16Sans: { height } } }) => height}px;
  color: ${({ theme: { secondaryText } }) => secondaryText};
  text-decoration: none;
  margin: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const CreateDate = styled.p`
  font-family: ${({ theme: { text12Sans: { family } } }) => family};
  font-size: ${({ theme: { text12Sans: { size } } }) => size}px;
  font-weight: ${({ theme: { text12Sans: { weight } } }) => weight};
  line-height: ${({ theme: { text12Sans: { height } } }) => height}px;
  color: ${({ theme: { secondaryText } }) => secondaryText};
  margin: 0;
`;

const Author: FC<TAuthorProps> = ({
  userName,
  nickname,
  createAt,
  imageSrc,
}) => (
  <AuthorContainer>
    <Link to={`/profile/${userName}`}>
      <AvatarIcon color='none' size='small' name={nickname} image={imageSrc} />
    </Link>
    <AuthorContainerInfo>
      <UserNameLink to={`/profile/${userName}`}>{nickname}</UserNameLink>
      <CreateDate>
        <FormattedDate
          value={createAt}
          year='numeric'
          month='long'
          day='2-digit'
          weekday='short' />
      </CreateDate>
    </AuthorContainerInfo>
  </AuthorContainer>
);

export default Author;
