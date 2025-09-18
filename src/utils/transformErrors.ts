import type { FieldErrors, FieldError } from 'react-hook-form';
import type { FormErrors } from './validateFormData';
import type { FormTypes } from '../components/Forms/FormTypes';

function isFieldError(error: unknown): error is FieldError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

function transformErrors(errors: FieldErrors<FormTypes>): FormErrors {
  const result: FormErrors = {};

  Object.entries(errors).forEach(([key, error]) => {
    if (isFieldError(error) && error.message) {
      result[key] = error.message.toString();
    }
  });

  return result;
}

export default transformErrors;
