import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { LikeIcon, NoLikeIcon } from '../ui-lib';

interface ILikesProps {
  likesCounterValue: number,
  handleClick: MouseEventHandler<SVGSVGElement>,
  favorite: boolean
}

const LikesCounter = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.text18Sans.family};
  font-size: ${({ theme }) => theme.text18Sans.size}px;
  font-weight: ${({ theme }) => theme.text18Sans.weight};
  line-height: ${({ theme }) => theme.text18Sans.height}px;
  color: ${({ theme }) => theme.secondaryText};
`;

const LikesContainer = styled.div`
  width: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: min-content;
`;

const Likes: FC<ILikesProps> = ({ likesCounterValue, handleClick, favorite }) => (
  <LikesContainer>
    <LikesCounter>
      {likesCounterValue}
    </LikesCounter>
    { favorite
      ? <LikeIcon onClick={handleClick} width='21' height='18' cursor='pointer' color='grey' />
      : <NoLikeIcon onClick={handleClick} width='21' height='18' cursor='pointer' color='grey' />}

  </LikesContainer>

);

export default Likes;
