import {
  FlatList,
  GestureResponderEvent,
  ListRenderItemInfo,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useFoodStore, useSearchStore } from '../../stores';
import { FoodData } from '../../stores/food';
import { ItemList } from '../ItemList';
import { Container } from './List.style';

export type ListProps = {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  data: FoodData[] | null;
  onItemPress?: (event: GestureResponderEvent) => void;
};

export function List({ contentStyle, data, onItemPress }: ListProps) {
  const { food, setSelectedFood } = useFoodStore.getState();
  const searchFilter = useSearchStore(state => state.search);

  function _renderItem(item: ListRenderItemInfo<FoodData>) {
    function handleItemPress(event: GestureResponderEvent) {
      setSelectedFood(item.item);
      onItemPress?.(event);
    }
    return <ItemList item={item.item} onPress={handleItemPress} />;
  }

  return (
    <Container>
      <FlatList
        data={data?.filter(data =>
          data.name?.includes(searchFilter ?? data.name),
        )}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item.key ?? index.toString()}
        contentContainerStyle={contentStyle}
        bounces={false}
      />
    </Container>
  );
}
