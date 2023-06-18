import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
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

import { format } from 'date-fns';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectCurrentDate } from '../../redux/slices/dateSlice';
import { selectFood } from '../../redux/slices/foodSlice';
import {
  selectCaloricIntake,
  selectMacrosIntake,
} from '../../redux/slices/profileSlice';
import { selectUid } from '../../redux/slices/userSlice';
import { addFoodToDiary } from '../../services/food.service';
import {
  updateCaloriesIntake,
  updateMacrosIntake,
} from '../../services/user.service';
import { FoodFirestore, Product } from '../../types/types';
import {
  calculateCaloriesByServing,
  calculateMacronutrientsByServing,
} from '../../utils/calculator';

export type DetailsModalProps = {
  selectedFood?: Product;
  setModalVisible: (isVisible: boolean) => void;
  onSuccess?: () => void;
};

export function DetailsModal({
  setModalVisible,
  onSuccess,
}: DetailsModalProps) {
  const selectedFood = useSelector(selectFood);
  const uid = useSelector(selectUid);
  const caloricIntake = useSelector(selectCaloricIntake);
  const macrosIntake = useSelector(selectMacrosIntake);
  const selectedCurrentDate = useSelector(selectCurrentDate);
  const currentDate = format(new Date(), 'dd-MM-yyyy');

  const [isLoading, setIsLoading] = useState(false);

  const [servingSize, setServingSize] = useState(100);
  const [servingsNo, setServingsNo] = useState('1');
  const [mealType, setMealType] = useState('Breakfast');

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState('Breakfast');
  const [items, setItems] = useState([
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' },
  ]);

  const total = calculateCaloriesByServing(
    selectedFood?.food.nutrients.ENERC_KCAL ?? 100,
    servingSize,
  );

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
          size: Number(servingSize),
        },
      },
      type: value,
    };

    await addFoodToDiary(uid, food, selectedCurrentDate ?? currentDate);
    await updateCaloriesIntake(
      uid,
      Math.round(
        caloricIntake +
          calculateCaloriesByServing(
            food.nutrition.calories,
            food.nutrition.servings.size,
          ),
      ),
    );
    await updateMacrosIntake(uid, {
      fat: Math.round(
        macrosIntake.fat +
          calculateMacronutrientsByServing(
            Number(food.nutrition.fat),
            food.nutrition.servings.size,
          ),
      ),
      protein: Math.round(
        Number(
          macrosIntake.protein +
            calculateMacronutrientsByServing(
              Number(food.nutrition.protein),
              food.nutrition.servings.size,
            ),
        ),
      ),
      carbs: Math.round(
        macrosIntake.carbs +
          calculateMacronutrientsByServing(
            Number(Number(food.nutrition.carbs)),
            food.nutrition.servings.size,
          ),
      ),
    });
    setIsLoading(false);
    setModalVisible(false);
    onSuccess?.();
  };

  function onQuantityChange(text: string) {
    setServingSize(Number(text));
  }

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
        <QuantityContainer>
          <Text style={{ fontSize: 16 }}>Quantity</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <QuantityValueContainer style={{ marginRight: 5 }}>
              <TextInput
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#004d99',
                }}
                keyboardType="numeric"
                value={`${servingSize}`}
                onChangeText={onQuantityChange}
                maxLength={5}
              />
            </QuantityValueContainer>
            <Text style={{ fontSize: 16 }}>grams</Text>
          </View>
        </QuantityContainer>

        <MacrosDetails>
          <CircularProgressComponent
            progressTitle="calories"
            progressValue={total}
            max={total}
            radius={40}
            activeStrokeColorWidth={6}
            duration={0}
            activeStrokeColor="#465cc9"
            inactiveStrokeColor="#465cc9"
            // inActiveStrokeWidth={0}
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
                }}>{`${calculateMacronutrientsByServing(
                selectedFood?.food.nutrients.CHOCDF,
                servingSize,
              )} g`}</TextQuantity>
              <TextName style={{ color: '#3db9d5', fontWeight: '500' }}>
                Carbs
              </TextName>
            </MacrosItem>
            <MacrosItem>
              <TextQuantity
                style={{
                  color: '#4a62d8',
                }}>{`${calculateMacronutrientsByServing(
                selectedFood?.food.nutrients.FAT,
                servingSize,
              )} g`}</TextQuantity>
              <TextName style={{ color: '#4a62d8', fontWeight: '500' }}>
                Fat
              </TextName>
            </MacrosItem>
            <MacrosItem>
              <TextQuantity
                style={{
                  color: '#d38723',
                }}>{`${calculateMacronutrientsByServing(
                selectedFood?.food.nutrients.PROCNT,
                servingSize,
              )} g`}</TextQuantity>
              <TextName style={{ color: '#d38723', fontWeight: '500' }}>
                Protein
              </TextName>
            </MacrosItem>
          </View>
        </MacrosDetails>
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
            dropDownDirection="BOTTOM"
          />
        </View>
      </ContentContainer>

      <TouchableOpacity style={styles.addIcon} onPress={handleAddFood}>
        <Ionicons name="add-circle" size={38} color="#4a9cef" />
      </TouchableOpacity>
    </Pressable>
  );
}
