import React from 'react';
import { Image, ImageBackground, Pressable, View } from 'react-native';
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
import { CellRow } from '../../components/CellRow';
import { useAuthStore } from '../../stores';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';

import { signOut } from '../../services/auth.service';
export function ProfileScreen() {
  const dispatch = useDispatch();
  // const { logout } = useAuthStore.getState();
  async function handleSignOut() {
    signOut();
    dispatch(logout());
  }
  return (
    <Layout style={styles.layout} paddingTop>
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

          <IconButton
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
          />

          <DetailsContainer>
            <Text variant="titleLarge" style={{ fontWeight: '600' }}>
              Stelian Fedorca
            </Text>
            <Text variant="titleSmall" style={{ marginTop: 5, opacity: 0.8 }}>
              stelian.fedorca@gmail.com
            </Text>
          </DetailsContainer>
          <IconButton
            icon="pen"
            style={{
              position: 'absolute',
              top: -20,
              right: 20,
              borderWidth: 1,
            }}
            size={20}
            onPress={() => console.log('edit')}
          />
        </ProfileDetailsContainer>
        <ContentContainer>
          <Chip
            icon="information"
            mode="outlined"
            style={{ height: 40, backgroundColor: '#EDF1F9' }}
            onPress={() => console.log('Pressed')}>
            BMI: 24.82
          </Chip>
          <Chip
            icon="information"
            mode="outlined"
            style={{ height: 40, backgroundColor: '#EDF1F9' }}
            onPress={() => console.log('Pressed')}>
            TDEE: 2239 kCal
          </Chip>
        </ContentContainer>
        <SettingsContainer>
          <CellRow title="Log Out" onPress={handleSignOut} />
        </SettingsContainer>
      </Container>
    </Layout>
  );
}
