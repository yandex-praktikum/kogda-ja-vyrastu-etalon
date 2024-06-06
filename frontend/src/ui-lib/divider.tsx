import styled from 'styled-components';

import { dividerGray } from '../constants/colors';

import { TDividerProps } from '../types/styles.types';

const Divider = styled.hr<TDividerProps>`
  width: 100%;
  border-top: 1px solid ${dividerGray};
  padding: 0;
  margin: ${({ distance }) => (distance || 0)}px 0;
  box-sizing: border-box;
`;

export default Divider;
