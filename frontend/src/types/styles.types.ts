import {
  ChangeEventHandler, FocusEventHandler, MouseEventHandler,
} from 'react';

export type TColorSet = {
  default: string;
  hover: string;
  active: string;
  disabled: string;
  font: string;
};

export type TTheme = {
  primaryText: string,
  secondaryText: string,
  markedText: string,
  dividerColor: string,
  bgPrimary: string,
  bgHoverUserMenu: string,
  bgActiveUserMenu: string,
  labelColor: string,
  // headerNofound:string,
  modalCaption: string,
  modalText: string,
  inputField: {
    defaultBorder: string;
    borderHover: string;
    borderActive: string;
    disabledInput: string;
    errorColor: string;
  },
  button: {
    [key: string]: TColorSet,
  },
  buttonText: TFontProperties,
  firstLevelHeading: TFontProperties,
  secondLevelHeading: TFontProperties,
  thirdLevelHeading: TFontProperties,
  fourthLevelHeading: TFontProperties,
  fifthLevelHeading: TFontProperties,
  firstLevelHeadingMobile: TFontProperties,
  secondLevelHeadingMobile: TFontProperties,
  thirdLevelHeadingMobile: TFontProperties,
  fourthLevelHeadingMobile: TFontProperties,
  fifthLevelHeadingMobile: TFontProperties,
  labelInput: TFontProperties,
  text18Sans: TFontProperties,
  text16Sans: TFontProperties,
  text12Sans: TFontProperties,
  text18: TFontProperties,
  text16: TFontProperties,
  text118Sans: TFontProperties,
  text102Sans: TFontProperties,
  text86Sans: TFontProperties,
  text40Sans: TFontProperties,
  text26SubSans: TFontProperties,
  text18SubSans: TFontProperties,
  text16SubSans: TFontProperties,
  footerText: TFontProperties,
};

export type TThemes = {
  [key: string]: TTheme;
};

export type TFontProperties = {
  family: string;
  size: number;
  height: number;
  weight: number;
};

export type TButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export type TAvatarSizes = 'large' | 'small';

export type TAvatarIconProps = {
  size: TAvatarSizes;
  name: string;
  image: string | null;
  distance?: number;
  color?: string;
} | {
  size: TAvatarSizes;
  name: string;
  image?: string;
  distance?: number;
  color: string;
};

export type TAvatarButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  name: string;
  image: string;
};

export type TIconProps = {
  color: string;
  distance?: number;
};

export type THeaderTextProps = {
  color?: string;
  marginCSS?: string;
  paddingCSS?: string;
  lines?: number;
};

export type TTextProps = {
  size: TFontSizeTypes,
  weight: number,
  sansSerif?: boolean,
  color?: string,
  marginCSS?: string;
  paddingCSS?: string;
  clampLines?: boolean;
  heightLimit?: number;
  align?: string;
};

export type TFontSizeTypes = 'small' | 'medium' | 'large';

export type TFontSizeProps = {
  size: number,
  height: number,
};

export type TDefaultFontSizes = {
  [key in TFontSizeTypes]: TFontSizeProps;
};

export type TDividerProps = {
  distance: number;
};

export type TInputFieldType = 'text' | 'email' | 'password' | 'url';

export type TFieldInput = {
  value: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  errorText?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
