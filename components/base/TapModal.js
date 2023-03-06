import {View, Text, TouchableOpacity, Modal, Pressable} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const TapModal = ({modal, setModal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModal(!modal);
      }}>
      <View
        className="flex-col relative h-full w-full bottom-0"
        style={{backgroundColor: '#ffffff50'}}
        activeOpacity={1}
        onPressOut={() => {
          setModal(false);
        }}>
        <Pressable
          className="basis-4/6 bottom-0 w-full"
          onPress={() => setModal(!modal)}></Pressable>
        <View className="basis-2/6 bottom-0 w-full border-t-2 border-noteGrey-900 px-3">
          <Text className="mt-3">Colors</Text>
          <View className="flex-row py-3 gap-4 justify-between">
            <Text>AAA</Text>
          </View>
          <Pressable onPress={() => setModal(!modal)}>
            <Text className="mt-5 bg-gray-700 text-center">Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default TapModal;
