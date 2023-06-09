import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { Divider, IconButton } from 'react-native-paper';
import { ProgressBar } from '../../components/ProgressBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MealPlanItem } from '../../components/MealPlanItem/MealPlanItem';

export function MealPlanScreen() {
  const mealPlan = useSelector(selectMealPlanPerDay);
  const [isLoading, setIsLoading] = useState(true);

  const mealPlanDetails = useMealPlanDetails(mealPlan);

  useEffect(() => {
    setIsLoading(false);
  }, [mealPlanDetails]);

  return (
    <Layout
      // paddingTop
      style={{
        marginTop: 50,
        paddingTop: 15,
        // backgroundColor: '#EDF1F9'
      }}>
      {/* <IconButton
        icon="check"
        containerColor="green"
        iconColor="white"
        size={44}
        style={{ position: 'absolute', bottom: 10, right: 30 }}
        onPress={() => console.log('icon')}
      /> */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 15,
        }}>
        <Ionicons name="chevron-back" color="#16277b" size={32} />
      </TouchableOpacity>
      <Title style={{ alignSelf: 'center' }}>Meal plan for a day</Title>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MealPlanItem
          mealPlanDetails={mealPlanDetails}
          mealPlan={mealPlan}
          key={'3'}
        />
      )}
    </Layout>
  );
}
