import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ItemStatistics } from '../../components/ItemStatistics';
import { Card, CircularProgressComponent } from '../../components';

import { Layout } from '../../components/Layout';
import { selectMealPlanPerDay } from '../../redux/slices/mealPlanSlice';
import { styles } from './MealPlan.style';
import { useMealPlanDetails } from '../../hooks/useMealPlanDetails';

export function MealPlanScreen() {
  const mealPlan = useSelector(selectMealPlanPerDay);

  const mealPlanDetails = useMealPlanDetails(mealPlan);

  return (
    <Layout paddingTop>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Text
          style={
            styles.title
          }>{`Calories: ${mealPlan.nutrients.calories}`}</Text>
        <Text
          style={
            styles.title
          }>{`Carbs: ${mealPlan.nutrients.carbohydrates}`}</Text>
        <Text style={styles.title}>{`Fat: ${mealPlan.nutrients.fat}`}</Text>
        <Text
          style={
            styles.title
          }>{`Proteins: ${mealPlan.nutrients.protein}`}</Text>
      </View>
      {mealPlanDetails.map(mealPlanDetail => (
        <View style={{ flex: 1, height: 200 }} key={mealPlanDetail?.id}>
          <Image
            source={{ uri: mealPlanDetail?.image }}
            style={{ height: 100, width: 100 }}
          />
        </View>
      ))}
    </Layout>
  );
}
