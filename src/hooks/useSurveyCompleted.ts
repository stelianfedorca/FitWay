import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/slices/profileSlice';

export function SurveyCompleted() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   async function setSurveyAsComplete() {
  //     dispatch(
  //       setProfile({
  //         gender: GENDER[genderIndex].toLowerCase(),
  //         age: age,
  //         height: height,
  //         startingWeight: startingWeight,
  //         isSurveyCompleted: true,
  //       }),
  //     );

  //     await updateUserInFirestore(uid);
  //     dispatch(setIsSurveyCompleted({ isSurveyCompleted: true }));

  //   }
  // },[]);
}
