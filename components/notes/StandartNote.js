import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {deleteNote, favNote, selectNote} from '../../redux/slices/noteSlice';
import FW5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const StandartNote = ({
  id,
  title,
  text,
  color,
  emoji,
  category,
  isFavorite,
  navigation,
}) => {
  const dispatch = useDispatch();

  const renderLeftActions = (progress, drag) => {
    return (
      <TouchableOpacity
        className="rounded-full items-center justify-center"
        onPress={() => dispatch(deleteNote(id))}>
        <MaterialIcon name={'archive'} size={24} style={{color: '#ffffff'}} />
      </TouchableOpacity>
    );
  };

  const renderRightActions = (progress, drag) => {
    return (
      <TouchableOpacity
        className="rounded-full items-center justify-center"
        onPress={() => dispatch(deleteNote(id))}>
        <FW5Icon name={'trash'} size={17} style={{color: '#ffffff'}} />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderLeftActions={(progress, dragX) =>
        renderLeftActions(progress, dragX, id)
      }
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, id)
      }
      // onSwipeableOpen={() => closeRow(index)}
      // ref={ref => (row[index] = ref)}
      rightOpenValue={-100}>
      <TouchableOpacity
        className={`mb-3 px-4 py-2 flex-row rounded-full justify-between items-center`}
        style={{
          backgroundColor: color,
          borderColor: color === '#000000' ? '#222222' : color,
          borderWidth: 1.5,
        }}
        onPress={() => {
          dispatch(selectNote(id));
          navigation.navigate('EditNote');
        }}>
        <View className="flex-row items-center justify-start gap-3">
          <View className="h-14 w-14 p-2 bg-white items-center justify-center rounded-full">
            <Text className="text-3xl" style={{color: '#000000', zIndex: 9999}}>
              {emoji}
            </Text>
          </View>
          <View className="">
            <Text
              className={` text-base font-bold ${
                title !== '' ? 'text-white' : 'text-slate-300'
              }`}>
              {title !== ''
                ? title
                : text.length > 10
                ? `${text.slice(0, 10)}...`
                : text}
            </Text>
            <Text className="text-secondary" style={{fontSize: 13}}>
              Standart Note
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="h-10 w-10 rounded-full items-center justify-center p-2"
          style={
            {
              // backgroundColor: 'rgba(255,255,255,0.2)',
            }
          }
          onPress={() => dispatch(favNote(id))}>
          <AntIcon
            name={isFavorite ? 'heart' : 'hearto'}
            size={22}
            style={{color: isFavorite ? '#e74c3c' : '#fff'}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default StandartNote;
