import processFileToBase64 from './processFileToBase64';
import type { StoredFormData } from '../components/Forms/FormTypes';
import normalizePictureValue from './normalizePictureValue';

export default async function normalizeFormValues(
  values: Record<string, unknown>
): Promise<StoredFormData> {
  const copy: Record<string, unknown> = { ...values };

  if (copy.age != null) {
    const numericValue = +copy.age;
    copy.age = Number.isFinite(numericValue) ? numericValue : 0;
  }

  const normalizedPicture = normalizePictureValue(copy.picture);
  if (normalizedPicture instanceof File) {
    try {
      copy.picture = await processFileToBase64(normalizedPicture);
    } catch {
      delete copy.picture;
    }
  } else if (
    Array.isArray(normalizedPicture) &&
    normalizedPicture[0] instanceof File
  ) {
    try {
      copy.picture = await processFileToBase64(normalizedPicture[0]);
    } catch {
      delete copy.picture;
    }
  } else if (typeof normalizedPicture === 'string') {
    copy.picture = normalizedPicture;
  } else {
    delete copy.picture;
  }

  copy.acceptTermsAndCondition = Boolean(
    copy.acceptTermsAndCondition === true ||
      copy.acceptTermsAndCondition === 'true' ||
      copy.acceptTermsAndCondition === 'on' ||
      copy.acceptTermsAndCondition === '1'
  );

  delete copy.confirmPassword;

  const result: StoredFormData = {
    name: (copy.name?.toString() ?? '').trim(),
    age: +(copy.age ?? 0) || 0,
    email: (copy.email?.toString() ?? '').trim(),
    password: (copy.password?.toString() ?? '').trim(),
    gender: (copy.gender?.toString() ?? '').trim(),
    country: (copy.country?.toString() ?? '').trim(),
    acceptTermsAndCondition: !!copy.acceptTermsAndCondition,
    picture: typeof copy.picture === 'string' ? copy.picture : undefined,
  };

  return result;
}
