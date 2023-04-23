import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  TextInput,
  ImageBackground,
  BackHandler,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import TaskCalendar from '../components/tasks/TaskCalendar';
import MenuSvg from '../assets/icons/hamburgersvgrepo.svg';
import {DrawerActions} from '@react-navigation/native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import uuid from 'react-native-uuid';
import {addTask, checkTask, filterTasksByDate} from '../redux/slices/noteSlice';
import moment from 'moment';

const TaskScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();

  const allTasks = useSelector(state => state.note.allTasks);
  const tasksFilteredByDate = useSelector(
    state => state.note.tasksFilteredByDate,
  );
  const [selectedDate, setSelectedDate] = useState('');
  const [newTask, setNewTask] = useState({
    id: '',
    text: '',
    due_date: '',
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      navigation.goBack(),
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    console.log(newTask);
  }, [newTask]);

  return (
    <View className="bg-black pt-4" style={{height: height, width: width}}>
      <View
        className="mb-2 flex-row items-center justify-between"
        style={{height: height * 0.05, width: width}}>
        <View
          className="flex-row justify-between items-center px-2"
          style={{width: width}}>
          <View className="flex-row items-center" style={{gap: 8}}>
            <TouchableOpacity
              className="flex-row items-center justify-center rounded-xl"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{gap: 8}}>
              <MenuSvg width={28} height={28} />
              <Text className="text-xl text-white font-bold">Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TaskCalendar
        selectedDate={newTask.due_date}
        setSelectedDate={date => {
          setNewTask(task => ({
            ...task,
            due_date: date,
          }));
          dispatch(filterTasksByDate(date));
        }}
      />

      {/* Rest of the page */}
      <View className="flex-1">
        <ImageBackground
          source={{
            uri: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          resizeMode="cover"
          blurRadius={12}
          className="py-2"
          style={{flex: 1}}>
          {/* Add Task Input */}
          <View
            className="px-4 flex-row items-center self-center rounded-"
            style={{width: width, backgroundColor: '#FFFFFF10', gap: 4}}>
            {/* <Text
              className={`font-bold ${
                newTask.text.length > 0 ? 'text-white' : 'text-white80'
              }`}>
              +
            </Text> */}
            <TextInput
              className="flex-1 rounded-xl text-white font-semibold"
              placeholder="Add a task..."
              placeholderTextColor={'#ffffff80'}
              value={newTask?.text}
              onChangeText={text => {
                setNewTask(task => ({
                  ...task,
                  text: text,
                }));
              }}
            />
            {newTask?.text?.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  try {
                    if (newTask.text.length > 0 && newTask.due_date) {
                      console.log({
                        id: uuid.v4(),
                        text: newTask.text,
                        due_date: newTask.due_date,
                        isDone: false,
                      });
                      dispatch(
                        addTask({
                          id: uuid.v4(),
                          text: newTask.text,
                          due_date: newTask.due_date,
                          isDone: false,
                        }),
                      );
                      setNewTask(task => ({
                        ...task,
                        text: '',
                      }));
                      Keyboard.dismiss();
                    } else if (newTask.text.length > 0 && !newTask.due_date) {
                      ToastAndroid.show(
                        'Pick a date for your task',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                      );
                    }
                  } catch (err) {
                    console.log(err);
                    ToastAndroid.show(
                      'Something went wrong!',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                    );
                  }
                }}>
                <Text>Add</Text>
              </TouchableOpacity>
            )}
          </View>
          {newTask?.due_date && (
            <ScrollView className="mt-2 px-2">
              <Text className="font-bold text-base">
                {moment(newTask?.due_date).format('MMMM Do YYYY')}
              </Text>
              {tasksFilteredByDate?.length > 0 ? (
                <View className="mt-4" style={{gap: 12}}>
                  {tasksFilteredByDate?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      className="p-2 rounded-full flex-row items-center"
                      style={{
                        border: 2,
                        borderWidth: 2,
                        backgroundColor: !item?.isDone
                          ? '#ffffff10'
                          : '#ffffff20',
                        borderColor: item?.isDone ? '#ffffff10' : '#ffffff20',
                        gap: 8,
                      }}
                      onPress={() => dispatch(checkTask(item?.id))}>
                      <IonIcon
                        name={
                          item?.isDone
                            ? 'checkmark-circle'
                            : 'checkmark-circle-outline'
                        }
                        size={24}
                        color={item?.isDone ? '#ffffff50' : '#ffffff50'}
                      />
                      <Text
                        className="text-base"
                        style={{
                          textDecorationLine: item?.isDone
                            ? 'line-through'
                            : 'none',
                        }}>
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text>Nothing to see</Text>
              )}
            </ScrollView>
          )}
        </ImageBackground>
      </View>
    </View>
  );
};

export default TaskScreen;
