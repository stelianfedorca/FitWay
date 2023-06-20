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
import { MealPlanDetails } from '../../redux/slices/mealPlanSlice';

export type DetailsModalProps = {
  selectedFood?: MealPlanDetails;
  setModalVisible: (isVisible: boolean) => void;
  onSuccess?: () => void;
};

export function SavedMealDetailsModal({
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
  const [mealType, setMealType] = useState('Breakfast');

  const total = calculateCaloriesByServing(
    selectedFood?.food.nutrients.ENERC_KCAL ?? 100,
    servingSize,
  );

  function onQuantityChange(text: string) {
    setServingSize(Number(text));
  }

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      {isLoading && <ActivityIndicator size="large" style={styles.indicator} />}
      <HeaderContainer>
        <TitleHeader>Details</TitleHeader>
      </HeaderContainer>
      <ContentContainer></ContentContainer>
    </Pressable>
  );
}
