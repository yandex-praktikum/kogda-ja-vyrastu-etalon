import { MouseEventHandler } from 'react';

export type TFontProperties = {
  family: string;
  size: number;
  height: number;
  weight: number;
};

export type TColorSet = {
  defaultColor: string;
  hoverColor: string;
  activeColor: string;
  disabledColor: string;
};

export type TButtonStyle = {
  defaultColor: string;
  hoverColor: string;
  activeColor: string;
  disabledColor: string;
  fontColor: string;
  fontProperties: TFontProperties;
};

export type TButtonTextStyle = {
  paddingLeft: number;
};

export type TButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};
