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
import { calculateCalories } from '../../utils/calculator';
import { DiaryScreenNavigationProp } from './DiaryScreen.types';

export function DiaryScreen() {
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const diaryFood = useSelector(selectDiaryFood);
  const navigation = useNavigation<DiaryScreenNavigationProp>();

  const diaryFoodBreakfast = diaryFood.filter(
    food => food.type === 'Breakfast',
  );
  const diaryFoodLunch = diaryFood.filter(food => food.type === 'Lunch');
  const diaryFoodDinner = diaryFood.filter(food => food.type === 'Dinner');

  const totalCalories = calculateCalories(diaryFood);
  // const totalConsumedCalories = diaryFood.reduce((accumulator, currentItem) => {
  //   return (
  //     accumulator +
  //     currentItem.nutrition.calories * currentItem.nutrition.servings.number
  //   );
  // }, 0);

  function openSearch() {
    navigation.navigate(Routes.Search);
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
          />
          <CellDropdown
            calories={222}
            mealType="LUNCH"
            data={diaryFoodLunch}
            onPress={openSearch}
          />
          <CellDropdown
            calories={123}
            mealType="DINNER"
            data={diaryFoodDinner}
            onPress={openSearch}
          />
        </ScrollView>
      </Container>
    </Layout>
  );
}
