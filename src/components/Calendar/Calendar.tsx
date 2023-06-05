import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
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
  const currentDate = new Date();
  // const b = currentDate.setDate(11);
  const [formatedData, setFormatedData] = useState(
    formatData(selectMonth(currentDate)),
  );
  const [selectedItem, setSelectedItem] = useState(
    format(currentDate, 'dd-MM-yyyy'),
  );

  function handleItemPress(id: string) {
    setSelectedItem(id);
  }

  const flatlistRef = useRef<FlatList>(null);

  useEffect(() => {
    // flatlistRef.current?.scrollToIndex({ index: 10 });
  }, []);

  const _renderItem: ListRenderItem<FormatedData> = ({ item }) => {
    const date = format(item.data, 'dd');
    const day = format(item.data, 'EE');

    const isActive = item.id === selectedItem;

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
        snapToAlignment="center"
        // initialScrollIndex={10}
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
