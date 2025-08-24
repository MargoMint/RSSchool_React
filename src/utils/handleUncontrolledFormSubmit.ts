import validateFormData from './validateFormData';
import processFileToBase64 from './processFileToBase64';

async function handleUncontrolledFormSubmit(formData: FormData) {
  const { values, errors } = await validateFormData(formData);

  if (Object.keys(errors).length > 0) {
    return { values, errors };
  }

  if (values.picture instanceof File) {
    values.picture = await processFileToBase64(values.picture);
  }

  return { values, errors: {} };
}

export default handleUncontrolledFormSubmit;
