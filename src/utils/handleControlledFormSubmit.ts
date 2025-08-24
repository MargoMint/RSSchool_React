import processFileToBase64 from './processFileToBase64';
import type { FormTypes } from '../components/Forms/formTypes';

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

  if (data.picture && data.picture.length > 0) {
    const file = data.picture[0];
    values.picture = await processFileToBase64(file);
  } else {
    values.picture = undefined;
  }

  return values;
}

export default handleControlledFormSubmit;
