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
  Pressable,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

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
  const {height, width} = useWindowDimensions();
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor="#000"
      style={{margin: 0}}
      isVisible={colorPickerVisible}
      onBackdropPress={() => setColorPickerVisible(false)}
      onBackButtonPress={() => setColorPickerVisible(false)}>
      <View
        className="self-center px-4 flex-col justify-center rounded-t-lg border-t-2 border-t-noteGrey-500"
        style={{
          width: width,
          height: height * 0.2,
          position: 'absolute',
          bottom: 0,
          backgroundColor: `${noteDetails.color}`,
        }}>
        <Text className="text-white">Colors</Text>
        <View className="flex-row py-6 justify-between" style={{gap: 4}}>
          {allColors.map((item, index) => (
            <TouchableOpacity
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
                    ? 'border-2 border-white'
                    : 'border-noteGrey-300'
                }`}
                style={{
                  backgroundColor: item,
                  borderWidth: noteDetails.color === item ? 1.5 : 1,
                }}></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default NoteColorPicker;
