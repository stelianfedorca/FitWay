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
      .onSnapshot(querySnapshot => {
        const foodLogs: FoodFirestore[] = [];

        querySnapshot.forEach(documentSnapshot => {
          const foodData = documentSnapshot.data() as FoodFirestore;
          foodLogs.push(foodData);
        });
        const calories = calculateCalories(foodLogs);
        setFoodLogs(foodLogs);
        dispatch(setDiaryFood(foodLogs));
        dispatch(
          setProfile({
            caloricIntake: calories,
            macrosIntake: {
              fat: calculateTotalFat(foodLogs),
              protein: calculateTotalProtein(foodLogs),
              carbs: calculateTotalCarbs(foodLogs),
            },
          }),
        );
      });

    // unsubscribe from events when no longer in use
    return () => subscriber();
  }, [date]);

  return foodLogs;
}
