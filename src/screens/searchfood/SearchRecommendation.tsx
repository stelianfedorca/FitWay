import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Layout } from '../../components/Layout';
import { SearchBar } from '../../components/SearchBar';
import { styles } from './SearchFoodScreen.style';

import { useEffect, useState } from 'react';
import { ListRecommendation } from '../../components/ListRecommendation';
import axios from 'axios';

const ENDPOINT_SEARCH_RECIPES_BY_INGREDIENTS =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients';
const API_KEY = '7ec3a999fdmsh6d184896218e6f1p1288c3jsn80b38429ed37';
const API_HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

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
      .get(ENDPOINT_SEARCH_RECIPES_BY_INGREDIENTS, {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
        params: {
          ingredients: 'chicken,rice,beans',
          number: '5',
          ignorePantry: 'true',
          ranking: '1',
        },
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
