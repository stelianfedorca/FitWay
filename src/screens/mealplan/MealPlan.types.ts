import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/HomeStack';
import { MealPlanStackParams } from '../../navigators/TabNavigator';

export type MealPlanScreenNavigationProp = StackNavigationProp<
  MealPlanStackParams & RootStackParams
>;
