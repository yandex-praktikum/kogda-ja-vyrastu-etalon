import styled, { css } from 'styled-components';
import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import {
  TextFieldStyle, LabelStyle, ErrorText, ITextFieldStyleProps,
} from './text-fields-styles';

interface ITextAreaStyleProps extends ITextFieldStyleProps {

  isHasBorder: boolean;
}

const TextAreaStyle = styled.textarea<ITextAreaStyleProps>`
  ${TextFieldStyle}
  resize: none;
  min-height: ${({ minHeight }) => minHeight ?? 0}px;
  ${({ isHasBorder }) => !isHasBorder && css`border: 0;`};
`;

const ContainerTextArea = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  @media screen and (max-width:768px) {
    font-size: 16px;
  }
`;

interface ITextAreaInterface extends ITextAreaStyleProps {
  placeholder: string;
  value: string;
  name: string;
  errorText: string;
  disabled: boolean;
  labelText: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  onBlur: FocusEventHandler<HTMLTextAreaElement> | undefined;
  onFocus: FocusEventHandler<HTMLTextAreaElement> | undefined;

}

const TextAreaField = ({
  placeholder, value, name, error, errorText, onChange, onBlur, onFocus,
  disabled, labelText, minHeight, isHasBorder,
}: ITextAreaInterface) => (
  <ContainerTextArea>
    <LabelStyle>
      {labelText}
      <TextAreaStyle
        disabled={disabled}
        error={error}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        minHeight={minHeight}
        rows={1}
        isHasBorder={isHasBorder ?? true} />
    </LabelStyle>
    {error && <ErrorText errorText={errorText} />}
  </ContainerTextArea>
);

export default TextAreaField;
