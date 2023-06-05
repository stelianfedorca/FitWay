import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { Layout } from '../../components/Layout';
import { useProfileStore } from '../../stores';
import { HeaderContainer, styles } from './HomeScreen.style';

import { Item } from '../../components/Item';
import { AvatarProfile } from '../../assets/images';

import { format } from 'date-fns';
import { getRemainingCalories } from '../../utils/calculator';
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

export function HomeScreen() {
  const profile = useProfileStore(state => state.profile);
  const navigation = useNavigation<HomeNavigationProp>();

  const userProfileName = useSelector(selectFirstName);
  const tdee = useSelector(selectTdee);
  const userProfile = useSelector(selectProfile);

  const [date] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  function handleStateChange() {
    setIsOpen(!isOpen);
  }

  const formatedDate = format(date, 'dd');
  const day = format(date, 'EEEE');
  const month = format(date, 'LLLL');

  const remainingCalories = getRemainingCalories(1111, tdee, profile?.exercise);

  console.log('profile: ', userProfile);

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
            <Text
              variant="titleMedium"
              style={{ fontWeight: '500', fontSize: 18, letterSpacing: 0.8 }}>
              {`Hi, ${userProfileName}`}
            </Text>
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
            progressValue={2222}
            icon="flash-outline"
            max={tdee}
          />
          <ItemStatistics title="Macros">
            <CircularProgressComponent
              progressValue={220}
              max={245.9}
              progressTitle="Grams"
              textTop="Carbs"
              textBottom="40%"
              activeStrokeColor="#3db9d5"
            />
            <CircularProgressComponent
              progressValue={50}
              max={68.3055555556}
              progressTitle="Grams"
              textTop="Fat"
              textBottom="25%"
              activeStrokeColor="#4a62d8"
            />
            <CircularProgressComponent
              progressValue={50}
              max={215.1625}
              progressTitle="Grams"
              textTop="Protein"
              textBottom="35%"
              activeStrokeColor="#d38723"
            />
          </ItemStatistics>
        </ScrollView>
      </View>
      <FAB.Group
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
      />
    </Layout>
  );
}
