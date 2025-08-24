import * as yup from 'yup';
import formValidationSchema from './formValidationSchema';

export type FormErrors = Record<string, string | undefined>;

async function validateFormData(formData: FormData): Promise<{
  values: Record<string, unknown>;
  errors: FormErrors;
}> {
  const values: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    if (key === 'acceptTermsAndCondition') {
      values[key] = value === 'on';
    } else {
      values[key] = value;
    }
  });

  if (values.picture instanceof File && values.picture.size === 0) {
    values.picture = undefined;
  }

  try {
    await formValidationSchema.validate(values, { abortEarly: false });
    return { values, errors: {} };
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: FormErrors = {};

    if (yupError.inner) {
      yupError.inner.forEach((error) => {
        if (error.path && !errors[error.path]) {
          errors[error.path] = error.message;
        }
      });
    } else if (yupError.path) {
      errors[yupError.path] = yupError.message;
    }

    return { values, errors };
  }
}

export default validateFormData;
