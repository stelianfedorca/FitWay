import { FlatList, ScrollView, View, Text } from 'react-native';
import { InputDropdown, Option } from '../../components';
import { Calendar } from '../../components/Calendar/Calendar';
import { Layout } from '../../components/Layout';
import { Container } from './DiaryScreen.style';
import { RulerPicker } from 'react-native-ruler-picker';
import { CellDropdown } from '../../components/CellDropdown/CellDropdown';
import { Food } from '../../types/types';
import { SignUpBackgroundImage } from '../../assets/images';

const data: Food[] = [
  {
    foodId: 1,
    calories: 400,
    name: 'Oats',
    quantity: 150,
    type: 'Breakfast',
    image: SignUpBackgroundImage,
  },
  {
    foodId: 2,
    calories: 89,
    name: 'Chicken Breast',
    quantity: 120,
    type: 'Lunch',
    image: SignUpBackgroundImage,
  },
];
export function DiaryScreen() {
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
        {/* <View
          style={{
            borderWidth: 1,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 100,
            backgroundColor: 'red',
          }}>
          <View>
            <Text>{'1632'}</Text>
            <Text>{'Eaten'}</Text>
          </View>
        </View> */}
        <ScrollView
          style={{
            flexGrow: 1,
            marginTop: 20,
            padding: 10,
            paddingHorizontal: 20,
          }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <CellDropdown calories={844} mealType="Breakfast" data={data} />
          <CellDropdown
            calories={222}
            mealType="Lunch"
            data={[{ id: 1, name: 'food 2', calories: 333 }]}
          />
          <CellDropdown
            calories={123}
            mealType="Dinner"
            data={[{ id: 1, name: 'food 3', calories: 111 }]}
          />
        </ScrollView>
      </Container>
    </Layout>
  );
}
