import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { FoodData } from '../../stores/food';
import { Container, DetailsContainer } from './ItemList.style';

type ItemProps = {
  item: FoodData;
};

export function ItemList({ item }: ItemProps) {
  return (
    <Container>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
      <DetailsContainer>
        <Text>{`${item.calories} cal, `}</Text>
        <Text>{`${item.servingSize} g, `}</Text>
        <Text>{`${item.manufacturer}`}</Text>
      </DetailsContainer>
    </Container>
  );
}
