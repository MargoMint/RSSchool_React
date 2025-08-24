import * as yup from 'yup';
import extractFirstFile from './extractFirstFile';

const MAX_BYTES = 20 * 1024 * 1024;

const formValidationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age should not have a negative value')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password must contain at least 4 characters')
    .matches(
      /(?=.*[a-z])/,
      'Password must contain at least one lowercase letter'
    )
    .matches(
      /(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter'
    )
    .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
    .matches(
      /(?=.*[!@#$%^&*])/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Matching passwords is required'),
  gender: yup.string().required('Gender is required'),
  acceptTermsAndCondition: yup
    .boolean()
    .oneOf([true], 'Terms and Conditions must be accepted')
    .required('Terms and Conditions are required'),
  picture: yup
    .mixed()
    .required('Picture is required')
    .test('fileSize', 'The file is too large (max 20 MB)', (value) => {
      const file = extractFirstFile(value);
      if (!file) return false;
      return file.size <= MAX_BYTES;
    })
    .test(
      'fileFormat',
      'Unsupported file format. Only .jpeg and .png are allowed',
      (value) => {
        const file = extractFirstFile(value);
        if (!file) return false;
        return ['image/jpeg', 'image/png'].includes(file.type);
      }
    ),
  country: yup.string().required('Country is required'),
});

export default formValidationSchema;
