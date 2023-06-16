import { StackNavigationProp } from '@react-navigation/stack';
import { SurveyStackParams, RootStackParams } from '../../navigators/HomeStack';
import { HomeStackParams, TabParams } from '../../navigators/TabNavigator';

export type StackParams = HomeStackParams;
export type SearchNavigationProp = StackNavigationProp<StackParams>;
