import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {
  archiveNote,
  deleteNote,
  favNote,
  selectNote,
  permanentlyDeleteNote,
} from '../../redux/slices/noteSlice';
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
  isTrashScreen,
  handleLongPress,
  selectedNoteIds,
  navigation,
}) => {
  const dispatch = useDispatch();

  return (
    id && (
      <TouchableOpacity
        className={`mb-3 px-4 py-2 flex-row rounded-full justify-between items-center`}
        style={{
          backgroundColor: selectedNoteIds?.includes(id) ? `${color}80` : color,
          borderColor: selectedNoteIds?.includes(id)
            ? '#929292'
            : color === '#000000'
            ? '#222222'
            : color,
          borderWidth: 2,
          // opacity: selectedNoteIds?.includes(id) ? 0.6 : 1,
        }}
        onPress={() => {
          if (selectedNoteIds?.length > 0) {
            handleLongPress(id);
          } else {
            dispatch(selectNote(id));
            navigation.navigate('EditNote');
          }
        }}
        onLongPress={() => handleLongPress(id)}>
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
              {/* BAD! BAAAAAAAAD!!! */}
              {title !== ''
                ? `${title.slice(0, 10)}`
                : text.length > 10
                ? `${text.slice(0, 10)}...`
                : text}
            </Text>
            <Text className="text-secondary" style={{fontSize: 12}}>
              Standard Note
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
    )
  );
};

export default StandartNote;
