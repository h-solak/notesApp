import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {checkTask} from '../../redux/slices/noteSlice';
import CalendarSvg from '../../assets/icons/calendarsvgrepo.svg';

const TaskModal = ({isModalOpen, setIsModalOpen, selectedTask}) => {
  const [taskInput, setTaskInput] = useState('');
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const crrDate = new Date();

  useEffect(() => {
    setTaskInput(selectedTask?.text);
  }, [selectedTask]);
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
        className="bg-noteGrey-900 self-center rounded-3xl py-4"
        style={{height: height * 0.5, width: width * 0.9}}>
        <View className="px-4 pb-2 flex-row items-start justify-between border-b-2 border-b-white10">
          <Text className="text-lg text- font-semibold">
            {selectedTask?.text.length > 20
              ? `${selectedTask?.text.slice(0, 20)}...`
              : selectedTask?.text}
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
        <TouchableOpacity
          className="px-4 mt-3 flex-row items-center"
          style={{gap: 4}}
          onPress={() => null}>
          <CalendarSvg width={24} height={24} />
          <Text className="text-base text-white font-semibold">
            {moment(selectedTask?.due_date).format('MMMM Do YYYY')}
          </Text>
        </TouchableOpacity>
        {moment(selectedTask?.due_date)
          .endOf('day')
          .fromNow()
          ?.includes('ago') ? (
          <Text className="px-4 text-red-700">
            Task is expired{' '}
            {moment(selectedTask?.due_date).endOf('day').fromNow()}
          </Text>
        ) : (
          <Text className="px-4 text-green-700">
            Task is due {moment(selectedTask?.due_date).endOf('day').fromNow()}
          </Text>
        )}
        <View className="px-4 justify-center" style={{flex: 1}}>
          <View
            className="rounded-3xl flex-row items-center bg-white10"
            style={{
              border: 2,
              borderWidth: 2,
              // backgroundColor: !selectedTask?.isChecked
              //   ? '#ffffff10'
              //   : '#ffffff20',
              borderColor: selectedTask?.isChecked ? '#ffffff10' : '#ffffff20',
              opacity: selectedTask?.isChecked ? 0.5 : 1,
            }}>
            <TouchableOpacity
              onPress={() => dispatch(checkTask(selectedTask?.id))}
              className="py-2 px-2 justify-center">
              <View
                //wrapper is needed to match the height of the container
                className="wrapper items-center justify-center"
                style={{flex: 1}}>
                <MCIcons
                  name={
                    selectedTask?.isChecked
                      ? 'checkbox-marked-circle'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={24}
                  //   color={selectedTask?.isChecked ? '#ffffff50' : '#ffffff80'}
                />
              </View>
            </TouchableOpacity>
            <TextInput
              className="flex-1 bg-white10 text-base text-white"
              style={{
                flexWrap: 'wrap',
              }}
              value={taskInput}
              onChange={e => setTaskInput(e.target.value)}
            />
          </View>
        </View>
        <View
          className="px-4 flex-row items-center justify-end"
          style={{gap: 32}}>
          <TouchableOpacity
            onPress={() => {
              setIsModalOpen(false);
            }}>
            <Text className="text-white70 font-semibold text-base">
              Discard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsModalOpen(false);
            }}>
            <Text className="text-white font-semibold text-base">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;
