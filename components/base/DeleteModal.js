import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import ExclamationSvg from '../../assets/svg/svgrepoexclamation.svg';

const DeleteModal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  description,
  dispatch,
}) => {
  const {width, height} = useWindowDimensions();
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor="#000"
      isVisible={isModalOpen}
      onBackdropPress={() => setIsModalOpen(false)}>
      <View
        className="self-center justify-center items-center p-5 rounded-3xl bg-noteGrey-900"
        style={{gap: 8, width: width * 0.8}}>
        <ExclamationSvg width={width * 0.3} height={width * 0.3} />
        <View className="items-center justify-center" style={{gap: 4}}>
          <Text className="text-white font-bold text-base">{title}</Text>
          <Text className="text-noteGrey-300">{description}</Text>
        </View>
        <View
          className="flex-row justify-center items-center py-2"
          style={{gap: 12, width: width * 0.8}}>
          <TouchableOpacity
            className="border-2 border-transparent py-1 px-3 rounded-xl"
            onPress={() => setIsModalOpen(false)}>
            <Text className="text-white text-base">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border-2 border-red-700 bg-red-700 py-1 px-3 rounded-xl"
            onPress={() => {
              dispatch();
              setIsModalOpen(!isModalOpen);
            }}>
            <Text className="text-white text-base">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
