import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { useFoodStore, useSearchStore } from '../../stores';
import { FoodData } from '../../stores/food';
import { ItemList } from '../ItemList';
import { Container } from './List.style';

export function List() {
  const food = useFoodStore(state => state.food);
  const searchFilter = useSearchStore(state => state.search);

  function _renderItem(item: ListRenderItemInfo<FoodData>) {
    return <ItemList item={item.item} />;
  }

  return (
    <Container>
      <FlatList
        data={food?.filter(data =>
          data.name?.includes(searchFilter ?? data.name),
        )}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item.key ?? index.toString()}
      />
    </Container>
  );
}
