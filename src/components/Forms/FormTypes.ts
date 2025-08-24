export interface FormTypes {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: FileList;
  acceptTermsAndCondition: boolean;
}

export interface StoredFormData
  extends Omit<FormTypes, 'picture' | 'confirmPassword'> {
  picture?: string;
}

export interface FormsState {
  submissions: StoredFormData[];
}
