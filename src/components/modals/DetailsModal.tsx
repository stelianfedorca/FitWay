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
import { useEffect, useState } from 'react';
import { FoodType } from '../../stores/food';
import { useSelector } from 'react-redux';
import { selectFood } from '../../redux/slices/foodSlice';
import { FoodFirestore, Product } from '../../types/types';
import { addFoodToDiary } from '../../services/food.service';
import {
  selectCaloricIntake,
  selectMacrosIntake,
  selectProfile,
} from '../../redux/slices/profileSlice';
import { selectUid } from '../../redux/slices/userSlice';
import { Option } from '../Option';
import {
  updateCaloriesIntake,
  updateMacrosIntake,
} from '../../services/user.service';
import { Accordion, AccordionItem } from '../Accordion/Accordion';
import { useFocusEffect } from '@react-navigation/native';

export type DetailsModalProps = {
  selectedFood: Product;
  setModalVisible: (isVisible: boolean) => void;
  onSuccess?: () => void;
};

export function DetailsModal({
  setModalVisible,
  selectedFood,
  onSuccess,
}: DetailsModalProps) {
  // const selectedFood = useSelector(selectFood);
  const uid = useSelector(selectUid);
  const caloricIntake = useSelector(selectCaloricIntake);
  const macrosIntake = useSelector(selectMacrosIntake);

  const [isLoading, setIsLoading] = useState(false);

  const [servingSize] = useState(100);
  const [servingsNo, setServingsNo] = useState('1');
  const [mealType, setMealType] = useState('Breakfast');

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState('Breakfast');
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
    await updateMacrosIntake(uid, {
      fat: Math.round(macrosIntake.fat + Number(food.nutrition.fat)),
      protein: Math.round(
        Number(macrosIntake.protein + food.nutrition.protein),
      ),
      carbs: Math.round(macrosIntake.carbs + Number(food.nutrition.carbs)),
    });
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
          <View
            style={{
              width: 60,
              padding: 5,
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
            }}>
            <TextInput
              style={{
                fontSize: 16,
                fontWeight: '600',
                // color: '#004d99',
              }}
              keyboardType="numeric"
              value={`${servingSize}`}
              onChangeText={setServingsNo}
            />
            {/* <Text style={{ fontSize: 16, color: 'white' }}>{servingSize}</Text> */}
          </View>
          {/* <Option
            title={`${servingSize}`}
            disabled
            style={{
              flex: 0,
              justifyContent: 'center',
            }}
            isSelected
          /> */}
        </View>
        <QuantityContainer>
          <Text style={{ fontSize: 16 }}>Number of Servings</Text>
          <QuantityValueContainer>
            <TextInput
              style={{
                fontSize: 16,
                fontWeight: '600',
                // color: '#004d99',
              }}
              keyboardType="numeric"
              value={`${servingsNo}`}
              onChangeText={setServingsNo}
            />
          </QuantityValueContainer>
        </QuantityContainer>
        <View
          style={{
            alignItems: 'flex-start',
            marginTop: 5,
          }}>
          <Text style={{ fontSize: 16 }}>Type of meal</Text>
          <DropDownPicker
            open={isDropdownOpen}
            value={value}
            items={items}
            setOpen={setDropdownOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Breakfast"
            modalTitle="Type of meal"
            style={{ marginTop: 10 }}
            dropDownDirection="TOP"
          />
        </View>
        <MacrosDetails>
          <CircularProgressComponent
            progressTitle="cal"
            progressValue={selectedFood?.food.nutrients.ENERC_KCAL!}
            max={selectedFood.food.nutrients.ENERC_KCAL}
            radius={40}
            activeStrokeColorWidth={6}
            duration={0}
            activeStrokeColor="#465cc9"
          />
          <View
            style={{
              width: 200,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 70,
            }}>
            <MacrosItem>
              <TextQuantity
                style={{
                  color: '#3db9d5',
                }}>{`${selectedFood?.food.nutrients.CHOCDF} g`}</TextQuantity>
              <TextName style={{ color: '#3db9d5', fontWeight: '500' }}>
                Carbs
              </TextName>
            </MacrosItem>
            <MacrosItem>
              <TextQuantity
                style={{
                  color: '#4a62d8',
                }}>{`${selectedFood?.food.nutrients.FAT} g`}</TextQuantity>
              <TextName style={{ color: '#4a62d8', fontWeight: '500' }}>
                Fat
              </TextName>
            </MacrosItem>
            <MacrosItem>
              <TextQuantity
                style={{
                  color: '#d38723',
                }}>{`${selectedFood?.food.nutrients.PROCNT} g`}</TextQuantity>
              <TextName style={{ color: '#d38723', fontWeight: '500' }}>
                Protein
              </TextName>
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
