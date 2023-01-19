import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Button, Surface, Text } from 'react-native-paper';
import { Layout } from '../../components/Layout';
import { useAuthStore } from '../../stores';
import { HeaderContainer, ItemColumn, styles } from './HomeScreen.style';

import MaterialIcons from 'react-native-vector-icons/Ionicons';
import { Item } from '../../components/Item';
import { Header } from '@react-navigation/stack';
import { AvatarProfile } from '../../assets/images';

import { format, getDay } from 'date-fns';

export function HomeScreen() {
  const user = useAuthStore(state => state.user);

  const [date, setDate] = useState(new Date());

  const formatedDate = format(date, 'dd');
  const day = format(date, 'EEEE');
  const month = format(date, 'LLLL');

  return (
    <Layout style={styles.container} paddingTop>
      <View style={{ flex: 1, margin: 20 }}>
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
          {/* <Avatar.Image
          source={AvatarProfile}
          size={40}
          style={{ borderWidth: 3 }}
        /> */}
        </HeaderContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 40 }}
          contentContainerStyle={{
            flexDirection: 'row',
            // flexWrap: 'wrap',
            // justifyContent: 'space-between',
          }}>
          <ItemColumn marginRight={15}>
            <Item
              title="Walk"
              progressTitle="steps"
              progressValue={3457}
              icon="flash-outline"
            />
            <Item
              horizontal
              title="Sleep"
              progressTitle="hour"
              progressValue={3.45}
              icon="moon-outline"
            />
          </ItemColumn>

          <ItemColumn>
            <Item
              horizontal
              title="Gym"
              progressTitle="min"
              progressValue={0}
              icon="ios-timer-outline"
            />
            <Item
              title="Calories"
              progressTitle="kcal"
              progressValue={345}
              icon="flash-outline"
            />
          </ItemColumn>
        </ScrollView>
      </View>
    </Layout>
  );
}
