import React, { FC, FormEventHandler, ChangeEventHandler } from 'react';
import styled from 'styled-components';

import { createCommentThunk } from '../thunks';
import { TCommentInputProps } from '../types/widgets.types';
import { PublishCommentButton } from '../ui-lib/buttons';
import { FieldTextComment } from '../ui-lib';
import Author from './author';
import { useDispatch, useSelector } from '../services/hooks';
import { setComment } from '../store';

const CommentInputContainer = styled.form`
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid${({ theme: { dividerColor } }) => dividerColor};
  border-radius: 4px;
  & > div > label > textarea {
    border-radius: 4px;
  }
`;

const CommentInfoWrapper = styled.div`
  border-top: 1px solid${({ theme: { dividerColor } }) => dividerColor};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 24px;
  @media screen and (max-width:768px) {
    flex-flow: column wrap;
    gap: 10px 0;
  }
`;

const CommentButtonWrapper = styled.div`
  @media screen and (max-width:768px) {
    max-width: 248px;
  }
`;

const CommentInput: FC<TCommentInputProps> = ({ articleId }) => {
  const dispatch = useDispatch();
  const { isCommentPosting } = useSelector((state) => state.api);
  const { comment } = useSelector((state) => state.forms.comment);
  const { username, nickname, image } = useSelector((state) => state.profile);

  const onChangeComment : ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    dispatch(setComment(evt.target.value));
  };

  const handleCommentSubmit : FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    dispatch(createCommentThunk(articleId));
  };

  if (username) {
    return (
      <CommentInputContainer onSubmit={handleCommentSubmit}>
        <FieldTextComment minHeight={112} onChange={onChangeComment} value={comment || ''} />
        <CommentInfoWrapper>
          <Author nickname={nickname ?? username} userName={username} createAt={new Date()} imageSrc={image || ''} />
          <CommentButtonWrapper>
            <PublishCommentButton disabled={isCommentPosting} />
          </CommentButtonWrapper>
        </CommentInfoWrapper>
      </CommentInputContainer>
    );
  }
  return null;
};

export default CommentInput;
