import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {favNote, selectNote} from '../../redux/slices/noteSlice';

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
  return (
    <TouchableOpacity
      className={`mb-3 px-4 py-2 flex-row rounded-full justify-between items-center border-2`}
      style={{
        backgroundColor: color,
        borderColor: color === '#000000' ? '#222222' : color,
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
  );
};

export default StandartNote;
