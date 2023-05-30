import { useEffect, useMemo } from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ItemStatistics } from '../../components/ItemStatistics';
import {
  Card,
  CircularProgressComponent,
  GenericList,
  Badge,
} from '../../components';
import { Layout } from '../../components/Layout';
import {
  MealPlanDetails,
  selectMealPlanPerDay,
} from '../../redux/slices/mealPlanSlice';
import { styles, Title } from './MealPlanScreen.style';
import { useMealPlanDetails } from '../../hooks/useMealPlanDetails';
import { Divider } from 'react-native-paper';
import { ProgressBar } from '../../components/ProgressBar';

export function MealPlanScreen() {
  const mealPlan = useSelector(selectMealPlanPerDay);

  const mealPlanDetails = useMealPlanDetails(mealPlan);

  return (
    <Layout paddingTop style={{ paddingTop: 15 }}>
      <Title style={{ alignSelf: 'center' }}>Meal plan for a day</Title>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            paddingHorizontal: 15,
            marginBottom: 20,
            justifyContent: 'space-between',
            marginTop: 25,
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
                {mealPlan.nutrients.carbohydrates} g
              </Text>
              <Text style={{ color: '#3e3e3e' }}>Carbs</Text>
            </Badge>
            <Badge color="#4a62d8">
              <Text style={{ fontWeight: '600' }}>
                {mealPlan.nutrients.fat} g
              </Text>
              <Text style={{ color: '#3e3e3e' }}>Fat</Text>
            </Badge>
            <Badge color="#d38723">
              <Text style={{ fontWeight: '600' }}>
                {mealPlan.nutrients.protein} g
              </Text>
              <Text style={{ color: '#3e3e3e' }}>Protein</Text>
            </Badge>
          </View>
          <Badge color="black">
            <Text style={{ fontWeight: '600' }}>
              {mealPlan.nutrients.calories} kcal
            </Text>
            <Text>Calories</Text>
          </Badge>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {mealPlanDetails.map(mealPlanDetail => (
            <>
              <Card data={mealPlanDetail} key={mealPlanDetail?.id} />
              <Divider key={mealPlanDetail?.id} />
            </>
          ))}
        </ScrollView>
        {/* <GenericList data={mealPlanDetails} /> */}
      </View>
    </Layout>
  );
}
