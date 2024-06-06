import { createGlobalStyle } from 'styled-components';

import AlegreyaSansRegularTtf from './AlegreyaSans/AlegreyaSans-Regular.ttf';
import AlegreyaSansMediumTtf from './AlegreyaSans/AlegreyaSans-Medium.ttf';

import AlegreyaRegularTtf from './Alegreya/Alegreya-Regular.ttf';

export const AlegreyaSansFonts = createGlobalStyle`
  @font-face {
    font-family: 'Alegreya Sans';
    src: local('Alegreya Sans'),
      url(${AlegreyaSansRegularTtf}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Alegreya Sans';
    src: local('Alegreya Sans'),
      url(${AlegreyaSansMediumTtf}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }
`;

export const AlegreyaFonts = createGlobalStyle`
  @font-face {
    font-family: 'Alegreya';
    src: local('Alegreya'),
      url(${AlegreyaRegularTtf}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }
`;
