import {
  View,
  ScrollView,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MealPlanDay, MealPlanDetails } from '../../redux/slices/mealPlanSlice';
import { Card } from '../Card';
import { Badge } from '../Badge';
export type MealPlanItemProps = {
  mealPlan: MealPlanDay;
  mealPlanDetails: (MealPlanDetails | null)[];
  isLoading: boolean;
  onAddPress?: () => void;
  style?: StyleProp<ViewStyle>;
};
export function MealPlanItem({
  mealPlan,
  mealPlanDetails,
  isLoading,
  onAddPress,
  style,
}: MealPlanItemProps) {
  return (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: 20,
          borderRadius: 15,
          backgroundColor: 'white',
        },
        style,
      ]}>
      <View
        style={{
          marginBottom: 10,
          justifyContent: 'space-between',
          marginTop: 30,
          // flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Badge color="#3db9d5">
            <Text style={{ fontWeight: '600' }}>
              {Math.round(mealPlan.nutrients.carbohydrates)} g
            </Text>
            <Text style={{ color: '#3e3e3e' }}>Carbs</Text>
          </Badge>
          <Badge color="#4a62d8">
            <Text style={{ fontWeight: '600' }}>
              {Math.round(mealPlan.nutrients.fat)} g
            </Text>
            <Text style={{ color: '#3e3e3e' }}>Fat</Text>
          </Badge>
          <Badge color="#d38723">
            <Text style={{ fontWeight: '600' }}>
              {Math.round(mealPlan.nutrients.protein)} g
            </Text>
            <Text style={{ color: '#3e3e3e' }}>Protein</Text>
          </Badge>
        </View>
        <Badge color="black">
          <Text style={{ fontWeight: '600' }}>
            {Math.round(mealPlan.nutrients.calories)} kcal
          </Text>
          <Text>Calories</Text>
        </Badge>
      </View>
      <ScrollView
        style={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {mealPlanDetails.map(mealPlanDetail => (
          <Card data={mealPlanDetail} key={mealPlanDetail?.id} />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 15,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: 'black',
            shadowRadius: 2,
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.4,
          }}
          onPress={onAddPress}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: 'white', fontWeight: '500' }}>Add plan</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
