import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as TextRn,
} from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { InputRow } from '../../components/InputRow';
import { Layout } from '../../components/Layout';
import { Routes } from '../../navigators/Routes';
import { updateUserInFirestore } from '../../services/user.service';
import {
  CARBS_PROCENTAGE,
  FAT_PROCENTAGE,
  GENDER,
  PROTEIN_PROCENTAGE,
} from '../../utils/consts';
import {
  ButtonContainer,
  Container,
  PrimaryButton,
  TitleButton,
} from './SurveyScreen.style';
import { SurveyScreenNavigationProp } from './SurveyScreen.types';
import {
  selectFirstName,
  setIsSurveyCompleted,
  setProfile,
} from '../../redux/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail, selectUid } from '../../redux/slices/userSlice';
import axios from 'axios';
import { RAPIDAPI_KEY, RAPIDAPI_HOST } from '@env';

import { RulerPicker } from 'react-native-ruler-picker';
import { InputDropdown } from '../../components';
import {
  calculateGramsFromPercentage,
  calculateTDEE,
} from '../../utils/calculator';

export type ActivityLevelProps = {
  id: number;
  title: string;
  subtitle: string;
  value: number;
};

const activityLevelData: ActivityLevelProps[] = [
  {
    id: 1,
    title: 'Sedentary',
    subtitle: 'You spend most of your day sitting',
    value: 1.2,
  },
  {
    id: 2,
    title: 'Lightly Active',
    subtitle: 'You will spend a large part of your day on your feet',
    value: 1.375,
  },
  {
    id: 3,
    title: 'Moderately Active',
    subtitle: 'You do cardio 3 to 5 days a week',
    value: 1.55,
  },
  {
    id: 4,
    title: 'Very Active',
    subtitle: 'You do intentional exercise every day',
    value: 1.9,
  },
];

export type UserProfile = {
  email?: string | null;
  firstName?: string;
  gender?: string;
  age?: string;
  startingWeight?: string;
  height?: string;
  activityLevel?: string;
  goalWeight?: string;
  isSurveyCompleted?: boolean;
  tdee?: number;
  food?: number;
  exercise?: number;
};

