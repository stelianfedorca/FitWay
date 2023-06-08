import { FlatList, ScrollView, View, Text } from 'react-native';
import { InputDropdown, Option } from '../../components';
import { Calendar } from '../../components/Calendar/Calendar';
import { Layout } from '../../components/Layout';
import { Container } from './DiaryScreen.style';
import { RulerPicker } from 'react-native-ruler-picker';
import { CellDropdown } from '../../components/CellDropdown/CellDropdown';
import { Food } from '../../types/types';
import { SignUpBackgroundImage } from '../../assets/images';
import { useDiaryFood } from '../../hooks/useDiaryFood';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectDiaryFood } from '../../redux/slices/diarySlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function DiaryScreen() {
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const diaryFood = useSelector(selectDiaryFood);

  const diaryFoodBreakfast = diaryFood.filter(
    food => food.type === 'Breakfast',
  );
  const diaryFoodLunch = diaryFood.filter(food => food.type === 'Lunch');
  const diaryFoodDinner = diaryFood.filter(food => food.type === 'Dinner');

  const totalConsumedCalories = diaryFood.reduce((accumulator, currentItem) => {
    return (
      accumulator +
      currentItem.nutrition.calories * currentItem.nutrition.servings.number
    );
  }, 0);

  return (
    <Layout paddingTop style={{ backgroundColor: '#F2F1F1' }}>
      <Container>
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
            height: 50,
            marginTop: 10,
            marginHorizontal: 20,
            paddingHorizontal: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginRight: 5,
            }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginRight: 5 }}>
              {Math.round(totalConsumedCalories)}
            </Text>
            <Text style={{ fontWeight: '500' }}>{'Kcal'}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            {/* <MaterialIcons
                size={22}
                name="local-fire-department"
                color="orange"
                style={{ marginRight: 5 }}
              /> */}
            {/* <Text style={{ fontSize: 16, fontWeight: '500', color: '#282f51' }}>
              {'Eaten'}
            </Text> */}
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
          />
          <CellDropdown calories={222} mealType="LUNCH" data={diaryFoodLunch} />
          <CellDropdown
            calories={123}
            mealType="DINNER"
            data={diaryFoodDinner}
          />
        </ScrollView>
      </Container>
    </Layout>
  );
}
