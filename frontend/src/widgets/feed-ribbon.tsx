import { FC, MouseEventHandler } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ArticlesQueryFilter } from '../services/api/articles';
import { useDispatch, useSelector } from '../services/hooks';
import { addLikeThunk, deleteLikeThunk, getPublicFeedThunk } from '../thunks';
import { RegularText } from '../ui-lib';
import { BasicNormalButton } from '../ui-lib/buttons';
import { isLiked } from './article';
import ArticleFullPreview from './article-full-preview';
import ScrollRibbon from './scroll-ribbon';

const RibbonWrapper = styled.ul`
width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  list-style: none outside;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  gap: 32px;
`;

const ItemWrapper = styled.li`
  list-style: none outside;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
`;

interface FeedRibbonProps {
  // eslint-disable-next-line react/require-default-props
  filters?: ArticlesQueryFilter;
}

const FeedRibbon : FC<FeedRibbonProps> = ({ filters = {} }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.view.feed) || [];
  const currentUser = useSelector((state) => state.profile);

  const isFeedLoading = useSelector((state) => state.api.isPublicFeedFetching);
  const { isPublicFeedFetching } = useSelector((state) => state.api);

  const fetchMorePosts = () => {
    dispatch(getPublicFeedThunk(filters));
  };

  if (!posts.length && isPublicFeedFetching) {
    return (
      <RegularText size='large' weight={500}>
        <FormattedMessage id='loading' />
      </RegularText>
    );
  }
  return (
    <ScrollRibbon>
      <RibbonWrapper>
        {posts.map((post) => {
          const favorite = isLiked(post?.favoredBy, currentUser.id);

          const onClick : MouseEventHandler = () => {
            if (favorite) {
              dispatch(deleteLikeThunk(post.id));
            } else {
              dispatch(addLikeThunk(post.id));
            }
          };
          return (
            <ItemWrapper key={post.id}>
              <ArticleFullPreview
                article={post}
                onLikeClick={onClick} />
            </ItemWrapper>
          );
        })}
        <BasicNormalButton colorScheme='blue' onClick={fetchMorePosts}>{ isFeedLoading ? 'Загружаем...' : 'Загрузить ещё' }</BasicNormalButton>
      </RibbonWrapper>
    </ScrollRibbon>
  );
};

export default FeedRibbon;
