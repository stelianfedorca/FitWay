import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';
import { MealPlanItem } from '../../components/MealPlanItem/MealPlanItem';
import { useMealPlanDetails } from '../../hooks/useMealPlanDetails';
import {
  selectMealPlanPerDay,
  setMealPlan,
} from '../../redux/slices/mealPlanSlice';
import { selectUid } from '../../redux/slices/userSlice';
import {
  addMealPlanToFirestore,
  getMealPlan,
} from '../../services/mealplan.service';
import { MealPlanScreenNavigationProp } from './MealPlan.types';
import { Title } from './MealPlanScreen.style';

import { mappedTimeFrame } from './CustomizeMealPlanScreen';

export function MealPlanScreen() {
  const mealPlan = useSelector(selectMealPlanPerDay);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAddButton, setLoadingAddButton] = useState(false);
  const [loadingGenerateButton, setLoadingGenerateButton] = useState(false);
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();

  const mealPlanDetails = useMealPlanDetails(mealPlan);

  const navigation = useNavigation<MealPlanScreenNavigationProp>();

  useEffect(() => {
    mealPlanDetails && setIsLoading(false);
  }, [mealPlanDetails]);

  const goBack = () => {
    navigation.goBack();
  };

  const addMealPlan = async () => {
    setLoadingAddButton(true);
    const isAdded = await addMealPlanToFirestore(uid, mealPlan);
    if (isAdded) {
      navigation.goBack();
    }
    setLoadingAddButton(false);
  };

  const generateNewPlan = async () => {
    setLoadingGenerateButton(true);

    setIsLoading(true);
    const mealPlanData = await getMealPlan(mappedTimeFrame[0], 2222);

    if (mealPlanData) {
      setIsLoading(false);
      dispatch(
        setMealPlan({
          mealPlanPerDay: mealPlanData,
          selectedTargetCalories: 2222,
        }),
      );
    }
    setLoadingGenerateButton(false);
  };

  return (
    <Layout
      // paddingTop
      style={{
        marginTop: 50,
        paddingTop: 15,
        // backgroundColor: '#EDF1F9'
      }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingBottom: 20 }}>
          <Title style={{ alignSelf: 'center' }}>Meal plan for a day</Title>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -5,
            left: 15,
          }}
          onPress={goBack}>
          <Ionicons
            name="chevron-back"
            color="#16277b"
            size={30}
            style={{ position: 'absolute' }}
          />
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <MealPlanItem
            mealPlanDetails={mealPlanDetails}
            mealPlan={mealPlan}
            key={'3'}
            onAddPress={addMealPlan}
            isLoading={loadingAddButton}
            isGenerateButtonLoading={loadingGenerateButton}
            onGeneratePress={generateNewPlan}
          />
        )}
      </View>
    </Layout>
  );
}
