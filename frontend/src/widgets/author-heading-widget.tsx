import React from 'react';
import styled, { useTheme } from 'styled-components';
import { TAuthorHeadingProps } from '../types/widgets.types';

import Author from './author';
import Likes from './likes';
import { DeleteIcon } from '../ui-lib';

const HeadingContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 40px;
  gap: 0 8px;
  height: 40px;
`;

const AuthorHeadingWidget : React.FC<TAuthorHeadingProps> = ({
  username,
  nickname,
  image,
  date,
  isLiked,
  likesCount,
  isAuthor,
  onDeleteClick,
  onLikeClick,
}) => {
  const theme = useTheme();

  return (
    <HeadingContainer>
      <Author
        userName={username}
        nickname={nickname}
        imageSrc={image}
        createAt={date} />
      {isAuthor ? (<DeleteIcon color={theme.button.red.default} onClick={onDeleteClick} />)
        : (
          <Likes
            likesCounterValue={likesCount}
            handleClick={onLikeClick}
            favorite={isLiked} />
        )}
    </HeadingContainer>
  );
};

export default AuthorHeadingWidget;
