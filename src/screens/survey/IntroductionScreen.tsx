import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';
import { Routes } from '../../navigators';
import {
  ButtonsContainer,
  PrimaryButton,
  TitleButton,
} from './IntroductionScreen.style';
import { IntroductionScreenNavigationProp } from './IntroductionScreen.types';

export function IntroductionScreen() {
  const navigation = useNavigation<IntroductionScreenNavigationProp>();

  function handleContinue() {
    navigation.navigate(Routes.Survey);
  }
  return (
    <Layout paddingBottom paddingTop>
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          marginHorizontal: 20,
          paddingTop: 150,
          paddingBottom: 250,
        }}>
        <View>
          <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
            Almost There!
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              marginTop: 15,
              textAlign: 'center',
              fontSize: 16,
            }}>
            In order to proceed, we need a little more information about you.
          </Text>
        </View>

        <ButtonsContainer>
          <PrimaryButton onPress={handleContinue}>
            <TitleButton>Continue</TitleButton>
          </PrimaryButton>
        </ButtonsContainer>
      </View>
    </Layout>
  );
}
