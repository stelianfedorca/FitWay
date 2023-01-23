import { StackNavigationProp } from '@react-navigation/stack';
import { SurveyStackParams } from '../../navigators/HomeStack';
import { HomeStackParams, TabParams } from '../../navigators/TabNavigator';

export type StackParams = TabParams & HomeStackParams & SurveyStackParams;
export type HomeNavigationProp = StackNavigationProp<StackParams>;
