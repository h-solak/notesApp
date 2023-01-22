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
    <ScrollView className="h-full bg-red mt-4">
      {/* Two favorites */}
      <View className="height-52 flex-row items-center justify-between ">
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
      {/* Rest of the notes 🔥🍰#9BB693🍺#4F3F0D*/}
      <View className="mt-7 p-4 flex-row rounded-3xl items-center bg-lime-900">
        <View className="p-2 bg-white rounded-full">
          <Text className="text-4xl" style={{zIndex: 9999}}>
            🔥
          </Text>
        </View>
        <View className="px-4">
          <Text className="text-white text-xl font-bold">
            Meetings/Gatherings
          </Text>
          <Text className="text-slate-700 text-sm font-bold">
            Standart Note
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NotesList;
