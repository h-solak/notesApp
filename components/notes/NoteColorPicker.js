import React, {useState, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const NoteColorPicker = ({
  noteDetails,
  setNoteDetails,
  colorPickerVisible,
  setColorPickerVisible,
}) => {
  const allColors = [
    '#000000',
    '#2c3e50',
    '#273c75',
    '#451a57',
    '#01614c',
    '#944826',
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={colorPickerVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setColorPickerVisible(!colorPickerVisible);
      }}>
      <View
        className="flex-col relative h-full w-full bottom-0"
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        activeOpacity={1}
        onPressOut={() => {
          setColorPickerVisible(false);
        }}>
        <Pressable
          className="basis-4/6 bottom-0 w-full"
          onPress={() =>
            setColorPickerVisible(!colorPickerVisible)
          }></Pressable>
        <View
          className="basis-2/6 bottom-0 w-full border-t-2 border-noteGrey-900 px-3"
          style={{backgroundColor: `${noteDetails.color}`}}>
          <Text className="mt-3">Colors</Text>
          <View className="flex-row py-3 gap-4 justify-between">
            {allColors.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setNoteDetails(noteDetails => ({
                    ...noteDetails,
                    color: item,
                  }));
                }}>
                <View
                  className={`h-8 w-8 rounded-full ${
                    noteDetails.color === item
                      ? 'border-gray-50'
                      : 'border-gray-400'
                  }`}
                  style={{
                    backgroundColor: item,
                    borderWidth: noteDetails.color === item ? 1.5 : 1,
                  }}></View>
              </Pressable>
            ))}
          </View>
          <Text>Emojis</Text>
          <Pressable onPress={() => setColorPickerVisible(!colorPickerVisible)}>
            <Text className="mt-5 bg-gray-700 text-center">Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default NoteColorPicker;
