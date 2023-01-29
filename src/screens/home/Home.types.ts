import { StackNavigationProp } from '@react-navigation/stack';
import { SurveyStackParams, RootStackParams } from '../../navigators/HomeStack';
import { HomeStackParams, TabParams } from '../../navigators/TabNavigator';

export type StackParams = TabParams &
  HomeStackParams &
  SurveyStackParams &
  RootStackParams;
export type HomeNavigationProp = StackNavigationProp<StackParams>;
