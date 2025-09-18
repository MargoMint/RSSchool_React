import validateFormData from './validateFormData';
import processFileToBase64 from './processFileToBase64';

async function handleUncontrolledFormSubmit(formData: FormData) {
  const { values, errors } = await validateFormData(formData);
  if (Object.keys(errors).length > 0) {
    return { values, errors };
  }

  const pict = values.picture;
  if (pict instanceof File) {
    values.picture = await processFileToBase64(pict);
  } else if (
    Array.isArray(pict) &&
    pict.length > 0 &&
    pict[0] instanceof File
  ) {
    values.picture = await processFileToBase64(pict[0]);
  }

  return { values, errors: {} };
}
export default handleUncontrolledFormSubmit;
