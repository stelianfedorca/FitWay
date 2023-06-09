import {
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardEventName,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
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

import DropDownPicker from 'react-native-dropdown-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { addMeal, MealData } from '../../services/meals.service';
import { useState } from 'react';
import { FoodType } from '../../stores/food';
import { useSelector } from 'react-redux';
import { selectFood } from '../../redux/slices/foodSlice';
import { FoodFirestore } from '../../types/types';
import { addFoodToDiary } from '../../services/food.service';
import {
  selectCaloricIntake,
  selectProfile,
} from '../../redux/slices/profileSlice';
import { selectUid } from '../../redux/slices/userSlice';
import { Option } from '../Option';
import { updateCaloriesIntake } from '../../services/user.service';

export type DetailsModal = {
  setModalVisible: (isVisible: boolean) => void;
  onSuccess?: () => void;
};

export function DetailsModal({ setModalVisible, onSuccess }: DetailsModal) {
  const selectedFood = useSelector(selectFood);
  const uid = useSelector(selectUid);
  const caloricIntake = useSelector(selectCaloricIntake);

  const [isLoading, setIsLoading] = useState(false);

  const [servingSize] = useState(100);
  const [servingsNo, setServingsNo] = useState('1');
  const [mealType, setMealType] = useState('Breakfast');

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' },
  ]);

  const handleAddFood = async () => {
    setIsLoading(true);
    const food: FoodFirestore = {
      id: selectedFood.food.foodId,
      name: selectedFood.food.label,
      image: selectedFood.food.image ?? '',
      brand: selectedFood.food.brand ?? '',
      nutrition: {
        calories: selectedFood.food.nutrients.ENERC_KCAL,
        fat: selectedFood.food.nutrients.FAT,
        carbs: selectedFood.food.nutrients.CHOCDF,
        protein: selectedFood.food.nutrients.PROCNT,
        servings: {
          number: Number(servingsNo),
          size: servingSize,
        },
      },
      type: value,
    };

    await addFoodToDiary(uid, food);
    await updateCaloriesIntake(
      uid,
      Math.round(
        caloricIntake +
          food.nutrition.calories * food.nutrition.servings.number,
      ),
    );
    setIsLoading(false);
    setModalVisible(false);
    onSuccess?.();
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      {isLoading && <ActivityIndicator size="large" style={styles.indicator} />}
      <HeaderContainer>
        <TitleHeader>Add Food</TitleHeader>
      </HeaderContainer>
      <ContentContainer>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>
          {selectedFood?.food.label}
        </Text>
        <Divider style={{ marginVertical: 10 }} bold />
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 40,
            flexDirection: 'row',
          }}>
          <Text style={{ fontSize: 16 }}>Serving Size</Text>
          <Option
            title={`${servingSize}`}
            disabled
            style={{
              width: 60,
              flex: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderWidth: 1,
              backgroundColor: 'white',
            }}
          />
        </View>
        <QuantityContainer>
          <Text style={{ fontSize: 16 }}>Number of Servings</Text>
          <QuantityValueContainer>
            <TextInput
              style={{
                fontSize: 16,
                color: '#004d99',
              }}
              keyboardType="numeric"
              value={`${servingsNo}`}
              onChangeText={setServingsNo}
            />
          </QuantityValueContainer>
        </QuantityContainer>
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 16 }}>Type of meal</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flex: 1,
            }}>
            <DropDownPicker
              open={isDropdownOpen}
              value={value}
              items={items}
              setOpen={setDropdownOpen}
              setValue={setValue}
              setItems={setItems}
              style={{ width: 100, alignSelf: 'flex-end' }}
            />
          </View>
        </View>
        <MacrosDetails>
          <CircularProgressComponent
            progressTitle="cal"
            progressValue={selectedFood?.food.nutrients.ENERC_KCAL!}
            max={selectedFood?.food.nutrients.ENERC_KCAL!}
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
              <TextQuantity>{`${selectedFood?.food.nutrients.CHOCDF} g`}</TextQuantity>
              <TextName>Carbs</TextName>
            </MacrosItem>
            <MacrosItem>
              <TextQuantity>{`${selectedFood?.food.nutrients.FAT} g`}</TextQuantity>
              <TextName>Fat</TextName>
            </MacrosItem>
            <MacrosItem>
              <TextQuantity>{`${selectedFood?.food.nutrients.PROCNT} g`}</TextQuantity>
              <TextName>Protein</TextName>
            </MacrosItem>
          </View>
        </MacrosDetails>
      </ContentContainer>

      <TouchableOpacity style={styles.addIcon} onPress={handleAddFood}>
        <Ionicons name="add-circle" size={38} color="#4a9cef" />
      </TouchableOpacity>
    </Pressable>
  );
}
