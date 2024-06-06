import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { getPropOnCondition } from '../../services/helpers';

export interface ITextFieldStyleProps {
  error: boolean;
  minHeight?: number;
}

export const TextFieldStyle = css<ITextFieldStyleProps>`
  box-sizing: border-box;
  width: 100%;
  padding: 8px 38px 8px 16px;
  position: relative;
  font-size: ${({ theme: { text18: { size } } }) => size}px ;
  font-family: ${({ theme: { text18: { family } } }) => family};
  line-height: ${({ theme: { text18: { height } } }) => height}px ;
  font-weight: ${({ theme: { text18: { weight } } }) => weight};
  outline:none;
  color: ${({ theme: { secondaryText } }) => secondaryText};
  border: 1px solid ${({ error, theme: { inputField: { defaultBorder, errorColor } } }) => (getPropOnCondition(error, defaultBorder, errorColor))};

  @media screen and (max-width:768px) {
  font-size: 16px;
  }
  :hover {
  border: 1px solid ${({ error, theme: { inputField: { borderHover, errorColor } } }) => getPropOnCondition(error, borderHover, errorColor)};
  }
  :disabled {
  background-color: ${(({ theme: { inputField: { disabledInput } } }) => disabledInput)};
  }
  :active {
  border: 1px solid ${({ error, theme: { inputField: { borderActive, errorColor } } }) => getPropOnCondition(error, borderActive, errorColor)};
  }
`;

export const LabelStyle = styled.label`
  width: 100%;
  margin: 0;
  color:${((props) => props.theme.labelColor)};
  font-size: ${({ theme: { labelInput: { size } } }) => `${size}px`} ;
  font-family: ${({ theme: { labelInput: { family } } }) => family};
  line-height: ${({ theme: { labelInput: { height } } }) => `${height}px`} ;
  font-weight: ${({ theme: { labelInput: { weight } } }) => weight};
`;

const ErrorTextStyle = styled.span`
margin: 0;
color: ${((props) => props.theme.inputField.errorColor)};
font-size: ${({ theme: { labelInput: { size } } }) => `${size}px`} ;
font-family: ${({ theme: { labelInput: { family } } }) => family};
line-height: ${({ theme: { labelInput: { height } } }) => `${height}px`} ;
font-weight: ${({ theme: { labelInput: { weight } } }) => weight};
`;

type TErrorText = {
  errorText: string
};

export const ErrorText : FC<TErrorText> = ({ errorText }: TErrorText) => (
  <ErrorTextStyle>{errorText}</ErrorTextStyle>
);
