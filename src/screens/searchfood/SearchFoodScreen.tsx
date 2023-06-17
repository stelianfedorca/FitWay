import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  Keyboard,
} from 'react-native';
import { Layout } from '../../components/Layout';
import { List } from '../../components/List';
import { SearchBar } from '../../components/SearchBar';
import { useFoodCollection } from '../../hooks';
import { styles } from './SearchFoodScreen.style';

import Modal from 'react-native-modal';
import { DetailsModal } from '../../components/modals';
import { useEffect, useState } from 'react';
import {
  getProductInformation,
  searchProduct,
} from '../../services/food.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch } from '../../redux/slices/searchSlice';
import { Product } from '../../types/types';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SearchNavigationProp } from './Search.types';
import { selectLoading, setLoading } from '../../redux/slices/loadingSlice';
import Toast from 'react-native-toast-message';
import { selectFood, setFood } from '../../redux/slices/foodSlice';

export function isEmpty(str: string) {
  return !str || str.length === 0;
}

export function SearchFoodScreen() {
  // const result = useFoodCollection();
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const loading = useSelector(selectLoading);
  const navigation = useNavigation<SearchNavigationProp>();
  const selectedFood = useSelector(selectFood);

  const [isVisible, setIsVisible] = useState(false);

  function handleItemPress(item: Product) {
    dispatch(setFood(item));
    setIsVisible(!isVisible);
  }

  function goBack() {
    navigation.goBack();
  }

  useEffect(() => {
    dispatch(setLoading({ loading: false }));
  }, []);

  async function handleSearchPress(search: string) {
    dispatch(setLoading({ loading: true }));
    const data: Product[] = await searchProduct(search);

    if (data) dispatch(setLoading({ loading: false }));
    setProducts(data.slice(0, 9));
    Keyboard.dismiss();
  }

  const showToast = () => {
    // Toast.show({
    //   type: 'success',
    //   text1: 'Successfully added to diary',
    //   visibilityTime: 1500,
    // });
  };

  return (
    <Layout paddingBottom paddingTop style={styles.container}>
      <View
        style={{
          marginBottom: 20,
          paddingLeft: 5,
        }}>
        <IconButton
          style={{ backgroundColor: '#303030' }}
          icon="close"
          iconColor="white"
          size={20}
          onPress={goBack}
        />
      </View>
      <Pressable style={{ flex: 1 }}>
        <SearchBar
          style={{
            paddingHorizontal: 10,
            marginBottom: 20,
          }}
          onPress={() => handleSearchPress(search)}
        />
        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>
            Search results
          </Text>
        </View>
        {/* <Toast position="bottom" /> */}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <List
            contentStyle={{ paddingHorizontal: 10 }}
            data={isEmpty(search) ? [] : products}
            onItemPress={handleItemPress}
          />
        )}
        <Modal
          isVisible={isVisible}
          useNativeDriver
          backdropOpacity={0.3}
          onBackdropPress={() => setIsVisible(false)}
          animationOutTiming={700}
          animationInTiming={350}
          style={styles.modal}>
          <DetailsModal
            setModalVisible={setIsVisible}
            onSuccess={showToast}
            selectedFood={selectedFood}
          />
        </Modal>
      </Pressable>
    </Layout>
  );
}
