import { FC } from 'react';
import styled from 'styled-components';
import { Article } from '../services/api/articles';
import { useDispatch, useSelector } from '../services/hooks';
import { addLikeThunk, deleteLikeThunk } from '../thunks';
import { TTopAnnounceWidgetProps } from '../types/widgets.types';
import { Divider, HeaderThreeText } from '../ui-lib';
import { isLiked } from './article';
import BriefPostAnnounceWidget from './brief-post-announce-widget';

const TopAnnounce = styled.div`
  display: flex;
  flex-flow: column nowrap;
  @media screen and (max-width: 767px) {
    display: none;
    }
`;

const TopContainer = styled.ul`
  min-width: 220px;
  max-width: 359px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;

  @media screen and (max-width: 767px) {
    display: none;
    }
`;

const ItemWrapper = styled.li`
  list-style: none outside;
  width: 100%;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
`;

const TopAnnounceWidget: FC<TTopAnnounceWidgetProps> = ({ caption }) => {
  const topArticles = useSelector((state) => state.view.topFeed) ?? [];
  const currentUser = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  return (
    <TopAnnounce>
      <HeaderThreeText paddingCSS='padding-bottom: 24px;'>
        {caption}
      </HeaderThreeText>
      <TopContainer>
        {topArticles.map((article: Article, index) => {
          const {
            author: {
              username,
              nickname,
              image,
            },
            title,
            createdAt,
            favoredCount,
            favoredBy,
            slug,
          } = article;
          const favorite = isLiked(favoredBy, currentUser.id);
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
          return (
            <ItemWrapper key={slug}>
              {!!index && <Divider distance={24} />}
              <BriefPostAnnounceWidget
                username={username}
                nickname={nickname ?? username}
                image={image ?? ''}
                title={title}
                date={new Date(createdAt)}
                isLiked={favorite!}
                likesCount={favoredCount}
                slug={slug}
                onLikeClick={onClickLike} />
            </ItemWrapper>
          );
        })}
      </TopContainer>
    </TopAnnounce>
  );
};

export default TopAnnounceWidget;
