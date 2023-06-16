import { StackNavigationProp } from '@react-navigation/stack';
import {
  HomeStackParams,
  ProfileStackParams,
} from '../../navigators/TabNavigator';

export type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParams & HomeStackParams
>;
