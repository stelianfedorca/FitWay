import { useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Image,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';

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

function ItemDisplay({ item, onImageLoaded }: ItemDisplayProps) {
  return (
    <ItemContainer>
      <Image
        source={{ uri: item.image }}
        style={{ width: 200, height: '80%', borderWidth: 1 }}
        resizeMode="contain"
        onLoad={() => onImageLoaded()}
      />
      <Text>{item.title}</Text>
    </ItemContainer>
  );
}

export function ListRecommendation({ contentStyle, data }: ListProps) {
  const [counter, setCounter] = useState(1);

  function onSingleImageLoaded() {
    setCounter(counter + 1);
  }

  function _renderItem(item: any) {
    return <ItemDisplay item={item.item} onImageLoaded={onSingleImageLoaded} />;
  }

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        contentContainerStyle={contentStyle}
        bounces={false}
      />
    </Container>
  );
}
