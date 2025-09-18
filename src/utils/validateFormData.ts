import * as yup from 'yup';
import formValidationSchema from './formValidationSchema';
export type FormErrors = Record<string, string | undefined>;
import normalizePictureValue from './normalizePictureValue';

function isYupValidationError(error: unknown): error is yup.ValidationError {
  return (
    error instanceof Error &&
    'inner' in error &&
    'path' in error &&
    'message' in error
  );
}

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

  values.picture = normalizePictureValue(values.picture);

  try {
    await formValidationSchema.validate(values, { abortEarly: false });
    return { values, errors: {} };
  } catch (err) {
    const errors: FormErrors = {};

    if (isYupValidationError(err)) {
      if (err.inner && err.inner.length > 0) {
        err.inner.forEach((innerError) => {
          if (innerError.path && !errors[innerError.path]) {
            errors[innerError.path] = innerError.message;
          }
        });
      } else if (err.path) {
        errors[err.path] = err.message;
      }
    }

    return { values, errors };
  }
}

export default validateFormData;
