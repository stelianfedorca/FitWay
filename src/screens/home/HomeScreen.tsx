import React from 'react';
import {
  Pressable,
  ScrollView,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { Layout } from '../../components/Layout';
import { useAuthStore } from '../../stores';
import { HeaderContainer, ItemColumn, styles } from './HomeScreen.style';

import MaterialIcons from 'react-native-vector-icons/Ionicons';
import { Item } from '../../components/Item';
import { Header } from '@react-navigation/stack';

export function HomeScreen() {
  const user = useAuthStore(state => state.user);
  console.log(user);
  return (
    <Layout style={styles.container} paddingTop>
      <HeaderContainer>
        <Text
          variant="titleMedium"
          style={{ fontWeight: '500', fontSize: 18, letterSpacing: 0.8 }}>
          Hi, Stelian
        </Text>
        <Text
          variant="labelLarge"
          style={{ fontWeight: '500', color: '#88898b', letterSpacing: 0.8 }}>
          Monday, 23 August
        </Text>
      </HeaderContainer>
      <ScrollView
        style={{ marginTop: 40 }}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          // justifyContent: 'space-between',
        }}>
        <ItemColumn marginRight={15}>
          <Item
            title="Walk"
            progressTitle="steps"
            progressValue={3457}
            icon=""
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
    </Layout>
  );
}
