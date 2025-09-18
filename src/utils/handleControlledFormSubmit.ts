import processFileToBase64 from './processFileToBase64';
import type { FormTypes } from '../components/Forms/FormTypes';

async function handleControlledFormSubmit(
  data: FormTypes
): Promise<Record<string, unknown>> {
  const values: Record<string, unknown> = {
    name: data.name,
    age: data.age,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    gender: data.gender,
    country: data.country,
    acceptTermsAndCondition: data.acceptTermsAndCondition,
  };

  const picture = data.picture;

  if (picture) {
    let fileToProcess: File | null = null;
    if (picture instanceof File) {
      fileToProcess = picture;
    } else if (typeof FileList !== 'undefined' && picture instanceof FileList) {
      if (picture.length > 0) fileToProcess = picture[0];
    } else if (
      Array.isArray(picture) &&
      picture.length > 0 &&
      picture[0] instanceof File
    ) {
      fileToProcess = picture[0];
    } else if (typeof picture === 'string') {
      values.picture = picture;
    }

    if (fileToProcess) {
      values.picture = await processFileToBase64(fileToProcess);
    }
  } else {
    values.picture = undefined;
  }

  return values;
}

export default handleControlledFormSubmit;
