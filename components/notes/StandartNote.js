import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  useWindowDimensions,
} from 'react-native';
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
  const {height, width} = useWindowDimensions();
  return (
    id && (
      <TouchableOpacity
        className={`mb-3 py-2 flex-row rounded-xl justify-between items-center`}
        style={{
          backgroundColor: selectedNoteIds?.includes(id) ? `${color}80` : color,
          borderColor: selectedNoteIds?.includes(id)
            ? '#929292'
            : color === '#000000'
            ? '#222222'
            : color,
          borderWidth: 2,
          width: width / 1.1,
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
        <View
          className="flex-row items-center justify-start"
          style={{width: (width / 1.1) * 0.8}}>
          <View className="p-2 items-center justify-center rounded-full">
            <Text className="text-2xl" style={{color: '#000000', zIndex: 9999}}>
              {emoji}
            </Text>
          </View>
          <View className="flex-1 flex-col">
            {title && (
              <Text
                style={{fontSize: 14, flexWrap: 'wrap'}}
                className={`font-bold`}>
                {title}
              </Text>
            )}
            {text && (
              <Text style={{fontSize: 13, flexWrap: 'wrap'}} className={``}>
                {text.slice(0, 200)}
              </Text>
            )}
            {/* <Text className="text-secondary" style={{fontSize: 12}}>
              Standard Note
            </Text> */}
          </View>
        </View>
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          style={{
            width: (width / 1.1) * 0.2,
            height: 50,
            // backgroundColor: 'rgba(255,255,255,0.2)',
          }}
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
