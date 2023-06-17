import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  Text as AnotherText,
} from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { Layout } from '../../components/Layout';
import { useProfileStore } from '../../stores';
import { HeaderContainer, styles } from './HomeScreen.style';

import { Item } from '../../components/Item';
import { AvatarProfile } from '../../assets/images';

import { format } from 'date-fns';
import {
  calculateCalories,
  calculateTotalFat,
  getRemainingCalories,
} from '../../utils/calculator';
import { ItemStatistics } from '../../components/ItemStatistics';
import { CircularProgressComponent } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from './Home.types';
import { Routes } from '../../navigators';
import { useSelector } from 'react-redux';
import {
  selectFirstName,
  selectProfile,
  selectTdee,
} from '../../redux/slices/profileSlice';
import { selectUid } from '../../redux/slices/userSlice';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectDiaryFood } from '../../redux/slices/diarySlice';
import { useMacros } from '../../hooks/useMacros';

export function HomeScreen() {
  const profile = useProfileStore(state => state.profile);
  const navigation = useNavigation<HomeNavigationProp>();
  const diaryFood = useSelector(selectDiaryFood);
  // const totalMacros = useMacros(diaryFood);

  const userProfileName = useSelector(selectFirstName);
  const tdee = useSelector(selectTdee);
  const userProfile = useSelector(selectProfile);

  const [date] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  function handleStateChange() {
    // setIsOpen(!isOpen);
  }

  function onSearchPress() {
    navigation.navigate(Routes.Search);
  }

  const formatedDate = format(date, 'dd');
  const day = format(date, 'EEEE');
  const month = format(date, 'LLLL');

  const remainingCalories = getRemainingCalories(
    userProfile.caloricIntake ?? 0,
    tdee,
  );

  // const { fat, protein, carbs } = calculateMacros(diaryFood);
  const totalMacrosConsumed = {
    fat: 10,
    protein: 23,
    carbs: 18,
  };

  return (
    <Layout style={styles.container} paddingTop>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          // margin: 10,
        }}>
        <HeaderContainer>
          <View>
            {/* <Text
              variant="titleMedium"
              style={{ fontWeight: '500', fontSize: 18, letterSpacing: 0.8 }}>
              {`Hi, ${userProfileName}`}
            </Text> */}
            <AnotherText style={{ fontSize: 18 }}>
              {`Hi, ${userProfileName}`}
            </AnotherText>
            <Text
              variant="labelLarge"
              style={{
                fontWeight: '500',
                color: '#88898b',
                letterSpacing: 0.8,
              }}>
              {`${day}, ${formatedDate} ${month}`}
            </Text>
          </View>
          <Image
            source={AvatarProfile}
            style={{
              width: 50,
              height: '100%',
              borderRadius: 15,
              borderWidth: 3,
              borderColor: '#F3F3F3',
            }}
            resizeMode="contain"
          />
        </HeaderContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 40 }}
          contentContainerStyle={{
            padding: 10,
          }}>
          <Item
            title="Calories"
            progressTitle="Remaining"
            progressValue={remainingCalories}
            icon="flash-outline"
            max={tdee}
            food={calculateCalories(diaryFood)}
          />
          <ItemStatistics title="Macronutrients">
            <CircularProgressComponent
              progressValue={userProfile.macrosIntake?.carbs ?? 0}
              max={userProfile.macros?.carbs}
              progressTitle="Grams"
              textTop="Carbs"
              textBottom={`${userProfile.macros?.carbsProcentage}%`}
              activeStrokeColor="#3db9d5"
            />
            <CircularProgressComponent
              progressValue={userProfile.macrosIntake?.fat ?? 0}
              max={userProfile.macros?.fat}
              progressTitle="Grams"
              textTop="Fat"
              textBottom={`${userProfile.macros?.fatProcentage}%`}
              activeStrokeColor="#4a62d8"
            />
            <CircularProgressComponent
              progressValue={userProfile.macrosIntake?.protein ?? 0}
              max={userProfile.macros?.protein}
              progressTitle="Grams"
              textTop="Protein"
              textBottom={`${userProfile.macros?.proteinProcentage}%`}
              activeStrokeColor="#d38723"
            />
          </ItemStatistics>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          backgroundColor: '#4659b8',
          width: 55,
          height: 55,
          borderRadius: 30,
          //shadow
          shadowColor: 'black',
          shadowRadius: 3,
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.3,
        }}
        onPress={onSearchPress}>
        <Ionicons
          name="ios-search"
          style={{
            position: 'absolute',
            bottom: 15,
            right: 15,
          }}
          color="white"
          size={24}
        />
      </TouchableOpacity>

      {/* <FAB.Group
        open={isOpen}
        visible
        icon={isOpen ? 'close' : 'plus'}
        actions={[
          {
            icon: 'food',
            label: 'Recommend meals',
            onPress: () => navigation.navigate(Routes.Recommendation),
          },
          {
            icon: 'food',
            label: 'Search for a food',
            onPress: () => navigation.navigate(Routes.Search),
          },
        ]}
        onStateChange={handleStateChange}
        fabStyle={{
          backgroundColor: '#4659b8',
          borderRadius: 30,
        }}
        color="white"
        style={{ bottom: -20 }}
        onPress={() => navigation.navigate(Routes.Search)}
      /> */}
    </Layout>
  );
}
