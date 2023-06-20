import React, { useState } from 'react';
import { Button, Image, Pressable, TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarProfile } from '../../assets/images';
import { CellRow } from '../../components/CellRow';
import { Layout } from '../../components/Layout';
import { logout, selectUid } from '../../redux/slices/userSlice';
import {
  Container,
  DetailsContainer,
  ProfileDetailsContainer,
  SettingsContainer,
  styles,
} from './ProfileScreen.style';

import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigators';
import { reset } from '../../redux/slices/mealPlanSlice';
import { selectProfile, setProfile } from '../../redux/slices/profileSlice';
import {
  signOut,
  updateProfileInFiresotore,
} from '../../services/user.service';
import { calculateBMI } from '../../utils/calculator';
import { ProfileScreenNavigationProp } from './ProfileScreen.types';
import { InputDropdown } from '../../components';
import { RulerPicker } from 'react-native-ruler-picker';
export function ProfileScreen() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const uid = useSelector(selectUid);

  const [goalWeight, setGoalWeight] = useState(
    Number(profile.goalWeight) ?? 70,
  );

  const [currentWeight, setCurrentWeight] = useState(
    profile.startingWeight ?? 70,
  );

  const [calories, setCalories] = useState(profile?.tdee ?? 2000);

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const bmi = calculateBMI(
    Number(profile.startingWeight),
    Number(profile.height),
  );

  async function handleSignOut() {
    signOut();
    dispatch(logout());
    dispatch(reset());
  }

  async function handleSaveCalories() {
    await updateProfileInFiresotore(uid, { tdee: calories });
    dispatch(setProfile({ tdee: calories }));
  }

  async function handleSaveCurrentWeight() {
    await updateProfileInFiresotore(uid, {
      startingWeight: String(currentWeight),
    });
    dispatch(setProfile({ startingWeight: String(currentWeight) }));
  }

  async function handleSaveWeightGoal() {
    await updateProfileInFiresotore(uid, {
      goalWeight: String(goalWeight),
    });
    dispatch(setProfile({ goalWeight: String(goalWeight) }));
  }

  function handleMealPlansPress() {
    navigation.navigate(Routes.SavedMealPlans);
  }
  return (
    <Layout style={[styles.layout, { backgroundColor: 'white' }]} paddingTop>
      <Container alwaysBounceVertical={false}>
        <ProfileDetailsContainer>
          <Image
            source={AvatarProfile}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
            }}
            resizeMode="contain"
          />
          <DetailsContainer>
            <Text
              variant="titleLarge"
              style={{ fontWeight: '600', color: 'black' }}>
              {profile.firstName}
            </Text>
            <Text
              variant="titleSmall"
              style={{ marginTop: 5, opacity: 0.8, color: 'black' }}>
              {profile.email}
            </Text>
          </DetailsContainer>
        </ProfileDetailsContainer>
        <SettingsContainer>
          <InputDropdown
            title="Weight Goal"
            value={Number(profile.goalWeight)}
            unit="kg"
            icon={<MaterialIcons name="edit" size={20} color="#4659b8" />}
            expandHeight={120}
            childStyle={{ alignItems: 'center' }}>
            <RulerPicker
              max={200}
              min={14}
              height={50}
              indicatorHeight={25}
              indicatorColor="#457ad7"
              step={1}
              unit="kg"
              unitTextStyle={{ fontSize: 12 }}
              valueTextStyle={{ fontSize: 18, fontWeight: '400' }}
              fractionDigits={0}
              gapBetweenSteps={25}
              initialValue={Number(profile.goalWeight)}
              shortStepHeight={10}
              onValueChange={value => setGoalWeight(Number(value))}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                padding: 5,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                marginVertical: 10,
              }}
              onPress={handleSaveWeightGoal}>
              <Text style={{ color: 'white', fontWeight: '500' }}>Save</Text>
            </TouchableOpacity>
          </InputDropdown>
          <Divider />
          <InputDropdown
            title="Current Weight"
            value={Number(profile.startingWeight)}
            unit="kg"
            icon={<MaterialIcons name="edit" size={20} color="#4659b8" />}
            expandHeight={120}
            childStyle={{ alignItems: 'center' }}>
            <RulerPicker
              max={200}
              min={14}
              height={50}
              indicatorHeight={25}
              indicatorColor="#457ad7"
              step={1}
              unit="kg"
              unitTextStyle={{ fontSize: 12 }}
              valueTextStyle={{ fontSize: 18, fontWeight: '400' }}
              fractionDigits={0}
              gapBetweenSteps={25}
              initialValue={Number(profile.goalWeight)}
              shortStepHeight={10}
              onValueChange={value => setCurrentWeight(Number(value))}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                padding: 5,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                marginVertical: 10,
              }}
              onPress={handleSaveCurrentWeight}>
              <Text style={{ color: 'white', fontWeight: '500' }}>Save</Text>
            </TouchableOpacity>
          </InputDropdown>
          <Divider />
          <InputDropdown
            title="Calories"
            value={Number(profile.tdee) ?? 2000}
            unit="kcal"
            icon={<MaterialIcons name="edit" size={20} color="#4659b8" />}
            expandHeight={120}
            childStyle={{ alignItems: 'center' }}>
            <RulerPicker
              max={5000}
              min={14}
              height={50}
              indicatorHeight={25}
              indicatorColor="#457ad7"
              step={10}
              unit="kcal"
              unitTextStyle={{ fontSize: 12 }}
              valueTextStyle={{ fontSize: 18, fontWeight: '400' }}
              fractionDigits={0}
              gapBetweenSteps={25}
              initialValue={Number(profile.tdee) ?? 2000}
              shortStepHeight={10}
              onValueChange={value => setCalories(Number(value))}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                padding: 5,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                marginVertical: 10,
              }}
              onPress={handleSaveCalories}>
              <Text style={{ color: 'white', fontWeight: '500' }}>Save</Text>
            </TouchableOpacity>
          </InputDropdown>
          <Divider />

          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
              height: 60,
              padding: 15,
              paddingRight: 20,
              borderBottomWidth: 0.3,
              borderBottomColor: 'grey',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name="ios-information-circle-outline"
                size={24}
                color="#4659b8"
              />
              <Text
                style={{
                  color: 'black',
                  marginLeft: 15,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                BMI
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#457ad7',
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                  color: 'white',
                }}>{`${bmi.bmiValue}`}</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 5,
                }}>
                {`/ ${bmi.bmiCategory}`}
              </Text>
            </View>
          </View>
          <CellRow
            title="Meal plans"
            onPress={handleMealPlansPress}
            icon={<Ionicons name="ios-newspaper" size={24} color="#4659b8" />}
          />

          <CellRow
            title="Log Out"
            onPress={handleSignOut}
            icon={<MaterialIcons name="logout" size={24} color="#4659b8" />}
            rightIcon={false}
          />
        </SettingsContainer>
      </Container>
    </Layout>
  );
}
