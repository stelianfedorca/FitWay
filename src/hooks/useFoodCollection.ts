import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FOOD_COLLECTION } from '../utils/consts';

// custom hook
export function useFoodCollection() {
  useEffect(() => {
    const subscriber = firestore()
      .collection(FOOD_COLLECTION)
      .onSnapshot(querySnapshot => {
        const food = [];

        querySnapshot.forEach(documentSnapshot => {
          food.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        console.log(food);
      });

    // unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
}
