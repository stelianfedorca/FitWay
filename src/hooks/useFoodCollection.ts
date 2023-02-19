import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FOOD_COLLECTION } from '../utils/consts';
import { FoodData, useFoodStore } from '../stores/food';
import { useAuthStore } from '../stores';

// custom hook
export function useFoodCollection() {
  const { user } = useAuthStore();
  const [food, setFood] = useState<FoodData[] | null>(null);

  useEffect(() => {
    // if (!user) return;
    const subscriber = firestore()
      .collection(FOOD_COLLECTION)
      .onSnapshot(querySnapshot => {
        const food: FoodData[] = [];

        querySnapshot.forEach(documentSnapshot => {
          food.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setFood(food);
      });

    // unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return food;
}
