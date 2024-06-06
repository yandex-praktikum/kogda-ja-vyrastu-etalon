import React, { FC } from 'react';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from '../services/hooks';
import { Tag as ITag } from '../services/api/tags';

import Tag from './tag';

type TBarTags = {
  tagList: ITag[],
};

type TLists = {
  isHasImage?: boolean,
  rowReverse?: boolean;
};

const Lists = styled.ul<TLists>`
    display: flex;
    box-sizing:border-box;
    flex-wrap:wrap;
    flex-direction: ${({ rowReverse }) => rowReverse && 'row-reverse'};
    gap: 4px 24px;
    //width:526px;
    white-space: pre-line;
    padding:0;
    @media screen and (max-width:768px) {
        max-width:453px;
        ${({ isHasImage }) => isHasImage && 'margin-left: -60px'}
     }
     @media screen and (max-width:600px) {
        max-width:352px;
        margin:0;

        flex-direction: row;
     }
`;

Lists.defaultProps = {
  isHasImage: false,
  rowReverse: false,
};

const List = styled.li`
    list-style-type: none;
`;

const BarTags: FC<TBarTags & TLists> = ({
  tagList = [],
  isHasImage = false,
  rowReverse = false,
}) => {
  const { selectedTags } = useSelector((state) => state.view);
  return (
    <Lists isHasImage={isHasImage} rowReverse={rowReverse}>
      {tagList.map((tag) => (
        <List key={nanoid(10)}>
          <Tag tag={tag} isActive={!!selectedTags?.find((el) => el.id === tag.id)} />
        </List>
      ))}
    </Lists>
  );
};

BarTags.defaultProps = {
  isHasImage: false,
  rowReverse: false,
};

export default BarTags;
