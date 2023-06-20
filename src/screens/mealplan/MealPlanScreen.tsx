import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';
import { MealPlanItem } from '../../components/MealPlanItem/MealPlanItem';
import { useMealPlanDetails } from '../../hooks/useMealPlanDetails';
import {
  MealPlanDetails,
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
import Toast from 'react-native-toast-message';
import { Routes } from '../../navigators';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MealPlanStackParams } from '../../navigators/TabNavigator';
import { selectTdee } from '../../redux/slices/profileSlice';

interface MealPlanScreenProps
  extends NativeStackScreenProps<MealPlanStackParams, Routes.MealPlan> {
  // other props ...
}

export function MealPlanScreen({ route }: MealPlanScreenProps) {
  const params = route.params;
  const caloricTarget = params?.caloricTarget;

  const mealPlan = useSelector(selectMealPlanPerDay);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewLoading, setIsNewLoading] = useState(false);
  const [loadingAddButton, setLoadingAddButton] = useState(false);
  const [loadingGenerateButton, setLoadingGenerateButton] = useState(false);
  const tdee = useSelector(selectTdee);
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();

  const mealPlanDetails = useMealPlanDetails(mealPlan);

  const navigation = useNavigation<MealPlanScreenNavigationProp>();

  useEffect(() => {
    if (mealPlanDetails.length > 0) {
      setIsLoading(false);
    }
  }, [mealPlanDetails]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleItemPress = (item: MealPlanDetails) => {
    navigation.navigate(Routes.MealDetails, { item: item, saved: false });
  };

  const addMealPlan = async () => {
    setLoadingAddButton(true);
    const isAdded = await addMealPlanToFirestore(uid, mealPlan);
    if (isAdded) {
      Toast.show({
        type: 'success',
        text1: 'Plan added',
        position: 'bottom',
      });
      // navigation.goBack();
    }
    setLoadingAddButton(false);
  };

  const generateNewPlan = async () => {
    setIsNewLoading(true);
    // setLoadingGenerateButton(true);

    const mealPlanData = await getMealPlan(
      mappedTimeFrame[0],
      caloricTarget ?? tdee,
    );

    if (mealPlanData) {
      dispatch(
        setMealPlan({
          mealPlanPerDay: mealPlanData,
          selectedTargetCalories: 2222,
        }),
      );
      setTimeout(() => {
        setIsNewLoading(false);
      }, 1000);
    }
    // setLoadingGenerateButton(false);
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 10,
            paddingTop: 15,
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 8,
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
            onPress={generateNewPlan}>
            {loadingGenerateButton ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: 'white', fontWeight: '500' }}>
                Generate new plan
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 15,
              backgroundColor: '#4659b8',
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
            onPress={addMealPlan}>
            {loadingAddButton ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: 'white', fontWeight: '500' }}>
                Add plan
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {isLoading || isNewLoading ? (
          <ActivityIndicator
            size="large"
            style={{ position: 'absolute', bottom: 300, right: 170 }}
          />
        ) : (
          <ScrollView>
            <MealPlanItem
              mealPlanDetails={mealPlanDetails}
              mealPlan={mealPlan}
              key={'3'}
              onAddPress={addMealPlan}
              isLoading={loadingAddButton}
              isGenerateButtonLoading={loadingGenerateButton}
              onGeneratePress={generateNewPlan}
              onItemPress={handleItemPress}
            />
          </ScrollView>
        )}
        <Toast />
      </View>
    </Layout>
  );
}
