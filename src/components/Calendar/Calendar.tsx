import { format } from 'date-fns';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  GestureResponderEvent,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { Pill } from '../Pill/Pill';

import { CarouselRenderItem } from 'react-native-reanimated-carousel/lib/typescript/types';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentDate,
  setCurrentDate,
} from '../../redux/slices/dateSlice';

export type FormatedData = {
  id: string;
  active: boolean;
  data: Date;
};

function selectMonth(date: Date) {
  return Array(31)
    .fill(new Date(date))
    .map((el, idx) => new Date(el.setDate(1 + idx)))
    .filter(el => el.getMonth() === date.getMonth());
}

function formatData(data: Date[]): FormatedData[] {
  const formatedData = data.map(element => {
    return {
      id: format(element, 'dd-MM-yyyy'),
      active: false,
      data: element,
    };
  });

  return formatedData;
}

export type CalendarProps = {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};
export function Calendar({ onPress, style }: CalendarProps) {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const selectedCurrentDate = useSelector(selectCurrentDate);
  const [formatedData, setFormatedData] = useState(
    formatData(selectMonth(currentDate)),
  );
  const [selectedItem, setSelectedItem] = useState(
    format(currentDate, 'dd-MM-yyyy'),
  );

  function handleItemPress(id: string) {
    setSelectedItem(id);
    dispatch(setCurrentDate(id));
  }

  const flatlistRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      flatlistRef.current?.scrollToIndex({
        index:
          formatedData.findIndex(item => item.id === selectedCurrentDate) - 3,
        animated: true,
      });
    }, 10);
  }, []);

  const _renderItem: ListRenderItem<FormatedData> = ({ item }) => {
    const date = format(item.data, 'dd');
    const day = format(item.data, 'EE');

    const isActive = item.id === selectedCurrentDate ?? selectedItem;

    return (
      <Pill<FormatedData>
        style={{ marginRight: 10 }}
        data={item}
        title={date}
        subtitle={day}
        active={isActive}
        onPress={() => handleItemPress(item.id)}
      />
    );
  };

  return (
    <View style={style}>
      <FlatList
        ref={flatlistRef}
        data={formatedData}
        renderItem={_renderItem}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={12}
        snapToAlignment="center"
        // pagingEnabled
        // onLayout={() =>
        //   flatlistRef.current?.scrollToOffset({ offset: 11, animated: false })
        // }
        // disableIntervalMomentum
        // getItemLayout={(data, index) => {
        //   return {
        //     length: 100,
        //     offset: 100 * index,
        //     index,
        //   };
        // }}
        // initialScrollIndex={8}
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          flatlistRef.current?.scrollToOffset({
            offset: index * averageItemLength,
            animated: true,
          });
        }}
      />
    </View>
  );
}
