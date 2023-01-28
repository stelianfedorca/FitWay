import * as yup from 'yup';

export const SignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(50, 'Maximum of 50 characters')
    .required('Enter your name to continue'),
  email: yup
    .string()
    .email('That doesn’t look like an email address')
    .required('Enter your email to continue'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Enter your password to continue'),
});
