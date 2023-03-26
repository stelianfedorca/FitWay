import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  GestureResponderEvent,
  Image,
  ListRenderItemInfo,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useFoodStore, useSearchStore } from '../../stores';
import { FoodData } from '../../stores/food';
import { ItemList } from '../ItemList';
import { Container } from './ListRecommendation.style';
import { ItemContainer } from './ListRecommendation.style';

export interface FoodInterface {
  name: string;
}

export interface ListProps {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  data: any;
  onItemPress?: (event: GestureResponderEvent) => void;
  onImagesLoaded?: () => void;
}

interface ItemDisplayProps {
  item: any;
  onImageLoaded: () => void;
  checkAllImagesAreLoaded?: () => void;
}

function ItemDisplay({
  item,
  onImageLoaded,
  checkAllImagesAreLoaded,
}: ItemDisplayProps) {
  return (
    <ItemContainer>
      <Image
        source={{ uri: item.recipe.image }}
        style={{ width: 200, height: '80%', borderWidth: 1 }}
        resizeMode="contain"
        onLoad={() => onImageLoaded()}
      />
      <Text>{item.recipe.label}</Text>
    </ItemContainer>
  );
}

export function ListRecommendation({
  contentStyle,
  data,
  onItemPress,
  onImagesLoaded,
}: ListProps) {
  const { food, setSelectedFood } = useFoodStore.getState();
  const searchFilter = useSearchStore(state => state.search);

  const dataLength = data.hits.length;
  const [counter, setCounter] = useState(1);

  function onSingleImageLoaded() {
    setCounter(counter + 1);
  }

  function _renderItem(item: any) {
    function handleItemPress(event: GestureResponderEvent) {
      setSelectedFood(item.item);
      onItemPress?.(event);
    }

    return <ItemDisplay item={item.item} onImageLoaded={onSingleImageLoaded} />;
  }

  return (
    <Container>
      <FlatList
        data={data.hits}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item.key ?? index.toString()}
        contentContainerStyle={contentStyle}
        bounces={false}
      />
    </Container>
  );
}
