import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Layout } from '../../components/Layout';
import { List } from '../../components/List';
import { SearchBar } from '../../components/SearchBar';
import { useFoodCollection } from '../../hooks';
import { useFoodStore } from '../../stores';
import { styles } from './SearchFoodScreen.style';

import Modal from 'react-native-modal';
import { DetailsModal } from '../../components/modals';
import { useEffect, useState } from 'react';
import { ListRecommendation } from '../../components/ListRecommendation';
import axios from 'axios';

export function SearchRecommendation() {
  const [data, setData] = useState([]);
  // const result = useFoodCollection();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleItemPress() {
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    axios
      .get('https://edamam-recipe-search.p.rapidapi.com/search', {
        headers: {
          'X-RapidAPI-Key':
            '7ec3a999fdmsh6d184896218e6f1p1288c3jsn80b38429ed37',
          'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
        },
        params: { q: 'vegetables beef' },
      })
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout paddingBottom style={styles.container}>
      <Pressable style={{ flex: 1 }}>
        <SearchBar style={{ paddingHorizontal: 10, marginBottom: 20 }} />
        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Search result</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ListRecommendation
            contentStyle={{ paddingHorizontal: 10 }}
            data={data}
            onItemPress={handleItemPress}
            onImagesLoaded={() => setIsLoading(false)}
          />
        )}
      </Pressable>
    </Layout>
  );
}
