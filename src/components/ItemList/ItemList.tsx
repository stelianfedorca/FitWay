import React from 'react';
import { GestureResponderEvent, Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { FoodImage } from '../../assets/images';
import { FoodData } from '../../stores/food';
import { Product } from '../../types/types';
import { ItemContainer } from '../ListRecommendation/ListRecommendation.style';
import { Container, DetailsContainer } from './ItemList.style';

type ItemProps = {
  item: Product;
  onPress?: (event: GestureResponderEvent) => void;
};

export function ItemList({ item, onPress }: ItemProps) {
  const source = item.food.image ? { uri: item.food.image } : FoodImage;
  return (
    <Container onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Image source={source} style={{ height: 60, width: 60 }} />
        <DetailsContainer>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
            }}>
            {item.food.label}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>{`${
              Math.round(item.food.nutrients.ENERC_KCAL) ?? '-'
            } calories / `}</Text>
            <Text>{`${100} g, `}</Text>
            <Text>{`${item.food.brand ?? '-'}`}</Text>
          </View>
        </DetailsContainer>
      </View>
    </Container>
  );
}
