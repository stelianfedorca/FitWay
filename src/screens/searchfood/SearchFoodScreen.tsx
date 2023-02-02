import { Pressable, Text, View } from 'react-native';
import { Layout } from '../../components/Layout';
import { List } from '../../components/List';
import { SearchBar } from '../../components/SearchBar';
import { useFoodCollection } from '../../hooks';
import { useFoodStore } from '../../stores';
import { styles } from './SearchFoodScreen.style';

import Modal from 'react-native-modal';
import { DetailsModal } from '../../components/modals';
import { useEffect, useState } from 'react';

export function SearchFoodScreen() {
  const result = useFoodCollection();

  const [isVisible, setIsVisible] = useState(false);

  function handleItemPress() {
    setIsVisible(!isVisible);
  }

  return (
    <Layout paddingBottom style={styles.container}>
      <Pressable style={{ flex: 1 }}>
        <SearchBar style={{ paddingHorizontal: 10, marginBottom: 20 }} />
        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Search result</Text>
        </View>
        <List
          contentStyle={{ paddingHorizontal: 10 }}
          data={result}
          onItemPress={handleItemPress}
        />
        <Modal
          isVisible={isVisible}
          useNativeDriver
          backdropOpacity={0.3}
          onBackdropPress={() => setIsVisible(false)}
          style={styles.modal}>
          <DetailsModal />
        </Modal>
      </Pressable>
    </Layout>
  );
}
