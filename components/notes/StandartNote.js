import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {favNote} from '../../redux/slices/noteSlice';

const StandartNote = ({
  id,
  title,
  text,
  color,
  emoji,
  category,
  isFavorite,
}) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      className="mb-3 p-4 flex-row rounded-full justify-between items-center"
      style={{backgroundColor: color}}>
      <View className="flex-row items-center justify-start gap-3">
        <View className="h-16 w-16 p-2 bg-white items-center justify-center rounded-full">
          <Text className="text-4xl" style={{color: '#000000', zIndex: 9999}}>
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
          <Text className="text-grey05 text-xs">Standart Note</Text>
        </View>
      </View>
      <TouchableOpacity
        className="h-10 w-10 rounded-full items-center justify-center p-2"
        style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
        }}
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
