import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

const NotesList = () => {
  const noteText =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia qui deserunt pariatur. Accusamus deserunt quibusdam voluptates corporis nam at? Tempore iste dolorum consequatur similique qui ad officia modi ipsam.';
  const notes = [
    noteText.slice(20),
    noteText.slice(50),
    noteText,
    noteText.slice(20),
    noteText.slice(50),
    noteText,
    noteText.slice(20),
    noteText.slice(50),
    noteText,
    noteText.slice(20),
    noteText.slice(50),
    noteText,
  ];
  return (
    <ScrollView className="basis-10/16 mt-2">
      {notes?.map(item => (
        <View className="bg-rose-300 py-3">
          <TextInput
            className="mt-2 px-2 bg-slate-50 text-base"
            numberOfLines={5}>
            {item.slice(20)}
          </TextInput>
        </View>
      ))}
    </ScrollView>
  );
};

export default NotesList;
