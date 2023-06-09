import { useEffect, useState } from 'react';
import { FoodFirestore } from '../types/types';
import {
  calculateTotalCarbs,
  calculateTotalFat,
  calculateTotalProtein,
} from '../utils/calculator';

export function useMacros(diaryFood: FoodFirestore[]) {
  const [totalFat, setTotalFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);

  useEffect(() => {
    const totalFat = calculateTotalFat(diaryFood);
    const totalCarbs = calculateTotalCarbs(diaryFood);
    const totalProtein = calculateTotalProtein(diaryFood);
    setTotalFat(Math.round(totalFat));
    setTotalProtein(Math.round(totalProtein));
    setTotalCarbs(Math.round(totalCarbs));
  }, [diaryFood]);

  return { fat: totalFat, protein: totalProtein, carbs: totalCarbs };
}
