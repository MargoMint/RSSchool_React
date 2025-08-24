import type { FieldErrors, FieldError } from 'react-hook-form';
import type { FormErrors } from './validateFormData';
import type { FormTypes } from '../components/Forms/formTypes';

function transformErrors(errors: FieldErrors<FormTypes>): FormErrors {
  const result: FormErrors = {};
  for (const key in errors) {
    const fieldKey = key as keyof FieldErrors<FormTypes>;
    const err = errors[fieldKey] as FieldError | undefined;
    if (err?.message) {
      result[key] = err.message.toString();
    }
  }
  return result;
}

export default transformErrors;
