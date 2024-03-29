import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import {
  InputDropdown,
  Option,
  OptionGroup,
  PrimaryButton,
} from '../../components';
import { Layout } from '../../components/Layout';
import { ButtonTitle, styles, Title } from './CustomizeMealPlanScreen.style';

import { Slider } from '@miblanchard/react-native-slider';

import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '../../navigators';
import { setMealPlan } from '../../redux/slices/mealPlanSlice';
import { selectTdee } from '../../redux/slices/profileSlice';
import { getMealPlan } from '../../services/mealplan.service';
import { TimeFrame } from '../../utils/consts';
import { MealPlanScreenNavigationProp } from './MealPlan.types';

export const mappedTimeFrame: Record<number, TimeFrame> = {
  0: 'day',
  1: 'week',
};

// const mappedTimeFrame = ['day', 'week'];

export function CustomizeMealPlanScreen() {
  // const profile = useProfileStore(state => state.profile);
  const tdee = useSelector(selectTdee);

  const [timeframeOption, setTimeframeOption] = useState(0);
  const [targetCalories, setTargetCalories] = useState(tdee || 2000);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<MealPlanScreenNavigationProp>();
  const dispatch = useDispatch();

  async function fetchMealPlan() {
    setIsLoading(true);
    const mealPlanData = await getMealPlan(
      mappedTimeFrame[timeframeOption],
      targetCalories,
    );

    if (mealPlanData) {
      setIsLoading(false);
      dispatch(
        setMealPlan({
          mealPlanPerDay: mealPlanData,
          selectedTargetCalories: targetCalories,
        }),
      );
      navigation.navigate(Routes.MealPlan, { caloricTarget: targetCalories });
    }
  }

  function handleTimeOption() {}
  return (
    <Layout paddingBottom paddingTop style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: 'flex-start',
        }}>
        <Title>
          Generate a meal plan with three meals per day (breakfast, lunch and
          dinner)
        </Title>
        <OptionGroup
          onPress={handleTimeOption}
          style={{
            marginBottom: 20,
            // //shadow
            shadowColor: 'black',
            shadowRadius: 2,
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.2,
          }}>
          {/* <Option
            title="Day"
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              alignItems: 'center',
              marginBottom: 0,
            }}
            isSelected={timeframeOption === 0 ? true : false}
            onPress={() => setTimeframeOption(0)}
          /> */}
          {/* <Option
            title="Week"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              alignItems: 'center',
              marginBottom: 0,
            }}
            isSelected={timeframeOption === 1 ? true : false}
            onPress={() => setTimeframeOption(1)}
          /> */}
        </OptionGroup>
        <InputDropdown
          value={targetCalories}
          title="Choose the caloric target"
          unit="kcal"
          style={{
            backgroundColor: '#f1f1f1',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            // borderRadius: 10,
            // //shadow
            // shadowColor: 'black',
            // shadowRadius: 2,
            // shadowOffset: {
            //   width: 2,
            //   height: 2,
            // },
            // shadowOpacity: 0.3,
          }}
          childStyle={{
            backgroundColor: '#f1f1f1',
            paddingHorizontal: 15,
          }}
          labelStyle={{
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          unitLabel={{ backgroundColor: '#e6e6e6' }}>
          <Slider
            value={targetCalories}
            onValueChange={value => setTargetCalories(value[0])}
            animateTransitions={true}
            maximumValue={7000}
            step={50}
          />
        </InputDropdown>
        <Divider bold />
        {/* <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: '400' }}>
          Choose the time frame
        </Text> */}

        {/* <View
          style={{
            marginTop: 40,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              marginRight: 10,
            }}>
            Select the caloric target
          </Text>
          <Option
            disabled
            title={String(targetCalories)}
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              alignItems: 'center',
              marginBottom: 0,
            }}
            isSelected={true}
          />
        </View>
        <Slider
          value={targetCalories}
          onValueChange={value => setTargetCalories(value[0])}
          animateTransitions={true}
          maximumValue={7000}
          step={50}
        /> */}
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <PrimaryButton
          // title="Get the meal plan"
          icon={
            <MaterialIcons name="arrow-forward-ios" size={18} color="white" />
          }
          style={styles.shadowButton}
          onPress={fetchMealPlan}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <ButtonTitle>Get the meal plan</ButtonTitle>
          )}
        </PrimaryButton>
      </View>
    </Layout>
  );
}
