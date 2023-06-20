import { useEffect, useState } from 'react';
import { FoodFirestore } from '../types/types';
import firestore from '@react-native-firebase/firestore';
import {
  DAILY_LOGS_COLLECTION,
  DIARY_COLLECTION,
  LOGS_COLLECTION,
} from '../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { selectUid } from '../redux/slices/userSlice';
import { setFood } from '../redux/slices/foodSlice';
import { setDiaryFood } from '../redux/slices/diarySlice';
import {
  calculateCalories,
  calculateTotalCarbs,
  calculateTotalFat,
  calculateTotalProtein,
} from '../utils/calculator';
import { setProfile } from '../redux/slices/profileSlice';
import { updateProfileInFiresotore } from '../services/user.service';

// custom hook
export function useDiary(date: string) {
  const [foodLogs, setFoodLogs] = useState<FoodFirestore[]>([]);
  const userId = useSelector(selectUid);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firestore()
      .collection(DIARY_COLLECTION)
      .doc(userId)
      .collection(DAILY_LOGS_COLLECTION)
      .doc(date)
      .collection(LOGS_COLLECTION)
      .onSnapshot(async querySnapshot => {
        const foodLogs: FoodFirestore[] = [];

        querySnapshot.forEach(documentSnapshot => {
          const foodData = documentSnapshot.data() as FoodFirestore;
          foodLogs.push(foodData);
        });
        const calories = calculateCalories(foodLogs);
        const fat = calculateTotalFat(foodLogs);
        const carbs = calculateTotalCarbs(foodLogs);
        const protein = calculateTotalProtein(foodLogs);

        setFoodLogs(foodLogs);
        dispatch(setDiaryFood(foodLogs));
        dispatch(
          setProfile({
            caloricIntake: calories,
            macrosIntake: {
              fat: fat,
              protein: protein,
              carbs: carbs,
            },
          }),
        );

        await updateProfileInFiresotore(userId, {
          caloricIntake: calories,
          macrosIntake: { fat: fat, carbs: carbs, protein: protein },
        });
      });

    // unsubscribe from events when no longer in use
    return () => subscriber();
  }, [date]);

  return foodLogs;
}
