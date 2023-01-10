import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email('That doesn’t look like an email address')
    .required('Enter your email to continue'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Enter your password to continue'),
});
