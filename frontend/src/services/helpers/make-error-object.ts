import { AxiosError, AxiosResponse } from 'axios';
import { TAPIError } from '../api.types';

const makeErrorObject = (error: AxiosError<TAPIError>) : TAPIError => {
  const { data: { errors } } = error.response as AxiosResponse<TAPIError>;
  let res: TAPIError = { errors: {}, statusCode: error.response?.status || 0 };
  if (errors) {
    res = { ...res, errors };
  } else if (!errors && !error.response && !!error.request && error.isAxiosError) {
    res = { ...res, errors: { Network: 'experiencing connection or CORS problem(s)' } };
  } else {
    res = { ...res, errors: { General: 'error of unknown nature :(' } };
  }
  return res;
};

export default makeErrorObject;
