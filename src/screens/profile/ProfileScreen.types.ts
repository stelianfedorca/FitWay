import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/HomeStack';
import {
  HomeStackParams,
  ProfileStackParams,
} from '../../navigators/TabNavigator';

export type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParams & RootStackParams
>;
