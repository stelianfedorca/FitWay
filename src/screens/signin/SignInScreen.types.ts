import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParams} from '../../navigators/AuthStack';

export type SignInScreenNavigationProp = StackNavigationProp<AuthStackParams>;

export type SignInForm = {
  email: string;
  password: string;
};
