import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  permanentlyDeleteNote,
  removeNoteFromTrash,
} from '../../redux/slices/noteSlice';
import FW5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DeleteModal from '../base/DeleteModal';
import Modal from 'react-native-modal';

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
  const [displayNoteModal, setDisplayNoteModal] = useState(false);
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
            setDisplayNoteModal(!displayNoteModal);
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
          <Modal
            className="p-0 m-0"
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropColor="#000"
            isVisible={displayNoteModal}
            onBackButtonPress={() => setDisplayNoteModal(false)}
            onBackdropPress={() => setDisplayNoteModal(false)}>
            <View
              className="px-4"
              style={{
                width: width,
                height: height,
                backgroundColor: color || '#000000',
              }}>
              <View className="flex-row items-center justify-between py-2 border-b border-noteGrey-900">
                <Text className="text-2xl">{emoji}</Text>
                <View className="flex-row items-center" style={{gap: 32}}>
                  <TouchableOpacity
                    className="first-letter:rounded-full items-center justify-center"
                    onPress={() => {
                      try {
                        dispatch(removeNoteFromTrash(id));
                        setDisplayNoteModal(!displayNoteModal);
                        ToastAndroid.show(
                          'Note restored.',
                          ToastAndroid.SHORT,
                          ToastAndroid.CENTER,
                        );
                      } catch (err) {
                        ToastAndroid.show(
                          "Note couldn't be restored!",
                          ToastAndroid.SHORT,
                          ToastAndroid.CENTER,
                        );
                      }
                    }}>
                    <MaterialIcon
                      name={'restore'}
                      size={22}
                      style={{color: '#ffffff'}}
                    />
                    <Text className="text-md text-white">Restore</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="rounded-full items-center justify-center"
                    onPress={() => {
                      // dispatch(permanentlyDeleteNote(crrNote?.id));
                      setDeleteModal(true);
                      setDisplayNoteModal(!displayNoteModal);
                    }}>
                    <MaterialIcon
                      name={'delete'}
                      size={22}
                      style={{color: '#ffffff'}}
                    />
                    <Text className="text- text-white">Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className=" rounded-full items-center justify-center"
                    onPress={() => {
                      setDisplayNoteModal(!displayNoteModal);
                    }}>
                    <MaterialIcon
                      name={'close'}
                      size={24}
                      style={{color: '#ffffff'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView className="pt-2" showsVerticalScrollIndicator={false}>
                {title && (
                  <Text className="text-white text-lg font-bold">{title}</Text>
                )}
                {text && <Text className="text-white text-base">{text}</Text>}
              </ScrollView>
            </View>
          </Modal>
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
