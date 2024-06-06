import React, { FC } from 'react';
import styled from 'styled-components';
import { useSelector } from '../services/hooks';
import BriefPostAnnounceWidget from './brief-post-announce-widget';
import { Divider, HeaderThreeText } from '../ui-lib';
import { TTopAnnounceWidgetProps } from '../types/widgets.types';
import { Article } from '../services/api/articles';

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

const TopAnnounceWidget : FC<TTopAnnounceWidgetProps> = ({ caption }) => {
  const topArticles = useSelector((state) => state.view.topFeed) ?? [];
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
            favoredByCurrentUser,
            slug,
          } = article;
          const nope = (): void => {
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
                isLiked={favoredByCurrentUser}
                likesCount={favoredCount}
                onLikeClick={nope} />
            </ItemWrapper>
          );
        })}
      </TopContainer>
    </TopAnnounce>
  );
};

export default TopAnnounceWidget;
