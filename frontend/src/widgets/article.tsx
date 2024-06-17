import React, { FC, MouseEventHandler } from 'react';
import { FormattedDate } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
import { openConfirm } from '../store';
import {
  addLikeThunk, deleteLikeThunk,
} from '../thunks';
import { DeletePostButton, EditPostButton } from '../ui-lib';
import BarTags from './bar-tags';
import Likes from './likes';

type TArticleProps = {
  slug: string;
};

type TArticleActionsProps = {
  onClickEdit: MouseEventHandler<HTMLButtonElement>;
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
};

const ArticleContainer = styled.div`
  display: flex;
  flex-flow: column  nowrap;
  gap: 24px 0;
  width: 100%;
  max-width: 700px;

  @media screen and (max-width:768px) {
    gap: 16px 0;
 }
`;

const ArticleTitle = styled.h1`
    margin: 0;
    font-size: ${({ theme: { firstLevelHeading: { size } } }) => `${size}px`} ;
    font-family: ${({ theme: { firstLevelHeading: { family } } }) => family};
    line-height: ${({ theme: { firstLevelHeading: { height } } }) => `${height}px`} ;
    font-weight: ${({ theme: { firstLevelHeading: { weight } } }) => weight};
    color: ${({ theme: { primaryText } }) => primaryText};
`;

const ArticleActionsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  && > button {
    width:233px;
    @media screen  and (max-width:725px) {
      width:175px;
    }
  }
`;

const ArticleAuthor = styled.p`
  font-size: ${({ theme: { text16: { size } } }) => size}px ;
  font-family: ${({ theme: { text16: { family } } }) => family};
  line-height: ${({ theme: { text16: { height } } }) => height}px;
  font-weight: ${({ theme: { text16: { weight } } }) => weight};
  margin: 0;
  grid-row: 1;
`;

const ArticleCreateDate = styled.p`
  font-size: ${({ theme: { text16: { size } } }) => size}px ;
  font-family: ${({ theme: { text16: { family } } }) => family};
  line-height: ${({ theme: { text16: { height } } }) => height}px;
  font-weight: ${({ theme: { text16: { weight } } }) => weight};
  margin: 0;
  grid-row: 1;
`;

const ArticleLikeWrapper = styled.div`
  grid-row: 1;
  justify-self: end;
`;

const ArticleAuthorContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 0 24px;
`;

const ArticleImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
`;

const ArticleBody = styled.p`
  font-family: ${({ theme: { text18: { family } } }) => family};
  font-size: ${({ theme: { text18: { size } } }) => size}px ;
  line-height: ${({ theme: { text18: { height } } }) => height}px;
  font-weight: ${({ theme: { text18: { weight } } }) => weight};
  margin: 0;
  @media screen and (max-width:768px) {
    font-family: ${({ theme: { text16: { family } } }) => family};
    font-size: ${({ theme: { text16: { size } } }) => size}px ;
    line-height: ${({ theme: { text16: { height } } }) => height}px;
    font-weight: ${({ theme: { text16: { weight } } }) => weight};
 }
`;

export const isLiked = (
  likes: string[] | undefined,
  currentUserId: string,
) => likes && likes.some((userId) => userId === currentUserId);

const ArticleActions: FC<TArticleActionsProps> = ({ onClickEdit, onClickDelete }) => (
  <ArticleActionsContainer>
    <EditPostButton onClick={onClickEdit} />
    <DeletePostButton onClick={onClickDelete} />
  </ArticleActionsContainer>
);

const Article: FC<TArticleProps> = ({ slug }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { article } = useSelector((state) => state.view);
  const currentUser = useSelector((state) => state.profile);
  const isAuthor = article?.author.username === currentUser.username;
  const favorite = isLiked(article?.favoredBy, currentUser.id);

  const onClickDelete = () => {
    if (article) {
      dispatch(openConfirm());
    }
  };

  const onClickEdit = () => {
    if (article && slug) {
      navigate(`/editArticle/${slug}`);
    }
  };

  const onClickLike = (ev: React.MouseEvent) => {
    ev.preventDefault();

    if (!article) {
      return;
    }

    if (favorite) {
      dispatch(deleteLikeThunk(article.id));
    } else {
      dispatch(addLikeThunk(article.id));
    }
  };

  if (!article) {
    return null;
  }
  return (
    <ArticleContainer>
      {isAuthor && (
        <ArticleActions onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
      )}
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleAuthorContainer>
        <ArticleAuthor>{article.author.nickname ?? article.author.username}</ArticleAuthor>
        <ArticleCreateDate>
          <FormattedDate
            value={article.createdAt}
            year='numeric'
            month='long'
            day='2-digit'
            weekday='short' />
        </ArticleCreateDate>
        <ArticleLikeWrapper>
          <Likes
            likesCounterValue={article.favoredCount}
            handleClick={onClickLike}
            favorite={favorite!} />
        </ArticleLikeWrapper>
      </ArticleAuthorContainer>
      {article.image && (
        <ArticleImage src={article.image} />
      )}
      <ArticleBody>{article.body}</ArticleBody>
      <BarTags tagList={article.tags} />
    </ArticleContainer>
  );
};

export default Article;
