import { join } from 'lodash';

export const generateError = (error: any) => {
  console.log("error", error)
  if (error.errors) {
    return join(
      error.errors.map((it) => it?.ValidationErrorItem?.message || it?.message),
      '-',
    );
  }

  return error.original.message || error.message;
};
