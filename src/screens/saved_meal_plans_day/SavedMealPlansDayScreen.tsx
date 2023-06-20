import { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';
import { MealPlanItem } from '../../components/MealPlanItem/MealPlanItem';
import { useMealPlanDetails } from '../../hooks/useMealPlanDetails';
import { useSavedMealPlans } from '../../hooks/useSavedMealPlans';
import { selectUid } from '../../redux/slices/userSlice';
import { MealPlanDayFirestore } from '../../types/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenNavigationProp } from '../profile/ProfileScreen.types';
import { SavedMealPlansItem } from '../../components/SavedMealPlansItem/SavedMealPlansItem';
import { MealPlanDetails } from '../../redux/slices/mealPlanSlice';

import Modal from 'react-native-modal';
import { DetailsModal } from '../../components/modals';
import { getMealDetails } from '../../services/mealplan.service';
import { Routes } from '../../navigators';

export type SavedMealPlansItemListProps = {
  mealPlan: MealPlanDayFirestore;
  onItemPress: (item: MealPlanDetails) => void;
};
function SavedMealPlansItemList({
  mealPlan,
  onItemPress,
}: SavedMealPlansItemListProps) {
  const mealPlanDetails = useMealPlanDetails(mealPlan);

  return (
    <SavedMealPlansItem
      mealPlan={mealPlan}
      mealPlanDetails={mealPlanDetails}
      isLoading={mealPlanDetails.length > 0 ? false : true}
      onItemPress={onItemPress}
    />
  );
}

function EmptyList() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 18, fontWeight: '500', color: 'grey' }}>
        No meal plans added
      </Text>
    </View>
  );
}

export function SavedMealPlansDayScreen() {
  const uid = useSelector(selectUid);
  const savedMealPlans = useSavedMealPlans(uid);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [isVisible, setIsVisible] = useState(false);

  const handleItemPress = async (item: MealPlanDetails) => {
    navigation.navigate(Routes.MealDetails, { item: item, saved: true });
  };

  const _renderItem: ListRenderItem<MealPlanDayFirestore> = ({ item }) => {
    return (
      <SavedMealPlansItemList mealPlan={item} onItemPress={handleItemPress} />
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Layout>
      <Pressable
        style={{
          flex: 1,
          // paddingTop: 50,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <FlatList
          data={savedMealPlans}
          renderItem={_renderItem}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ marginTop: 20 }} />}
          ListEmptyComponent={EmptyList}
        />

        {/* <Modal
          isVisible={isVisible}
          useNativeDriver
          backdropOpacity={0.3}
          onBackdropPress={() => setIsVisible(false)}
          animationOutTiming={700}
          animationInTiming={350}
          style={styles.modal}>
          <DetailsModal
            setModalVisible={setIsVisible}
            selectedFood={selectedFood}
          />
        </Modal> */}
      </Pressable>
    </Layout>
  );
}

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
});
