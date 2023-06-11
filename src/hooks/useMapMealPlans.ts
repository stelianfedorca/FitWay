import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MealPlanDay, MealPlanDetails } from '../redux/slices/mealPlanSlice';
import { getMealDetails } from '../services/mealplan.service';
import { MealPlanDayFirestore } from '../types/types';
import { useMealPlanDetails } from './useMealPlanDetails';

export function useMapMealPlans(mealPlans: MealPlanDayFirestore[]) {
  const [data, setData] = useState<
    {
      mealPlan: MealPlanDayFirestore;
      mealPlanDetails: (MealPlanDetails | null)[];
    }[]
  >();
  const mapMealPlans = async () => {
    const data = await Promise.all(
      mealPlans.map(async mealPlan => {
        const meals = mealPlan.meals;
        const mealdetails = await Promise.all(
          meals.map(meal => {
            return getMealDetails(meal.id);
          }),
        );

        return { mealPlan: mealPlan, mealPlanDetails: mealdetails };
      }),
    );

    setData(data);
  };

  useEffect(() => {
    mapMealPlans();
  }, [mealPlans]);

  return data;
}
