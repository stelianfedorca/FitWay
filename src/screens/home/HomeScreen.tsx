import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { Layout } from '../../components/Layout';
import { useAuthStore } from '../../stores';
import { styles } from './HomeScreen.style';

export function HomeScreen() {
  const user = useAuthStore(state => state.user);
  console.log(user);
  return (
    <Layout style={styles.container} paddingTop>
      <ScrollView></ScrollView>
    </Layout>
  );
}
