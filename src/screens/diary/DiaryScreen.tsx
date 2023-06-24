import { format } from 'date-fns';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Calendar } from '../../components/Calendar/Calendar';
import { CellDropdown } from '../../components/CellDropdown/CellDropdown';
import { Layout } from '../../components/Layout';
import { selectDiaryFood } from '../../redux/slices/diarySlice';
import { Container } from './DiaryScreen.style';

import { useNavigation } from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Routes } from '../../navigators';
import {
  calculateCalories,
  calculateCaloriesByServing,
  calculateMacronutrientsByServing,
} from '../../utils/calculator';
import { DiaryScreenNavigationProp } from './DiaryScreen.types';
import { FoodFirestore } from '../../types/types';
import {
  updateCaloriesIntake,
  updateMacrosIntake,
} from '../../services/user.service';
import { selectUid } from '../../redux/slices/userSlice';
import {
  selectCaloricIntake,
  selectMacrosIntake,
} from '../../redux/slices/profileSlice';
import { deleteFoodFromDiary } from '../../services/food.service';
import { selectCurrentDate } from '../../redux/slices/dateSlice';
import Toast, {
  SuccessToast,
  BaseToast,
  BaseToastProps,
} from 'react-native-toast-message';

export function DiaryScreen() {
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const diaryFood = useSelector(selectDiaryFood);
  const navigation = useNavigation<DiaryScreenNavigationProp>();
  const uid = useSelector(selectUid);
  const caloricIntake = useSelector(selectCaloricIntake);
  const macrosIntake = useSelector(selectMacrosIntake);
  const selectedCurrentDate = useSelector(selectCurrentDate);

  const diaryFoodBreakfast = diaryFood.filter(
    food => food.type === 'Breakfast',
  );
  const diaryFoodLunch = diaryFood.filter(food => food.type === 'Lunch');
  const diaryFoodDinner = diaryFood.filter(food => food.type === 'Dinner');

  const totalCalories = calculateCalories(diaryFood);

  function openSearch() {
    navigation.navigate(Routes.Search);
  }

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: 'green' }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: '500',
          color: 'white',
        }}
      />
    ),
  };

  async function handleDeleteItem(item: FoodFirestore) {
    await deleteFoodFromDiary(uid, item, selectedCurrentDate);
    await updateCaloriesIntake(
      uid,
      Math.round(
        caloricIntake -
          calculateCaloriesByServing(
            item.nutrition.calories,
            item.nutrition.servings.size,
          ),
      ),
    );
    await updateMacrosIntake(uid, {
      fat: Math.round(
        macrosIntake.fat -
          calculateMacronutrientsByServing(
            Number(item.nutrition.fat),
            item.nutrition.servings.size,
          ),
      ),
      protein: Math.round(
        Number(
          macrosIntake.protein -
            calculateMacronutrientsByServing(
              Number(item.nutrition.protein),
              item.nutrition.servings.size,
            ),
        ),
      ),
      carbs: Math.round(
        macrosIntake.carbs -
          calculateMacronutrientsByServing(
            Number(Number(item.nutrition.carbs)),
            item.nutrition.servings.size,
          ),
      ),
    });

    Toast.show({
      type: 'success',
      text1: 'Food removed successfully',
      position: 'bottom',
      visibilityTime: 1500,
    });
  }

  return (
    <Layout paddingTop style={{ backgroundColor: '#F2F1F1' }}>
      <Container>
        <View
          style={{
            paddingBottom: 10,
            paddingHorizontal: 15,
          }}>
          <Text style={{ fontSize: 22, fontWeight: '500' }}>Food Journal</Text>
        </View>
        <Calendar
          style={{
            marginHorizontal: 15,
            backgroundColor: 'white',
            borderRadius: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            marginTop: 10,
            marginHorizontal: 20,
            paddingHorizontal: 5,
            paddingTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginRight: 5,
              padding: 5,
            }}>
            <MIcon
              name="food-apple-outline"
              size={26}
              style={{ marginRight: 5 }}
              color="#465cc9"
            />
            <Text style={{ fontSize: 16, fontWeight: '600', marginRight: 5 }}>
              {Math.round(totalCalories)}
            </Text>
            <Text style={{ fontWeight: '500' }}>{'Kcal'}</Text>
          </View>
        </View>
        <ScrollView
          style={{
            flexGrow: 1,
            // marginTop: 10,
            padding: 10,
            paddingHorizontal: 15,
          }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <CellDropdown
            calories={844}
            mealType="BREAKFAST"
            data={diaryFoodBreakfast}
            onPress={openSearch}
            onDeleteItem={handleDeleteItem}
          />
          <CellDropdown
            calories={222}
            mealType="LUNCH"
            data={diaryFoodLunch}
            onPress={openSearch}
            onDeleteItem={handleDeleteItem}
          />
          <CellDropdown
            calories={123}
            mealType="DINNER"
            data={diaryFoodDinner}
            onPress={openSearch}
            onDeleteItem={handleDeleteItem}
          />
        </ScrollView>
      </Container>
      <Toast config={toastConfig} />
    </Layout>
  );
}