export function SurveyScreen() {
  const dispatch = useDispatch();
  const [genderIndex, setGenderIndex] = useState(0);
  const [age, setAge] = useState(18);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(180);
  const [goalWeight, setGoalWeight] = useState(70);
  const [activityLevel, setActivityLevel] = useState(0);

  const [loading, setLoading] = useState(false);

  const email = useSelector(selectEmail);
  const uid = useSelector(selectUid);
  const name = useSelector(selectFirstName);

  const navigation = useNavigation<SurveyScreenNavigationProp>();

  async function generateGoals() {
    const response = await axios.get(
      'https://fitness-calculator.p.rapidapi.com/dailycalorie',
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
        params: {
          age: '25',
          gender: 'male',
          height: '179',
          weight: '75',
          activitylevel: 'level_2',
        },
      },
    );
  }

  async function handleContinue() {
    setLoading(true);
    const tdee = calculateTDEE(
      weight,
      height,
      age,
      String(GENDER[genderIndex]),
      activityLevelData[activityLevel].value,
    );

    dispatch(
      setProfile({
        isSurveyCompleted: true,
        age: String(age),
        caloricIntake: 0,
        height: String(height),
        startingWeight: String(weight),
        goalWeight: String(goalWeight),
        activityLevel: String(activityLevelData[activityLevel].title),
        gender: String(GENDER[genderIndex]),
        tdee: tdee,
        macros: {
          fat: calculateGramsFromPercentage(FAT_PROCENTAGE, 9, tdee),
          protein: calculateGramsFromPercentage(PROTEIN_PROCENTAGE, 4, tdee),
          carbs: calculateGramsFromPercentage(CARBS_PROCENTAGE, 4, tdee),
          carbsProcentage: CARBS_PROCENTAGE,
          fatProcentage: FAT_PROCENTAGE,
          proteinProcentage: PROTEIN_PROCENTAGE,
        },
      }),
    );

    await updateUserInFirestore(uid, { isSurveyCompleted: true });
    navigation.navigate(Routes.Loading);
    setLoading(false);
  }

  return (
    <Layout paddingBottom paddingTop style={{ backgroundColor: '##a9a8a8' }}>
      <Container>
        <View
          style={{
            height: 60,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextRn
            style={{
              marginBottom: 10,
              color: 'black',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Gender
          </TextRn>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                width: 80,
                // height: 40,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: genderIndex === 0 ? '#457ad7' : '#eef4fe',
              }}
              onPress={() => setGenderIndex(0)}>
              <Text
                style={{
                  color: genderIndex === 0 ? 'white' : '#a9c0e8',
                  fontWeight: 'bold',
                }}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderLeftWidth: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: genderIndex === 1 ? '#457ad7' : '#eef4fe',
              }}
              onPress={() => setGenderIndex(1)}>
              <Text
                style={{
                  color: genderIndex === 1 ? 'white' : '#a9c0e8',
                  fontWeight: 'bold',
                }}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider bold />
        <InputDropdown title="Age" value={age} unit="yo">
          <RulerPicker
            max={100}
            min={14}
            height={50}
            indicatorHeight={25}
            indicatorColor="#457ad7"
            step={1}
            unit=""
            unitTextStyle={{ fontSize: 12 }}
            valueTextStyle={{ fontSize: 20, fontWeight: '400' }}
            fractionDigits={0}
            gapBetweenSteps={25}
            initialValue={age}
            shortStepHeight={10}
            onValueChange={value => setAge(Number(value))}
          />
        </InputDropdown>
        <Divider bold />
        <InputDropdown title="Weight" value={weight} unit="kg">
          <RulerPicker
            max={200}
            min={14}
            height={50}
            indicatorHeight={25}
            indicatorColor="#457ad7"
            step={1}
            unit=""
            unitTextStyle={{ fontSize: 12 }}
            valueTextStyle={{ fontSize: 20, fontWeight: '400' }}
            fractionDigits={0}
            gapBetweenSteps={25}
            initialValue={weight}
            shortStepHeight={10}
            onValueChange={value => setWeight(Number(value))}
          />
        </InputDropdown>

        <Divider bold />
        <InputDropdown title="Height" value={height} unit="cm">
          <RulerPicker
            max={200}
            min={14}
            height={50}
            indicatorHeight={25}
            indicatorColor="#457ad7"
            step={1}
            unit=""
            unitTextStyle={{ fontSize: 12 }}
            valueTextStyle={{ fontSize: 20, fontWeight: '400' }}
            fractionDigits={0}
            gapBetweenSteps={25}
            initialValue={height}
            shortStepHeight={10}
            onValueChange={value => setHeight(Number(value))}
          />
        </InputDropdown>

        <Divider bold />

        <InputDropdown title="Goal" value={goalWeight} unit="kg">
          <RulerPicker
            max={200}
            min={14}
            height={50}
            indicatorHeight={25}
            indicatorColor="#457ad7"
            step={1}
            unit=""
            unitTextStyle={{ fontSize: 12 }}
            valueTextStyle={{ fontSize: 20, fontWeight: '400' }}
            fractionDigits={0}
            gapBetweenSteps={25}
            initialValue={goalWeight}
            shortStepHeight={10}
            onValueChange={value => setGoalWeight(Number(value))}
          />
        </InputDropdown>

        <Divider bold />
        <InputRow
          title="Activity Level"
          setOptionIndex={setActivityLevel}
          dropdown
          optionIndex={activityLevel}
          data={activityLevelData}
        />

        <Divider bold />

        <ButtonContainer style={{ padding: 10 }}>
          <PrimaryButton onPress={handleContinue} style={styles.shadowButton}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <TitleButton>Continue</TitleButton>
            )}
          </PrimaryButton>
        </ButtonContainer>
      </Container>
    </Layout>
  );
}

export const styles = StyleSheet.create({
  shadowButton: {
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
  },
});
