import {
  FlatList,
  GestureResponderEvent,
  ListRenderItemInfo,
  StyleProp,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFood } from '../../redux/slices/foodSlice';
import { selectSearch } from '../../redux/slices/searchSlice';
import { useFoodStore, useSearchStore } from '../../stores';
import { FoodData } from '../../stores/food';
import { Food, Product } from '../../types/types';
import { ItemList } from '../ItemList';
import { Container } from './List.style';

export type ListProps = {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  data: Product[] | null;
  onItemPress?: (item: Product) => void;
};

function EmptyList() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 18, fontWeight: '500', color: 'grey' }}>
        No results found
      </Text>
    </View>
  );
}

export function List({ contentStyle, data, onItemPress }: ListProps) {
  const dispatch = useDispatch();
  // const searchFilter = useSearchStore(state => state.search);
  const searchFilter = useSelector(selectSearch);

  function _renderItem({ item }: ListRenderItemInfo<Product>) {
    // function handleItemPress(event: GestureResponderEvent) {
    //   // dispatch(setFood(item));
    //   onItemPress?.(event);
    // }
    return <ItemList item={item} onPress={() => onItemPress?.(item)} />;
  }

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item, index) =>
          item.food.foodId + item.food.label ?? index.toString()
        }
        contentContainerStyle={[{ flexGrow: 1 }, contentStyle]}
        bounces={false}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: 'white', height: 10 }} />
        )}
        ListEmptyComponent={EmptyList}
      />
    </Container>
  );
}
