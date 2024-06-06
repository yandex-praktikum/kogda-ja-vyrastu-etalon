import React, { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { useIntl } from 'react-intl';
import TextAreaField from './textarea-field-config';

interface IFieldInput {
  minHeight?: number,
  value: string,
  error?: boolean,
  placeholder?: string,
  errorText?: string,
  onBlur?: FocusEventHandler<HTMLTextAreaElement>,
  onFocus?: FocusEventHandler<HTMLTextAreaElement>,
  onChange: ChangeEventHandler<HTMLTextAreaElement>,
  disabled?: boolean,
}

export const FieldAboutArticle: FC<IFieldInput> = ({
  value,
  onBlur = undefined,
  onFocus = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  minHeight = 0,
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <TextAreaField
      placeholder={placeholder}
      name='FieldAboutArticle'
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      labelText={intl.messages.articleAbout as string}
      minHeight={minHeight}
      disabled={disabled}
      isHasBorder />
  );
};

FieldAboutArticle.defaultProps = {
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  error: false,
  errorText: '',
  minHeight: 0,
  disabled: false,
};

export const FieldAboutUser: FC<IFieldInput> = ({
  value,
  onBlur = undefined,
  onFocus = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  minHeight = 0,
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <TextAreaField
      placeholder={placeholder}
      name='FieldAboutArticle'
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      labelText={intl.messages.aboutUser as string}
      minHeight={minHeight}
      disabled={disabled}
      isHasBorder />
  );
};

FieldAboutUser.defaultProps = {
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  error: false,
  errorText: '',
  minHeight: 0,
  disabled: false,
};

export const FieldTextArticle: FC<IFieldInput> = ({
  value,
  onBlur = undefined,
  onFocus = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  minHeight = 0,
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <TextAreaField
      placeholder={placeholder}
      name='FieldTextArticle'
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      labelText={intl.messages.articleText as string}
      minHeight={minHeight}
      disabled={disabled}
      isHasBorder />
  );
};

FieldTextArticle.defaultProps = {
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  error: false,
  errorText: '',
  minHeight: 0,
  disabled: false,
};

export const FieldTextComment: FC<IFieldInput> = ({
  value,
  onBlur = undefined,
  onFocus = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  minHeight = 0,
  disabled = false,
}) => (
  <TextAreaField
    placeholder={placeholder}
    name='FieldTextComment'
    labelText=''
    errorText={errorText}
    error={error}
    onBlur={onBlur}
    onFocus={onFocus}
    value={value}
    onChange={onChange}
    minHeight={minHeight}
    disabled={disabled}
    isHasBorder={false} />
);

FieldTextComment.defaultProps = {
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  error: false,
  errorText: '',
  minHeight: 0,
  disabled: false,
};
