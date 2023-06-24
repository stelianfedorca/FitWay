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
import { Divider, IconButton } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { AvatarProfile } from '../../assets/images';
import { Food, FoodFirestore } from '../../types/types';
import { calculateCalories } from '../../utils/calculator';
import { ScrollViewItem } from '../ScrollViewItem/ScrollViewItem';

export type CellDropdownProps = {
  mealType: string;
  calories: number;
  data: FoodFirestore[];
  onPress?: () => void;
  onDeleteItem?: (item: FoodFirestore) => void;
};

const INITIAL_HEIGHT = 100;
export function CellDropdown({
  mealType,
  calories,
  onPress,
  onDeleteItem,
  data,
}: CellDropdownProps) {
  const isDataAvailable = data.length > 0;

  const totalCaloriesFood = calculateCalories(data);

  return (
    <Pressable style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          paddingHorizontal: 15,
        }}>
        <View style={{ justifyContent: 'space-around' }}>
          <Text style={{ fontWeight: '500', color: '#1a1f38' }}>
            {mealType}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: '500', fontSize: 16, marginRight: 5 }}>
              {Math.round(totalCaloriesFood)}
            </Text>
            <Text>kcal</Text>
          </View>
        </View>
        <IconButton
          icon="plus"
          size={20}
          style={{ backgroundColor: '#1a2350' }}
          iconColor="white"
          onPress={onPress}
        />
      </View>
      {!isDataAvailable ? (
        <View style={{ padding: 10 }}>
          <Text>{'No food logged'}</Text>
        </View>
      ) : (
        <ScrollView style={{ padding: 10, paddingHorizontal: 15 }}>
          {data.map((item, index) => (
            <ScrollViewItem
              onDeleteItem={onDeleteItem}
              item={item}
              index={item.id}
              key={item.id}
            />
          ))}
        </ScrollView>
      )}
      <Pressable
        style={{
          backgroundColor: '#4659b8',
          height: 20,
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
