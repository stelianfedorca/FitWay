import {SvgProps} from 'react-native-svg';

export type TabProps = {
  onPress: () => void;
  label: string;
  // activeTintColor: string;
  icon: React.FC<SvgProps>;
};
