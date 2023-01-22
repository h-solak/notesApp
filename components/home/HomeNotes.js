import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const NotesList = () => {
  const grey = {color: 'rgba(255,255,255,0.7)'};
  const noteText =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia qui deserunt pariatur. Accusamus deserunt quibusdam voluptates corporis nam at? Tempore iste dolorum consequatur similique qui ad officia modi ipsam.';
  const notes = [noteText.slice(20), noteText.slice(50), noteText];
  return (
    <View className="h-full bg-red mt-4">
      {/* Two favorites */}
      <View className="height-52 flex-row items-center justify-between">
        <View
          className="relative bg-notePurple rounded-3xl px-5 h-64"
          style={{width: '48%'}}>
          <TouchableOpacity
            className="absolute h-10 w-10 rounded-full items-center justify-center p-2"
            style={{
              right: 10,
              top: 10,
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}>
            <AntIcon name="hearto" size={22} style={grey} />
          </TouchableOpacity>
          <Text className="w-4/5 text-white font-bold text-xl mt-6 pr-2">
            Notes with Images
          </Text>

          <Text
            className="absolute text-base"
            style={{
              bottom: 0,
              left: '50%',
              // borderWidth: 2,
              // borderColor: '#ffffff',
            }}>
            Image here
          </Text>
        </View>
        <View
          className="relative bg-noteLemonGreen rounded-3xl px-5 h-64"
          style={{width: '48%'}}>
          <TouchableOpacity
            className="absolute h-10 w-10 rounded-full items-center justify-center p-2"
            style={{
              right: 10,
              top: 10,
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}>
            <AntIcon name="hearto" size={22} style={grey} />
          </TouchableOpacity>
          <Text className="w-4/5 text-white font-bold text-xl mt-6 pr-2">
            Today's Plan
          </Text>
        </View>
      </View>
      {/* Rest of the notes*/}
      <View
        className="mt-7 p-4 flex-row rounded-3xl items-center"
        style={{backgroundColor: '#eb4d4b'}}>
        <View className="p-2 bg-white rounded-full">
          <Text className="text-4xl" style={{color: '#000000', zIndex: 9999}}>
            🔥
          </Text>
        </View>
        <View className="px-4">
          <Text className="text-white text-base font-bold">
            Meetings/Gatherings
          </Text>
          <Text className="text-grey05 text-xs">Standart Note</Text>
        </View>
      </View>
      {/* This view will be a note component */}
      <View
        className="mt-3 p-4 flex-row rounded-3xl items-center"
        style={{backgroundColor: '#22a6b3'}}>
        <View className="p-2 bg-white rounded-full">
          <Text className="text-4xl" style={{color: '#000000', zIndex: 9999}}>
            🍰
          </Text>
        </View>
        <View className="px-4">
          <Text className="text-white text-base font-bold">Birthday Dates</Text>
          <Text className="text-grey05 text-xs">Standart Note</Text>
        </View>
      </View>
      <View
        className="mt-3 p-4 flex-row rounded-3xl items-center"
        style={{backgroundColor: '#e1b12c'}}>
        <View className="p-2 bg-white rounded-full">
          <Text className="text-4xl" style={{color: '#000000', zIndex: 9999}}>
            🍺
          </Text>
        </View>
        <View className="px-4">
          <Text className="text-white text-base font-bold">
            Best Places For a Drink in LA
          </Text>
          <Text className="text-grey05 text-xs">Standart Note</Text>
        </View>
      </View>
    </View>
  );
};

export default NotesList;
