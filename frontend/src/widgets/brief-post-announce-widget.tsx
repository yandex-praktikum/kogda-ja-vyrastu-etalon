import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { primaryBlack } from '../constants/colors';
import { useSelector } from '../services/hooks';
import { TBriefPostAnnounceProps } from '../types/widgets.types';
import { HeaderFiveText } from '../ui-lib';
import AuthorHeadingWidget from './author-heading-widget';

const BriefPostAnnounceWrapper = styled.article`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  max-height: 150px;
  width: 100%;
  word-break: break-all;
  @media screen and (max-width: 1918px) {
    width: 100%;
  }
  @media screen and (max-width: 639px) {
    width: 280px;
  }
`;

const BriefPostAnnounceWidget: React.FC<TBriefPostAnnounceProps> = ({
  username,
  nickname,
  title,
  image,
  date,
  isLiked,
  likesCount,
  slug,
  onLikeClick,
}) => {
  const currentUser = useSelector((state) => state.profile);
  const link = slug ? `/article/${slug}` : '/';
  return (
    <BriefPostAnnounceWrapper>
      <AuthorHeadingWidget
        username={username}
        nickname={nickname}
        date={date}
        image={image}
        isAuthor={username === currentUser.username}
        isLiked={isLiked}
        likesCount={likesCount}
        onLikeClick={onLikeClick} />
      <Link to={link} style={{ textDecoration: 'none' }}>
        <HeaderFiveText marginCSS='margin-right: 70px;' color={primaryBlack}>
          {title}
        </HeaderFiveText>
      </Link>
    </BriefPostAnnounceWrapper>
  );
};

export default BriefPostAnnounceWidget;
