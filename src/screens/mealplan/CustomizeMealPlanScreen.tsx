import { View, Text, Pressable, ScrollView } from 'react-native';
import { Card, PrimaryButton } from '../../components';
import { InputRow } from '../../components/InputRow';
import { Layout } from '../../components/Layout';
import { Option, OptionGroup } from '../../components';
import { styles, Title } from './CustomizeMealPlanScreen.style';
import { useEffect, useState } from 'react';

import { Slider } from '@miblanchard/react-native-slider';
import DropDownPicker from 'react-native-dropdown-picker';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function CustomizeMealPlanScreen() {
  const [timeframeOption, setTimeframeOption] = useState(0);
  const [targetCalories, setTargetCalories] = useState(2000);

  function getMealPlan() {}

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);

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
          Generate a meal plan with three meals per day (breakfast, lunch, and
          dinner)
        </Title>
        <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: '400' }}>
          Choose the time frame
        </Text>
        <OptionGroup onPress={handleTimeOption}>
          <Option
            title="Day"
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              alignItems: 'center',
              marginBottom: 0,
              borderBottomWidth: 0.5,
            }}
            isSelected={timeframeOption === 0 ? true : false}
            onPress={() => setTimeframeOption(0)}
          />
          <Option
            title="Week"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              alignItems: 'center',
              marginBottom: 0,
              borderBottomWidth: 0.5,
            }}
            isSelected={timeframeOption === 1 ? true : false}
            onPress={() => setTimeframeOption(1)}
          />
        </OptionGroup>
        <View
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
            What are the target calories ?
          </Text>
          <Option
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
        />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <PrimaryButton
          title="Get the meal plan"
          icon={
            <MaterialIcons name="arrow-forward-ios" size={18} color="white" />
          }
          onPress={getMealPlan}
        />
      </View>
    </Layout>
  );
}
