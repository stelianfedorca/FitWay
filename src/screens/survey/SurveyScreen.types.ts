import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams, SurveyStackParams } from '../../navigators/HomeStack';
import { TabParams } from '../../navigators/TabNavigator';

export type SurveyForm = {
  age: number;
  height: number;
  weight: number;
};

export type StackParams = RootStackParams & SurveyStackParams & TabParams;

export type SurveyScreenNavigationProp = StackNavigationProp<StackParams>;
