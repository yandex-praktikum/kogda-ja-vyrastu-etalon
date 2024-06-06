/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';

import { TTheme } from './styles.types';

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {}
}
