import processFileToBase64 from './processFileToBase64';
import type { StoredFormData } from '../components/Forms/formTypes';

export default async function normalizeFormValues(
  values: Record<string, unknown>
): Promise<StoredFormData> {
  const copy: Record<string, unknown> = { ...values };

  if (copy.age !== undefined && copy.age !== null) {
    const n = Number(copy.age);
    copy.age = Number.isFinite(n) ? n : 0;
  }

  if (copy.picture) {
    const pict = copy.picture as unknown;
    if (pict instanceof FileList && pict.length > 0) {
      const file = pict[0];
      try {
        const base64 = await processFileToBase64(file);
        copy.picture = base64;
      } catch {
        delete copy.picture;
      }
    } else if (typeof pict === 'string') {
      copy.picture = pict;
    } else {
      delete copy.picture;
    }
  }

  if (copy.acceptTermsAndCondition !== undefined) {
    const v = copy.acceptTermsAndCondition;
    copy.acceptTermsAndCondition = Boolean(
      v === true || v === 'true' || v === 'on' || v === '1'
    );
  } else {
    copy.acceptTermsAndCondition = false;
  }

  delete copy.confirmPassword;

  const result: StoredFormData = {
    name: String(copy.name || '').trim(),
    age: typeof copy.age === 'number' ? copy.age : Number(copy.age) || 0,
    email: String(copy.email || '').trim(),
    password: String(copy.password || '').trim(),
    gender: String(copy.gender || '').trim(),
    country: String(copy.country || '').trim(),
    acceptTermsAndCondition: Boolean(copy.acceptTermsAndCondition),
    picture: typeof copy.picture === 'string' ? copy.picture : undefined,
  };

  return result;
}
