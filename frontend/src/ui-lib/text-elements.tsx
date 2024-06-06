import styled from 'styled-components';

import { THeaderTextProps, TTextProps } from '../types/styles.types';

import {
  defaultFontSizes,
  defaultH1,
  defaultH2,
  defaultH3,
  defaultH4,
  defaultH5,
  defaultH1Mobile,
  defaultH2Mobile,
  defaultH3Mobile,
  defaultH4Mobile,
  defaultH5Mobile,
} from '../constants/fontsconfigs';

import { tabletBreakpoint } from '../constants';
import { getLinesClamp, getOptionalProp } from '../services/helpers';

export const HeaderOneText = styled.h1<THeaderTextProps>`
   font-family: ${defaultH1.family};
   font-size: ${defaultH1.size}px;
  font-weight: ${defaultH1.weight};
  line-height: ${defaultH1.height}px;
  margin-bottom: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => (lines || 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  color: ${({ color }) => (color || 'inherit')};
  ${({ marginCSS }) => (marginCSS || '')};
  ${({ paddingCSS }) => (paddingCSS || '')};
  
  @media screen and (max-width: ${tabletBreakpoint}) {
    font-family: ${defaultH1Mobile.family};
    font-size: ${defaultH1Mobile.size}px;
    font-weight: ${defaultH1Mobile.weight};
    line-height: ${defaultH1Mobile.height}px;
}
`;

export const HeaderTwoText = styled.h2<THeaderTextProps>`
   font-family: ${defaultH2.family};
   font-size: ${defaultH2.size}px;
  font-weight: ${defaultH2.weight};
  line-height: ${defaultH2.height}px;
  margin-bottom: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => (lines || 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${({ color }) => (color || 'inherit')};
  ${({ marginCSS }) => (marginCSS || '')};
  ${({ paddingCSS }) => (paddingCSS || '')};
  
  @media screen and (max-width: ${tabletBreakpoint}px) {
    font-family: ${defaultH2Mobile.family};
    font-size: ${defaultH2Mobile.size}px;
    font-weight: ${defaultH2Mobile.weight};
    line-height: ${defaultH2Mobile.height}px;
  }
`;

export const HeaderThreeText = styled.h3<THeaderTextProps>`
  font-family: ${defaultH3.family};
  font-size: ${defaultH3.size}px;
  font-weight: ${defaultH3.weight};
  line-height: ${defaultH3.height}px;
  margin-bottom: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => (lines || 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${({ color }) => (color || 'inherit')};
  ${({ marginCSS }) => (marginCSS || '')};
  ${({ paddingCSS }) => (paddingCSS || '')};

  @media screen and (max-width: ${tabletBreakpoint}px) {
    font-family: ${defaultH3Mobile.family};
    font-size: ${defaultH3Mobile.size}px;
    font-weight: ${defaultH3Mobile.weight};
    line-height: ${defaultH3Mobile.height}px;
  }
`;

export const HeaderFourText = styled.h4<THeaderTextProps>`
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-family: ${defaultH4.family};
  font-size: ${defaultH4.size}px;
  font-weight: ${defaultH4.weight};
  line-height: ${defaultH4.height}px;
  margin-bottom: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => (lines || 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ color }) => (color || 'inherit')};
  ${({ marginCSS }) => (marginCSS || 'margin: 0;')};
  ${({ paddingCSS }) => (paddingCSS || 'padding: 0;')};
  
  @media screen and (max-width: ${tabletBreakpoint}px) {
    font-family: ${defaultH4Mobile.family};
    font-size: ${defaultH4Mobile.size}px;
    font-weight: ${defaultH4Mobile.weight};
    line-height: ${defaultH4Mobile.height}px;
  }
`;

export const HeaderFiveText = styled.h5<THeaderTextProps>`
   font-family: ${defaultH5.family};
   font-size: ${defaultH5.size}px;
  font-weight: ${defaultH5.weight};
  line-height: ${defaultH5.height}px;
  color: ${({ color }) => (color || 'inherit')};
  margin-bottom: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => (lines || 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${({ marginCSS }) => (marginCSS || '')};
  ${({ paddingCSS }) => (paddingCSS || '')};
  
  @media screen and (max-width: ${tabletBreakpoint}px) {
    font-family: ${defaultH5Mobile.family};
    font-size: ${defaultH5Mobile.size}px;
    font-weight: ${defaultH5Mobile.weight};
    line-height: ${defaultH5Mobile.height}px;
  }
`;

export const RegularText = styled.p<TTextProps>`
  font-family: ${({ sansSerif }) => (sansSerif ? 'Alegreya Sans' : 'Alegreya')};
  font-size: ${({ size }) => defaultFontSizes[size].size}px;
  font-weight: ${({ weight }) => (weight || 400)};
  line-height: ${({ size }) => defaultFontSizes[size].height}px;
  color: ${({ color }) => (color || 'inherit')};
  text-overflow: ellipsis;
  margin-bottom: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  ${({ align }) => getOptionalProp('text-align', align)};
  ${({
    clampLines,
    heightLimit,
    size,
  }) => ((clampLines && heightLimit)
    ? getLinesClamp(heightLimit, defaultFontSizes[size].height)
    : '')};
  ${({ marginCSS }) => (marginCSS || '')};
  ${({ paddingCSS }) => (paddingCSS || '')};
`;
