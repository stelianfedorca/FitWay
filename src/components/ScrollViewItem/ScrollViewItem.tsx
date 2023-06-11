import { Pressable, Image, Text, View } from 'react-native';
import { FoodImage } from '../../assets/images';
import { FoodFirestore } from '../../types/types';
import { calculateCaloriesByServing } from '../../utils/calculator';

export type ScrollViewItemProps = {
  item: FoodFirestore;
  index: number | string;
};

export function ScrollViewItem({ item, index }: ScrollViewItemProps) {
  const imageSource = item.image ? { uri: item.image } : FoodImage;
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
        }}>
        <Text style={{ fontWeight: '600', marginBottom: 5 }}>{item.name}</Text>
        <Text style={{ color: 'grey' }}>
          {calculateCaloriesByServing(
            item.nutrition.calories,
            item.nutrition.servings.size,
          )}{' '}
          kcal
        </Text>
      </View>
    </Pressable>
  );
}
