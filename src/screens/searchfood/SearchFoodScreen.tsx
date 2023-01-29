import { Pressable, Text, View } from 'react-native';
import { Layout } from '../../components/Layout';
import { List } from '../../components/List';
import { SearchBar } from '../../components/SearchBar';
import { useFoodCollection } from '../../hooks';
import { useFoodStore } from '../../stores';
import { styles } from './SearchFoodScreen.style';

export function SearchFoodScreen() {
  useFoodCollection();
  return (
    <Layout paddingBottom style={styles.container}>
      <Pressable style={{}}>
        <SearchBar style={{ paddingHorizontal: 10, marginBottom: 20 }} />
        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Search result</Text>
        </View>
        <List contentStyle={{ paddingHorizontal: 10 }} />
      </Pressable>
    </Layout>
  );
}
