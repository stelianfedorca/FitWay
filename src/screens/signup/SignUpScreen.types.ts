import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams } from '../../navigators/AuthStack';

export type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParams>;

export type SignUpForm = {
  firstName: string;
  email: string;
  password: string;
};
