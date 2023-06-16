import { useEffect } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
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

export type SavedMealPlansItemListProps = {
  mealPlan: MealPlanDayFirestore;
};
function SavedMealPlansItemList({ mealPlan }: SavedMealPlansItemListProps) {
  const mealPlanDetails = useMealPlanDetails(mealPlan);

  return (
    <SavedMealPlansItem
      mealPlan={mealPlan}
      mealPlanDetails={mealPlanDetails}
      isLoading={mealPlanDetails.length > 0 ? false : true}
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

  const _renderItem: ListRenderItem<MealPlanDayFirestore> = ({ item }) => {
    return <SavedMealPlansItemList mealPlan={item} />;
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
      </Pressable>
    </Layout>
  );
}
