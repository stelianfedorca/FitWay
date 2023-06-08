import { useEffect, useState } from 'react';
import { FoodFirestore } from '../types/types';
import firestore from '@react-native-firebase/firestore';
import {
  DAILY_LOGS_COLLECTION,
  DIARY_COLLECTION,
  LOGS_COLLECTION,
} from '../utils/consts';
import { useSelector } from 'react-redux';
import { selectUid } from '../redux/slices/userSlice';

// custom hook
export function useDiaryFood(date: string, mealType: string) {
  const [foodLogs, setFoodLogs] = useState<FoodFirestore[]>([]);
  const userId = useSelector(selectUid);

  useEffect(() => {
    const subscriber = firestore()
      .collection(DIARY_COLLECTION)
      .doc(userId)
      .collection(DAILY_LOGS_COLLECTION)
      .doc(date)
      .collection(LOGS_COLLECTION)
      .where('type', '==', mealType)
      .onSnapshot(querySnapshot => {
        const foodLogs: FoodFirestore[] = [];

        querySnapshot.forEach(documentSnapshot => {
          documentSnapshot.data();
          foodLogs.push(documentSnapshot.data() as FoodFirestore);
          // food.push({
          //   ...documentSnapshot.data(),
          //   key: documentSnapshot.id,
          // });
        });
        setFoodLogs(foodLogs);
      });

    // unsubscribe from events when no longer in use
    return () => subscriber();
  }, [date]);

  return foodLogs;
}
