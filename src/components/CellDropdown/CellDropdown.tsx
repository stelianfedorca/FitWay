import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  ScrollView,
  Image,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { AvatarProfile } from '../../assets/images';
import { Food } from '../../types/types';

export type CellDropdownProps = {
  mealType: string;
  calories: number;
  data: Food[];
};

const INITIAL_HEIGHT = 100;
export function CellDropdown({ mealType, calories, data }: CellDropdownProps) {
  const totalCaloriesFood = data.reduce((prevElement, currentElement) => {
    return {
      ...currentElement,
      calories: prevElement.calories + currentElement.calories,
    };
  });
  return (
    <Pressable style={styles.container} onPress={() => console.log('pressed')}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          paddingHorizontal: 15,
        }}>
        <View style={{ justifyContent: 'space-around' }}>
          <Text style={{ fontWeight: '500', color: '#a96430' }}>
            {mealType}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: '500', fontSize: 16, marginRight: 5 }}>
              {totalCaloriesFood.calories}
            </Text>
            <Text>kcal</Text>
          </View>
        </View>
        <IconButton
          icon="plus"
          size={20}
          style={{ backgroundColor: '#E4A775' }}
          iconColor="white"
          onPress={() => console.log('press')}
        />
      </View>
      <ScrollView style={{ padding: 10, paddingHorizontal: 15 }}>
        {data.map((item, index) => (
          <Pressable
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              alignItems: 'center',
            }}
            key={index}
            onPress={() => console.log('item')}>
            <Image
              source={AvatarProfile}
              resizeMode="contain"
              style={{ width: 65, height: 65, borderRadius: 15 }}
            />
            <View
              style={{
                marginLeft: 20,
                justifyContent: 'space-between',
              }}>
              <Text style={{ fontWeight: '600', marginBottom: 5 }}>
                {item.name}
              </Text>
              <Text style={{ color: 'grey' }}>{item.calories} kcal</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        style={{
          backgroundColor: '#f9dcc4',
          height: 25,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}></Pressable>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // height: INITIAL_HEIGHT,
    marginBottom: 15,
    borderRadius: 15,
    // overflow: 'hidden',
    // paddingBottom: 20,
    // shadow
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 6,
      height: 7,
    },
    shadowOpacity: 0.1,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'red',
  },
});
