import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Button, FAB, Surface, Text } from 'react-native-paper';
import { Layout } from '../../components/Layout';
import { useAuthStore, useProfileStore } from '../../stores';
import { HeaderContainer, ItemColumn, styles } from './HomeScreen.style';

import MaterialIcons from 'react-native-vector-icons/Ionicons';
import { Item } from '../../components/Item';
import { Header } from '@react-navigation/stack';
import { AvatarProfile } from '../../assets/images';

import { format, getDay } from 'date-fns';

export function HomeScreen() {
  const user = useAuthStore(state => state.user);
  const setProfile = useProfileStore(state => state.setProfile);
  const profile = useProfileStore(state => state.profile);

  const [date, setDate] = useState(new Date());

  const formatedDate = format(date, 'dd');
  const day = format(date, 'EEEE');
  const month = format(date, 'LLLL');

  return (
    <Layout style={styles.container} paddingTop>
      <View
        style={{
          flex: 1,
          margin: 10,
        }}>
        <HeaderContainer>
          <View>
            <Text
              variant="titleMedium"
              style={{ fontWeight: '500', fontSize: 18, letterSpacing: 0.8 }}>
              {`Hi, Stelian`}
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
            progressValue={345}
            icon="flash-outline"
          />
        </ScrollView>
      </View>
      {/* <FAB.Group
        open={isOpen}
        visible
        icon={isOpen ? 'plus' : 'plus'}
        actions={[
          {
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'email',
            label: 'Email',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        fabStyle={{
          backgroundColor: '#4659b8',
          borderRadius: 30,
        }}
        color="white"
      /> */}
    </Layout>
  );
}
