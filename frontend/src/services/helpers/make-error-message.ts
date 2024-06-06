import { AxiosError, AxiosResponse } from 'axios';
import { TAPIError } from '../api.types';

const makeErrorMessage = (error: AxiosError<TAPIError>) : string => {
  const { data: { errors } } = error.response as AxiosResponse<TAPIError>;
  let msg = '';

  if (errors) {
    Object.keys(errors).forEach((key, index) => {
      msg += `${key}  ${errors[key]}${index === Object.keys(errors).length - 1 ? '.' : ', '}`;
    });
  } else if (!errors && !error.response && !!error.request && error.isAxiosError) {
    msg = 'Ошибка сетевого взаимодействия!';
  } else {
    const { message = 'Произошла неизвестная ошибка!' } = error;
    msg = message;
  }
  return msg;
};

export default makeErrorMessage;
