import { ReactNode } from 'react';
import {
  KeyboardType,
  NativeSyntheticEvent,
  StyleProp,
  TextInputKeyPressEventData,
  ViewStyle,
} from 'react-native';
import { string } from 'yup';

export interface InputRowProps {
  optionIndex?: number;
  data?: string[];
  children?: ReactNode;
  dropdown?: boolean;
  title?: string;
  value?: string;
  accessibilityLabel?: string;
  accessibilityLabelError?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  blurOnSubmit?: boolean;
  clearTextOnFocus?: boolean;
  helperText?: string;
  disableValueTransition?: boolean;
  disabled?: boolean;
  editable?: boolean;
  error?: boolean;
  focused?: boolean;
  keyboardType?: KeyboardType;
  label?: string;
  maxLength?: number;
  multiline?: boolean;
  password?: boolean;
  readonly?: boolean;
  style?: StyleProp<ViewStyle>;
  setOptionIndex?: React.Dispatch<React.SetStateAction<number>>;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyPress?: (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => void;
  onMeasure?: (height: number) => void;
  onPress?: () => void;
  onRightPress?: () => void;
  onSubmit?: () => void;
}
