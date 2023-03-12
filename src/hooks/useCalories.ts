import { useEffect, useState } from 'react';
import axios from 'axios';
import { RAPIDAPI_HOST, RAPIDAPI_KEY } from '@env';
import { useDispatch } from 'react-redux';
import {
  selectCaloriesGoals,
  selectTdee,
  setProfile,
  setTdee,
} from '../redux/slices/profileSlice';

export function useCalories() {
  const [response, setResponse] = useState({});
  const dispatch = useDispatch();

  // useEffect(() => {
  //   async function generateGoals() {
  //     const response = await axios.get(
  //       'https://fitness-calculator.p.rapidapi.com/dailycalorie',
  //       {
  //         headers: {
  //           'X-RapidAPI-Key': RAPIDAPI_KEY,
  //           'X-RapidAPI-Host': RAPIDAPI_HOST,
  //         },
  //         params: {
  //           age: '25',
  //           gender: 'male',
  //           height: '179',
  //           weight: '75',
  //           activitylevel: 'level_2',
  //         },
  //       },
  //     );

  //     const caloriesGoals = response.data.data;
  //   }

  //   generateGoals();
  // }, []);

  return 2100;
}
