import React, {useState, useEffect, useRef} from 'react';
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
  TouchableHighlight,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskCalendar from '../components/tasks/TaskCalendar';
import MenuSvg from '../assets/icons/hamburgersvgrepo.svg';
import {DrawerActions, useIsFocused} from '@react-navigation/native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import uuid from 'react-native-uuid';
import {addTask, checkTask, filterTasksByDate} from '../redux/slices/noteSlice';
import moment from 'moment';

const TaskScreen = ({navigation}) => {
  const inputRef = useRef(null);
  const isFocused = useIsFocused(); //this returns true if the user is on this screen
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();

  const allTasks = useSelector(state => state.note.allTasks);
  const tasksFilteredByDate = useSelector(
    state => state.note.tasksFilteredByDate,
  );
  const [newTask, setNewTask] = useState({
    id: '',
    text: '',
    due_date: '',
  });
  const [taskInputIsOpen, setTaskInputIsOpen] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      navigation.goBack(),
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    console.log(newTask);
  }, [newTask]);

  //on every page load, show todays tasks
  useEffect(() => {
    if (isFocused) {
      let crrDate = new Date();
      crrDate = moment(crrDate).format('YYYY-MM-DD');
      console.log(crrDate);
      dispatch(filterTasksByDate(crrDate));
      setNewTask(task => ({
        ...task,
        due_date: crrDate,
      }));
    }
  }, [isFocused]);

  const handleTaskSubmit = () => {
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
        setTaskInputIsOpen(false);
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
  };

  return (
    <View className="bg-black pt-4" style={{height: height, width: width}}>
      <TouchableOpacity
        className="mb-2 flex-row items-center justify-between"
        style={{width: width}}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
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
      </TouchableOpacity>
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

      {/** Delete **/}
      {/* <View
        className=""
        style={{backgroundColor: '#ffffff20', gap: 4}}>
        {newTask.text?.length === 0 && (
          <IonIcon name={'add-circle'} size={28} color={'#929292'} />
        )}
      </View> */}
      {/* Rest of the page */}
      <View className="flex-1">
        <ImageBackground
          source={{
            uri: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          resizeMode="cover"
          blurRadius={8}
          className="py-2"
          style={{flex: 1}}>
          {/* Add Task Input */}

          {newTask?.due_date && (
            <ScrollView className="pt-2 px-2 pb-12">
              <View className="px-4 flex-row items-center" style={{gap: 12}}>
                <Text className="font-bold text-base">
                  {moment(newTask?.due_date).format('MMMM Do YYYY')}
                </Text>
                <View className="flex-1 bg-white10" style={{height: 1.5}}>
                  {/* Thin Line */}
                </View>
                <Text className="text-xs">
                  {tasksFilteredByDate?.length} tasks
                </Text>
              </View>

              <View className="pt-4 pb-4" style={{gap: 12}}>
                {/* Add a task */}
                <TouchableOpacity
                  className="pl-3 h-12 flex-row items-center self-center rounded-3xl"
                  style={{
                    border: 2,
                    borderWidth: 2,
                    backgroundColor: '#ffffff10',
                    borderColor: '#ffffff10',
                    gap: 8,
                  }}
                  onPress={() => inputRef.current.focus()}>
                  {newTask.text?.length === 0 && (
                    <IonIcon
                      name={'add-circle'}
                      size={28}
                      color={'#ffffff90'}
                    />
                  )}
                  <TextInput
                    ref={inputRef}
                    className="py-0 flex-1 rounded-xl text-white font-semibold"
                    placeholder="Add a task..."
                    placeholderTextColor={'#ffffff80'}
                    value={newTask?.text}
                    onChangeText={text => {
                      setNewTask(task => ({
                        ...task,
                        text: text,
                      }));
                    }}
                    onFocus={() => console.log('focused')}
                    onBlur={() => console.log('UNfocused')}
                    maxLength={100}
                    autoFocus
                  />
                  {newTask?.text?.length > 0 && (
                    <TouchableHighlight
                      // className="h-12 pr-4 pl-4 bg-noteGrey-900 rounded-r-full justify-center"
                      activeOpacity={0.6}
                      underlayColor="#FFFFFF10"
                      className="h-12  px-3 justify-center rounded-r-3xl"
                      onPress={handleTaskSubmit}>
                      <Text className="font-bold">Add</Text>
                    </TouchableHighlight>
                  )}
                </TouchableOpacity>
                {/* Tasks */}
                {tasksFilteredByDate?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="py-2 px-2 rounded-3xl flex-row items-center"
                    style={{
                      border: 2,
                      borderWidth: 2,
                      backgroundColor: !item?.isDone
                        ? '#ffffff10'
                        : '#ffffff20',
                      borderColor: item?.isDone ? '#ffffff10' : '#ffffff20',
                      gap: 8,
                      opacity: item?.isDone ? 0.5 : 1,
                    }}
                    onPress={() => dispatch(checkTask(item?.id))}>
                    <MCIcons
                      name={
                        item?.isDone
                          ? 'checkbox-marked-circle'
                          : 'checkbox-blank-circle-outline'
                      }
                      size={24}
                      color={item?.isDone ? '#ffffff50' : '#ffffff80'}
                    />
                    <Text
                      className="flex-1 text-base"
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
              {!tasksFilteredByDate?.length > 0 && (
                <Text className="mt-24 self-center">No tasks.</Text>
              )}
            </ScrollView>
          )}
        </ImageBackground>
      </View>
    </View>
  );
};

export default TaskScreen;
