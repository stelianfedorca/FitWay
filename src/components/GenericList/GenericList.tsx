import { FlatList, StyleProp, ViewStyle } from 'react-native';
import { MealPlanDetails } from '../../redux/slices/mealPlanSlice';
import { Card } from '../Card';

export type GenericListProps<T> = {
  data: T[];
  listStyle?: StyleProp<ViewStyle>;
};

// type renderItemT<T> = { item: T extends MealPlanDetails};

export function GenericList<T>({ data, listStyle }: GenericListProps<T>) {
  const _renderItem = ({ item }: { item: T }) => <Card data={item} />;

  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      contentContainerStyle={{ backgroundColor: 'red' }}
      style={[{}, listStyle]}
    />
  );
}
