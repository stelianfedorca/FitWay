import { useEffect, useState } from 'react';
import { MealPlanDay, MealPlanDetails } from '../redux/slices/mealPlanSlice';
import { getMealDetails } from '../services/mealplan.service';

export function useMealPlanDetails(mealPlan: MealPlanDay) {
  const [mealPlanDetails, setMealPlanDetails] = useState<
    (MealPlanDetails | null)[]
  >([]);

  const meals = mealPlan.meals;

  useEffect(() => {
    // let mealDetails: MealPlanDetails[] = [];
    const getMealPlanDetails = async () => {
      const mealDetails = await Promise.all(
        meals.map(meal => {
          return getMealDetails(meal.id);
        }),
      );

      return mealDetails;
    };

    getMealPlanDetails().then(mealDetails => setMealPlanDetails(mealDetails));
  }, [mealPlan]);

  return mealPlanDetails;
}
