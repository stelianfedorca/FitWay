import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MealPlanDay, MealPlanDetails } from '../redux/slices/mealPlanSlice';
import { getMealDetails } from '../services/mealplan.service';
import { MealPlanDayFirestore } from '../types/types';

export function useMealPlanDetails(
  mealPlan: MealPlanDay | MealPlanDayFirestore,
) {
  const [mealPlanDetails, setMealPlanDetails] = useState<
    (MealPlanDetails | null)[]
  >([]);
  const dispatch = useDispatch();

  const meals = mealPlan.meals;

  const getMealPlanDetails = async () => {
    const mealDetails = await Promise.all(
      meals.map(meal => {
        return getMealDetails(meal.id);
      }),
    );

    return mealDetails;
  };
  const memoizedMealPlanDetails = useMemo(getMealPlanDetails, [mealPlan]);

  useEffect(() => {
    memoizedMealPlanDetails.then(mealDetails => {
      setMealPlanDetails(mealDetails);
      // dispatch(setMealPlans());
    });
  }, [mealPlan]);

  return mealPlanDetails;
}
