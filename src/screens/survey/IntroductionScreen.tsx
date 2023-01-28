import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Layout } from '../../components/Layout';
import { Routes } from '../../navigators';
import { useProfileStore } from '../../stores';
import {
  ButtonsContainer,
  PrimaryButton,
  SecondaryButton,
  TitleButton,
} from './IntroductionScreen.style';
import { IntroductionScreenNavigationProp } from './IntroductionScreen.types';

export function IntroductionScreen() {
  const navigation = useNavigation<IntroductionScreenNavigationProp>();
  const profile = useProfileStore(state => state.profile);

  console.log('profile: ', profile);

  function handleContinue() {
    navigation.navigate(Routes.Survey);
  }
  return (
    <Layout paddingBottom paddingTop>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          marginHorizontal: 20,
          paddingTop: 150,
        }}>
        <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
          Almost There!
        </Text>
        <Text
          variant="bodyLarge"
          style={{ marginTop: 15, textAlign: 'center' }}>
          In order to proceed, we need a little more information about you.
        </Text>

        <ButtonsContainer>
          <PrimaryButton onPress={handleContinue}>
            <TitleButton>Continue</TitleButton>
          </PrimaryButton>
        </ButtonsContainer>
      </View>
    </Layout>
  );
}
