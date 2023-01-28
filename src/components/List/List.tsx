import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useFoodStore } from '../../stores';
import { FoodData } from '../../stores/food';

type ItemProps = {
  title: string;
};
export function List() {
  const food = useFoodStore(state => state.food);

  function Item({ title }: ItemProps) {
    return (
      <TouchableOpacity style={{ padding: 10, marginVertical: 10 }}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  }

  function _renderItem(item: ListRenderItemInfo<FoodData>) {
    return <Item title={item.item.name ?? ''} />;
  }

  return (
    <FlatList
      data={food?.filter(data => data.name === 'Rice')}
      renderItem={_renderItem}
    />
  );
}
