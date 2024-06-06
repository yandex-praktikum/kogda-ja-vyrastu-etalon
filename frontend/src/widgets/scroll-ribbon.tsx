import React, {
  FC,
  PropsWithChildren,
} from 'react';
import styled from 'styled-components';

import { TScrollRibbonProps } from '../types/widgets.types';

const Ribbon = styled.section`
  // overflow: scroll;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
 /* height: calc(100vh - 293px - 120px);
  @media screen and (max-width: 1300px) {
    height: calc(100vh - 229px - 120px);
  }
  @media screen and (max-width: 1023px) {
    height: calc(100vh - 189px - 120px);
  }
  @media screen and (max-width: 992px) {
    height: calc(100vh - 189px - 87px);
  }
  @media screen and (max-width: 720px) {
    height: calc(100vh - 181px - 87px);
  }
  @media screen and (max-width: 544px) {
    height: calc(100vh - 181px - 79px);
  }*/
`;

const ScrollRibbon : FC<PropsWithChildren<TScrollRibbonProps>> = ({
  children,
}) => (
  <Ribbon>
    {children}
  </Ribbon>
);

export default ScrollRibbon;
