export interface FormTypes {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: File | FileList | File[] | string | undefined;
  acceptTermsAndCondition: boolean;
}

export interface StoredFormData
  extends Omit<FormTypes, 'picture' | 'confirmPassword'> {
  picture?: string;
}

export interface FormsState {
  submissions: StoredFormData[];
}
