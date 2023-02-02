import {
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardEventName,
  Pressable,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { useFoodStore } from '../../stores';
import { CircularProgressComponent } from '../CircularProgressComponent';
import {
  ContentContainer,
  HeaderContainer,
  MacrosDetails,
  MacrosItem,
  QuantityContainer,
  QuantityValueContainer,
  styles,
  TextName,
  TextQuantity,
  TitleHeader,
} from './DetailsModal.style';

export function DetailsModal() {
  const selectedFood = useFoodStore(state => state.selectedFood);

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <HeaderContainer>
        <TitleHeader>Add Food</TitleHeader>
      </HeaderContainer>
      <ContentContainer>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>
          {selectedFood?.name}
        </Text>
        <Divider style={{ marginVertical: 10 }} bold />
        <QuantityContainer>
          <Text style={{ fontSize: 16 }}>Serving Size</Text>
          <QuantityValueContainer style={{ width: 80 }}>
            <Text
              style={{
                fontSize: 16,
                color: '#004d99',
              }}>{`${selectedFood?.servingSize} g`}</Text>
          </QuantityValueContainer>
        </QuantityContainer>
        <QuantityContainer>
          <Text style={{ fontSize: 16 }}>Number of Servings</Text>
          <QuantityValueContainer>
            <TextInput
              style={{ fontSize: 16, color: '#004d99' }}
              keyboardType="numeric"
              value={selectedFood?.numberOfServings?.toString()}
            />
          </QuantityValueContainer>
        </QuantityContainer>
        <MacrosDetails>
          <CircularProgressComponent
            progressTitle="cal"
            progressValue={selectedFood?.calories!}
            max={selectedFood?.calories!}
            radius={40}
            activeStrokeColorWidth={6}
            duration={0}
          />
          <View
            style={{
              width: 200,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 70,
            }}>
            <MacrosItem>
              <TextQuantity>{`${selectedFood?.carbs} g`}</TextQuantity>
              <TextName>Carbs</TextName>
            </MacrosItem>
            <MacrosItem>
              <TextQuantity>{`${selectedFood?.fat} g`}</TextQuantity>
              <TextName>Fat</TextName>
            </MacrosItem>
            <MacrosItem>
              <TextQuantity>{`${selectedFood?.protein} g`}</TextQuantity>
              <TextName>Protein</TextName>
            </MacrosItem>
          </View>
        </MacrosDetails>
      </ContentContainer>
    </Pressable>
  );
}
