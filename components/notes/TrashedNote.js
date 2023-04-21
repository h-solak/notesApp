import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Button,
  useWindowDimensions,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {selectNote, permanentlyDeleteNote} from '../../redux/slices/noteSlice';
import FW5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DeleteModal from '../base/DeleteModal';

const StandardNote = ({
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
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    id && (
      <TouchableHighlight
        className={`flex-1 mb-3 py-3 px-2 flex-row justify-between items-center`}
        style={{
          backgroundColor: selectedNoteIds?.includes(id) ? `${color}80` : color,
          borderColor: selectedNoteIds?.includes(id)
            ? '#929292'
            : color === '#000000'
            ? '#222222'
            : color,
          borderWidth: 2,
          borderRadius: 24,
          // opacity: selectedNoteIds?.includes(id) ? 0.6 : 1,
        }}
        onPress={() => {
          if (selectedNoteIds?.length > 0) {
            handleLongPress(id);
          } else {
            dispatch(selectNote(id));
            // navigation.navigate('EditNote');
            console.log('Cannot see the trashed note!!!');
          }
        }}
        onLongPress={() => handleLongPress(id)}>
        <>
          <View
            className="flex-row items-center justify-start"
            style={{gap: 8}}>
            <View className="items-center justify-center rounded-full">
              <Text
                className="text-2xl"
                style={{color: '#000000', zIndex: 9999}}>
                {emoji}
              </Text>
            </View>
            <View className="flex-1 flex-col">
              {title && (
                <Text
                  style={{fontSize: 15, flexWrap: 'wrap'}}
                  className={`font-bold`}>
                  {title}
                </Text>
              )}
              {text && (
                <Text style={{fontSize: 13, flexWrap: 'wrap'}} className={``}>
                  {text?.length > 200 ? `${text.slice(0, 200)}...` : text}
                </Text>
              )}
              {/* <Text className="text-secondary" style={{fontSize: 12}}>
              Standard Note
            </Text> */}
            </View>
          </View>
          {/* <TouchableHighlight
            className="flex-1 items-center justify-center"
            style={{
              width: (width / 1.1) * 0.2,
              height: 50,
              // backgroundColor: 'rgba(255,255,255,0.2)',
            }}
            onPress={() => setDeleteModal(true)}>
            <MaterialIcon
              name={'delete'}
              size={22}
              style={{color: '#929292'}}
            />
          </TouchableHighlight> */}
          <DeleteModal
            isModalOpen={deleteModal}
            setIsModalOpen={setDeleteModal}
            title={'Permanently Delete'}
            description={'This note will be deleted.'}
            dispatch={() => dispatch(permanentlyDeleteNote(id))}
          />
        </>
      </TouchableHighlight>
    )
  );
};

export default StandardNote;
