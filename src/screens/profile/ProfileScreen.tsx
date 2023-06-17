import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Chip,
  FAB,
  IconButton,
  Text,
} from 'react-native-paper';
import { AvatarProfile, ProfileBackgroundImage } from '../../assets/images';
import { Layout } from '../../components/Layout';
import {
  Container,
  ContentContainer,
  DetailsContainer,
  ProfileDetailsContainer,
  SettingsContainer,
  styles,
} from './ProfileScreen.style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CellRow } from '../../components/CellRow';
import { useAuthStore } from '../../stores';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUid } from '../../redux/slices/userSlice';

import { signOut } from '../../services/user.service';
import { selectProfile } from '../../redux/slices/profileSlice';
import { reset } from '../../redux/slices/mealPlanSlice';
import { calculateBMI } from '../../utils/calculator';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenNavigationProp } from './ProfileScreen.types';
import { Routes } from '../../navigators';
import { useSavedMealPlans } from '../../hooks/useSavedMealPlans';
import { Option } from '../../components';
export function ProfileScreen() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
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

  function handleEditGoalsPress() {}

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

          {/* <IconButton
            icon="plus"
            size={22}
            style={{
              position: 'absolute',
              top: 60,
              left: 75,
              borderRadius: 20,
              opacity: 0.9,
              backgroundColor: '#EBE9EF',
            }}
            onPress={() => console.log('press')}
          /> */}

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
          {/* <IconButton
            icon="pen"
            style={{
              position: 'absolute',
              top: -20,
              right: 20,
              borderWidth: 1,
            }}
            size={20}
            onPress={() => console.log('edit')}
          /> */}
        </ProfileDetailsContainer>
        <SettingsContainer>
          {/* <CellRow
            title="Edit goals"
            onPress={handleEditGoalsPress}
            icon={<FontAwesome name="edit" size={24} color="#4659b8" />}
          /> */}
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
                Weight Goal
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#4659b8',
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                  color: 'white',
                }}>{`${profile.goalWeight}`}</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 5,
                }}>
                kg
              </Text>
            </View>
          </View>
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
                Calories Goal
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#4659b8',
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                  color: 'white',
                }}>{`${profile.tdee}`}</Text>
            </View>
          </View>
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
                backgroundColor: '#4659b8',
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
