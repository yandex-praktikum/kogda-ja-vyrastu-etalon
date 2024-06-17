import {
  FC,
  MouseEventHandler,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Article } from '../services/api/articles';
import { useSelector } from '../services/hooks';
import { Divider, HeaderThreeText } from '../ui-lib';
import BuletSlider from '../ui-lib/buledSlider';
import { isLiked } from './article';
import BriefPostAnnounceWidget from './brief-post-announce-widget';

const SlideContainer = styled.div`
@keyframes show{
0%{
opacity:0;
}
100% {
opacity:1;
}
}
opacity:0;
transition: 1s;
animation: show 3s 1;
animation-fill-mode: forwards;
animation-delay: 0s;
display: flex;
transition: margin-right .3s;
width: 100%;
`;
const SlidersContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 22px;
width: 100%;
@media screen and (min-width: 768px) {
    display: none;
    }
`;
type TSlide = {
  data: Article;
  name: number;
  page: number;
};
const Slide: FC<TSlide> = ({ data, name, page }) => {
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
  } = data;
  const currentUser = useSelector((state) => state.profile);
  const favorite = isLiked(favoredBy, currentUser.id);

  const nope = (): void => {
  };
  if (page === name) {
    return (
      <SlideContainer>
        <BriefPostAnnounceWidget
          key={slug}
          username={username}
          nickname={nickname ?? username}
          title={title}
          image={image ?? ''}
          date={new Date(createdAt)}
          isLiked={favorite!}
          likesCount={favoredCount}
          slug={slug}
          onLikeClick={nope} />
      </SlideContainer>
    );
  }
  return null;
};
const BuletBar = styled.div`
        display: flex;
        gap:12px;
        padding-top:16px;
        padding-bottom: 12px;
    `;

const Slider: FC = () => {
  const data = useSelector((state) => state.view.topFeed) ?? [];
  const range = [];
  const intl = useIntl();
  for (let i = 0; i < data?.length ?? 0; i += 1) {
    range.push(i);
  }
  const [page, setPage] = useState<number>(0);

  return (
    <SlidersContainer>
      <HeaderThreeText paddingCSS='padding-bottom: 24px;'>
        {intl.messages.popularContent as string}
      </HeaderThreeText>

      {
        data && data.length > 0 && data.map((DataSlide: Article, index: number) => (
          <Slide key={DataSlide.slug} data={DataSlide} name={index} page={page} />
        ))
      }
      <BuletBar>
        {
          data && range.map((pageSlide) => {
            const isActive = pageSlide === page;
            const onClick: MouseEventHandler = () => {
              setPage(pageSlide);
            };
            return (
              <BuletSlider key={pageSlide} onClick={onClick} isActive={isActive} />
            );
          })
        }
      </BuletBar>
      <Divider distance={24} />
    </SlidersContainer>

  );
};
export default Slider;
