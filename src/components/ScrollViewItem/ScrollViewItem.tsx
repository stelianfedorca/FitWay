import { Pressable, Image, Text, View, TouchableOpacity } from 'react-native';
import { FoodImage } from '../../assets/images';
import { FoodFirestore } from '../../types/types';
import { calculateCaloriesByServing } from '../../utils/calculator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

export type ScrollViewItemProps = {
  item: FoodFirestore;
  index: number | string;
  onDeleteItem?: (item: FoodFirestore) => void;
};

export function ScrollViewItem({
  item,
  index,
  onDeleteItem,
}: ScrollViewItemProps) {
  const imageSource = item.image ? { uri: item.image } : FoodImage;

  const handleDeleteItem = () => {
    onDeleteItem?.(item);
  };
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
      }}
      key={index}
      onPress={() => console.log('item')}>
      <Image
        source={imageSource}
        resizeMode="contain"
        style={{ width: 65, height: 65, borderRadius: 15 }}
      />
      <View
        style={{
          marginLeft: 20,
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <Text style={{ fontWeight: '600', marginBottom: 5 }}>{item.name}</Text>
        <Text style={{ color: 'grey', flexWrap: 'wrap' }}>
          {item.isMeal
            ? Math.round(item.nutrition.calories)
            : calculateCaloriesByServing(
                item.nutrition.calories,
                item.nutrition.servings.size,
              )}{' '}
          kcal
        </Text>
      </View>
      <IconButton
        icon="delete"
        size={16}
        style={{ backgroundColor: 'grey' }}
        iconColor="white"
        onPress={handleDeleteItem}
      />
    </Pressable>
  );
}
