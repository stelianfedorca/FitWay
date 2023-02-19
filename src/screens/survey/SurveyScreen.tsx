import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { InputRow } from '../../components/InputRow';
import { ExpandedItem } from '../../components/InputRow/InputRow.style';
import { Layout } from '../../components/Layout';
import { Option } from '../../components/Option';
import { Stacks } from '../../navigators/Routes';
import { createUserInFirestore } from '../../services/auth.service';
import { useAuthStore, useProfileStore } from '../../stores';
import { getTDEE } from '../../utils/calculator';
import { ACTIVITY_LEVEL, GENDER } from '../../utils/consts';
import { HomeNavigationProp } from '../home/Home.types';
import {
  ButtonContainer,
  Container,
  PrimaryButton,
  RowContainer,
  TitleButton,
} from './SurveyScreen.style';
import { SurveyScreenNavigationProp } from './SurveyScreen.types';
import auth from '@react-native-firebase/auth';
import {
  ProfileState,
  setIsSurveyCompleted,
} from '../../redux/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';

export type ActivityLevelProps = {
  id: number;
  title: string;
  subtitle: string;
  value: number;
};

const activityLevelData: ActivityLevelProps[] = [
  {
    id: 1,
    title: 'Sedentary',
    subtitle: 'You spend most of your day sitting',
    value: 1.2,
  },
  {
    id: 2,
    title: 'Lightly Active',
    subtitle: 'You will spend a large part of your day on your feet',
    value: 1.375,
  },
  {
    id: 3,
    title: 'Moderately Active',
    subtitle: 'You do cardio 3 to 5 days a week',
    value: 1.55,
  },
  {
    id: 4,
    title: 'Very Active',
    subtitle: 'You do intentional exercise every day',
    value: 1.9,
  },
];

export type UserProfile = {
  email?: string | null;
  firstName?: string;
  gender?: string;
  age?: string;
  startingWeight?: string;
  height?: string;
  activityLevel?: string;
  goalWeight?: string;
  isSurveyCompleted?: boolean;
  tdee?: number;
  food?: number;
  exercise?: number;
};

export function SurveyScreen() {
  const dispatch = useDispatch();
  const [genderIndex, setGenderIndex] = useState(0);
  const [age, setAge] = useState('');
  const [startingWeight, setStartingWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState(0);

  const [loading, setLoading] = useState(false);

  const setProfile = useProfileStore(state => state.setProfile);
  const profile = useProfileStore(state => state.profile);

  // const user = useAuthStore(state => state.user);
  const user = useSelector(selectUser);

  const navigation = useNavigation<SurveyScreenNavigationProp>();

  async function handleContinue() {
    setLoading(true);
    const tdee = getTDEE(
      Number(startingWeight),
      Number(height),
      Number(age),
      GENDER[genderIndex],
      activityLevelData[activityLevel].value,
    );
    // if (profile) {
    const userProfile: UserProfile = {
      gender: GENDER[genderIndex],
      age: age,
      startingWeight: startingWeight,
      height: height,
      goalWeight: goalWeight,
      activityLevel: ACTIVITY_LEVEL[activityLevel],
      isSurveyCompleted: true,
      tdee: Number(tdee),
      email: user,
    };

    if (user) {
      await createUserInFirestore(
        user.uid,
        // updatedProfile.firstName,
        userProfile.email!,
        userProfile.isSurveyCompleted!,
        // userProfile.tdee
      );
    }
    dispatch(
      setIsSurveyCompleted({
        isSurveyCompleted: userProfile.isSurveyCompleted,
      }),
    );
    // setProfile(updatedProfile);
    // }
    setLoading(false);
    navigation.navigate(Stacks.Home);
  }

  return (
    <Layout paddingBottom paddingTop>
      <Container>
        {/* <View style={{ flex: 1, borderWidth: 1 }}> */}
        <View
          style={{
            height: 100,
            paddingHorizontal: 15,
            justifyContent: 'center',
            marginVertical: 15,
          }}>
          <Text
            variant="titleMedium"
            style={{ marginBottom: 10, color: '#668ecf', fontWeight: '600' }}>
            Gender
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: genderIndex === 0 ? '#457ad7' : '#eef4fe',
              }}
              onPress={() => setGenderIndex(0)}>
              <Text
                style={{
                  color: genderIndex === 0 ? 'white' : '#a9c0e8',
                  fontWeight: 'bold',
                }}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderLeftWidth: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: genderIndex === 1 ? '#457ad7' : '#eef4fe',
              }}
              onPress={() => setGenderIndex(1)}>
              <Text
                style={{
                  color: genderIndex === 1 ? 'white' : '#a9c0e8',
                  fontWeight: 'bold',
                }}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider bold />
        <InputRow title="Age" value={age} onChangeText={setAge} />
        <Divider bold />
        <InputRow
          title="Starting Weight"
          value={startingWeight}
          onChangeText={setStartingWeight}
        />
        <Divider bold />
        <InputRow title="Height" value={height} onChangeText={setHeight} />

        <Divider bold />
        <InputRow
          title="Goal Weight"
          value={goalWeight}
          onChangeText={setGoalWeight}
        />

        <Divider bold />
        <InputRow
          title="Activity Level"
          setOptionIndex={setActivityLevel}
          dropdown
          optionIndex={activityLevel}
          data={activityLevelData}
        />

        <Divider bold />
        {/* </View> */}

        <ButtonContainer>
          <PrimaryButton onPress={handleContinue}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <TitleButton>Continue</TitleButton>
            )}
          </PrimaryButton>
        </ButtonContainer>
      </Container>
    </Layout>
  );
}

// export const styles = StyleSheet.create({
//   indicatorWrapper: {
//     position: 'absolute',
//     bottom: 34,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: indicatorWidth,
//   },

//   segmentIndicator: {
//     height: indicatorHeight,
//     backgroundColor: 'turquoise',
//   },

//   segment: {
//     width: segmentWidth,
//   },

//   ageTextStyle: {
//     fontSize: 42,
//   },
// });

/*        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={snapSegment}
          contentContainerStyle={{
            justifyContent: 'flex-end',
          }}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}>
          <Ruler />
        </Animated.ScrollView>
        <View
          style={[
            styles.indicatorWrapper,
            { left: (width - indicatorWidth) / 2 },
          ]}>
          <TextInput
            ref={textInputRef}
            style={styles.ageTextStyle}
            defaultValue={minAge.toString()}
          />
          <View style={[styles.segmentIndicator, styles.segment]} />
        </View> */
