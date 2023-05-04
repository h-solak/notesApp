import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const TaskModal = ({isModalOpen, setIsModalOpen, selectedTask}) => {
  const {height, width} = useWindowDimensions();
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor="#000"
      isVisible={isModalOpen}
      onBackdropPress={() => setIsModalOpen(false)}
      onBackButtonPress={() => setIsModalOpen(false)}
      style={{margin: 0}}>
      <View
        className="bg-noteGrey-900 self-center rounded-3xl px-4 py-4"
        style={{height: height * 0.5, width: width * 0.9}}>
        <View className="flex-row justify-between">
          <Text className="text-lg text-white font-semibold">
            {selectedTask?.text}
          </Text>
          <Pressable
            onPress={() => setIsModalOpen(false)}
            className="rounded-full"
            android_ripple={{
              color: '#ffffff30',
              borderless: true,
              radius: 32,
            }}>
            <MCIcons
              name={'close'}
              size={24}
              className="items-center justify-center rounded-full"
            />
          </Pressable>
        </View>
        <Text className="text-lg text-white font-semibold">
          {selectedTask?.due_date}
        </Text>
        <View
          className="mt-12 rounded-3xl flex-row items-center bg-white10"
          style={{
            border: 2,
            borderWidth: 2,
            // backgroundColor: !selectedTask?.isChecked
            //   ? '#ffffff10'
            //   : '#ffffff20',
            borderColor: selectedTask?.isChecked ? '#ffffff10' : '#ffffff20',
            opacity: selectedTask?.isChecked ? 0.5 : 1,
            height: height * 0.06,
          }}>
          <TouchableOpacity
            onPress={() => dispatch(checkTask(selectedTask?.id))}
            className="py-2 px-2 bg-white10">
            <MCIcons
              name={
                selectedTask?.isChecked
                  ? 'checkbox-marked-circle'
                  : 'checkbox-blank-circle-outline'
              }
              size={24}
              //   color={selectedTask?.isChecked ? '#ffffff50' : '#ffffff80'}
              className="items-center justify-center"
              style={{flex: 1}}
            />
          </TouchableOpacity>
          <Pressable>
            <Text
              className="py-2 px-2 flex-1 text-base text-white"
              style={{
                textDecorationLine: selectedTask?.isChecked
                  ? 'line-through'
                  : 'none',
              }}>
              {selectedTask?.text}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;
