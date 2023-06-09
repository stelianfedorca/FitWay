import { View, ScrollView, Text } from 'react-native';
import { MealPlanDay, MealPlanDetails } from '../../redux/slices/mealPlanSlice';
import { Card } from '../Card';
import { Badge } from '../Badge';
export type MealPlanItemProps = {
  mealPlan: MealPlanDay;
  mealPlanDetails: (MealPlanDetails | null)[];
};
export function MealPlanItem({ mealPlan, mealPlanDetails }: MealPlanItemProps) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View
        style={{
          marginBottom: 20,
          justifyContent: 'space-between',
          marginTop: 30,
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
      <ScrollView style={{ flex: 1 }} bounces={false}>
        {mealPlanDetails.map(mealPlanDetail => (
          <Card data={mealPlanDetail} key={mealPlanDetail?.id} />
        ))}
      </ScrollView>
    </View>
  );
}
