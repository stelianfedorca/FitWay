import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MealPlanDay, MealPlanDetails } from '../redux/slices/mealPlanSlice';
import {
  getMealDetails,
  getSavedMealPlansFirestore,
} from '../services/mealplan.service';
import { MealPlanDayFirestore } from '../types/types';

export function useSavedMealPlans(uid: string) {
  const [savedMealPlans, setSavedMealPlans] = useState<MealPlanDayFirestore[]>(
    [],
  );

  const dispatch = useDispatch();

  const getSavedMealPlans = async () => {
    return await getSavedMealPlansFirestore(uid);
  };

  const memoizedSavedMealPlans = useMemo(getSavedMealPlans, [uid]);

  useEffect(() => {
    memoizedSavedMealPlans.then(mealPlans => {
      setSavedMealPlans(mealPlans);
      // dispatch(setMealPlans(mealPlans));
    });
  }, [uid]);

  return savedMealPlans;
}
