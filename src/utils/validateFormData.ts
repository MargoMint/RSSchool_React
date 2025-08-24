import * as yup from 'yup';
import formValidationSchema from './formValidationSchema';
export type FormErrors = Record<string, string | undefined>;

function normalizePictureValue(value: unknown): unknown {
  if (!value) return undefined;
  if (value instanceof File) {
    if (value.size === 0) return undefined;
    return value;
  }
  if (typeof FileList !== 'undefined' && value instanceof FileList) {
    if (value.length === 0) return undefined;
    return Array.from(value);
  }
  if (Array.isArray(value)) {
    const first = value[0];
    if (first instanceof File) return value;
    return undefined;
  }
  return undefined;
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
    const yupError = err as yup.ValidationError;
    const errors: FormErrors = {};

    if (yupError.inner && yupError.inner.length > 0) {
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
