import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {useSelector} from 'react-redux';

const TaskCalendar = ({selectedDate, setSelectedDate}) => {
  const {height, width} = useWindowDimensions();
  const allTasks = useSelector(state => state.note.allTasks);

  return (
    <Calendar
      onDayPress={day => {
        setSelectedDate(day.dateString);
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          disableTouchEvent: true,
          selectedDotColor: 'orange',
        },
      }}
      style={{
        height: height * 0.45,
      }}
      theme={{
        backgroundColor: '#00000000',
        calendarBackground: '#00000000',
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#A824D3',
        selectedDayTextColor: '#fff',
        todayTextColor: '#A824D3',
        dayTextColor: '#ffffff',
        textDisabledColor: '#ffffff50',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: '#fff',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: '#ffffff',
        indicatorColor: 'blue',
        // textDayFontFamily: 'monospace',
        // textMonthFontFamily: 'monospace',
        // textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
      }}
    />
  );
};

export default TaskCalendar;

// <View className="flex-row flex-wrap bg-white30 py-5">
//         {days.map((day, index) => (
//           <TouchableOpacity
//             key={index}
//             className="justify-start items-center border-b border-noteGrey-300"
//             style={{
//               height: (width / 7) * 1.2,
//               width: width / 7,
//               backgroundColor: '#242424',
//             }}
//             activeOpacity={0.8}
//             underlayColor="#000">
//             <View
//               className="flex-col items-center justify-around"
//               style={{height: width / 7, width: width / 7}}>
//               <Text>{day}</Text>
//               {index / 3 === 0 && (
//                 <View className="absolute bottom-2 h-1 w-1 text-xl bg-fuchsia-500"></View>
//               )}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
