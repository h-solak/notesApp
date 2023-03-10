import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* \_(^_^)_/ */
import uuid from 'react-native-uuid';
import {BlurView} from '@react-native-community/blur';
import Modal from 'react-native-modal';
import EmojiPicker from 'rn-emoji-keyboard';

/* Components */
import NoteColorPicker from '../components/notes/NoteColorPicker';
import {useSelector, useDispatch} from 'react-redux';
import {addNote} from '../redux/slices/noteSlice';

const CreateScreen = ({navigation}) => {
  const [noteTitle, onChangeNoteTitle] = useState('');
  const [noteText, onChangeNoteText] = useState('');
  const [noteDetails, setNoteDetails] = useState({
    color: '#000000',
    emoji: '✍️',
  });

  //modals
  const [optionsModal, setOptionsModal] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [emojiModal, setEmojiModal] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!(noteText === '' && noteTitle === '')) {
      try {
        const crrDate = new Date();
        dispatch(
          addNote({
            id: uuid.v4(),
            title: noteTitle.trim(),
            text: noteText.trim(),
            color: noteDetails.color,
            emoji: noteDetails.emoji,
            category: 'Plans',
            isFavorite: false,
            createdAt: crrDate,
            updatedAt: crrDate, //when the text or title is changed
          }),
        );
      } catch (err) {
        console.log(err);
      } finally {
        ToastAndroid.show('Your note is saved', ToastAndroid.SHORT);
        navigation.navigate('Home');
        onChangeNoteTitle('');
        onChangeNoteText('');
      }
    }
  };

  return (
    <View
      className="relative h-full w-full px-4 py-4"
      style={{backgroundColor: noteDetails.color}}>
      {/* <ScrollView className="bg-black px-1"> */}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          className="bg-noteGrey-900 w-8 h-8 items-center justify-center rounded-xl"
          onPress={() => navigation.navigate('Home')}>
          <EntypoIcon name="chevron-left" size={28} color="#929292" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-2">
          <Image
            source={{
              uri: 'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403',
            }}
            className="w-10 h-10 rounded-full"
            style={{borderWidth: 2, borderColor: '#ffffff'}}
          />
          <View className="items-center justify-center relative">
            <TouchableOpacity
              className="p-1"
              onPress={() => setOptionsModal(!optionsModal)}>
              <EntypoIcon name="dots-three-vertical" size={22} color="#fff" />
            </TouchableOpacity>
            <Modal
              animationInTiming={1}
              animationOutTiming={1}
              backdropColor="#00000050"
              isVisible={optionsModal}
              onBackdropPress={() => setOptionsModal(false)}>
              <View className="absolute top-8 right-0 bg-noteGrey-900 py-3 px-7 rounded-2xl">
                <TouchableOpacity
                  className="py-1"
                  onPress={() => setOptionsModal(false)}>
                  <Text className="text-base text-white py-1">Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-1"
                  onPress={() => {
                    setEmojiModal(true);
                    setOptionsModal(false);
                  }}>
                  <Text className="text-base text-white py-1">Emoji</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-1"
                  onPress={() => setOptionsModal(false)}>
                  <Text className="text-base text-white py-1">Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-1"
                  onPress={() => setColorPickerVisible(!colorPickerVisible)}>
                  <Text className="text-base text-white py-1">Color</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-1"
                  onPress={() => setOptionsModal(false)}>
                  <Text className="text-base text-white py-1">Share</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <TextInput
        className="bg-transparent text-white text-6xl font-bold"
        multiline={true}
        numberOfLines={2}
        placeholder="Add A Title Here"
        value={noteTitle}
        placeholderTextColor="#fff"
        onChangeText={noteTitle => onChangeNoteTitle(noteTitle)}
        style={{textAlignVertical: 'top'}}
      />
      <TextInput
        className="text-white text-base"
        multiline={true}
        numberOfLines={24}
        placeholder="Note"
        placeholderTextColor="#929292"
        value={noteText}
        onChangeText={noteText => onChangeNoteText(noteText)}
        blurOnSubmit={true}
        style={{textAlignVertical: 'top', fontWeight: '400'}}
      />
      {/* BottomBar for notes */}
      <View className="flex-row items-center justify-between">
        <NoteColorPicker
          noteDetails={noteDetails}
          setNoteDetails={setNoteDetails}
          colorPickerVisible={colorPickerVisible}
          setColorPickerVisible={setColorPickerVisible}
        />
        <View className="w-full justify-end flex-row gap-2">
          <TouchableOpacity
            className="w-24 items-center rounded-xl py-1"
            style={{
              overflow: 'hidden',
            }}
            onPress={handleSubmit}>
            <BlurView
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
              }}
              blurType="light"
              blurAmount={32}
              blurRadius={25}
              overlayColor="#ffffff30"
            />
            <Text className="text-white text-base font-bold">Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 items-center rounded-xl py-1 "
            style={{
              overflow: 'hidden',
            }}
            onPress={handleSubmit}>
            <BlurView
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
              }}
              blurType="light"
              blurAmount={32}
              blurRadius={25}
              overlayColor="#ffffff30"
            />
            <Text className="text-white text-base font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor="#000"
        isVisible={emojiModal}
        onBackdropPress={() => setEmojiModal(false)}>
        <View className="self-center w-2/3 bg-noteGrey-900 py-5 px-5  rounded-2xl">
          <Text className="text-white text-center text-base">
            Pick an emoji for your note
          </Text>
          <TouchableOpacity
            className="self-center mt-3 rounded-full bg-white w-14 h-14 items-center justify-center"
            onPress={() => setEmojiPicker(true)}>
            <Text className="text-center text-3xl text-black">
              {noteDetails.emoji}
            </Text>
          </TouchableOpacity>
          <Text className="mt-3 text-center text-xs">
            (Press on the emoji to change)
          </Text>
          <TouchableOpacity
            className="mt-3 w-full justify-end bg-noteGrey-900 py-2 px-2 rounded-r-xl flex-row items-center"
            onPress={() => setEmojiModal(false)}>
            <MaterialIcon name={'done'} size={20} style={{color: '#fff'}} />
            <Text className="text-white"> Done</Text>
          </TouchableOpacity>
          {/* <TextInput
            className="self-center text-3xl"
            value={noteDetails.emoji}
            // onChange={() =>
            //   setNoteDetails(noteDetails => ({
            //     ...noteDetails,
            //     noteDetails: '✍️',
            //   }))
            // }
          /> */}
          <EmojiPicker
            onEmojiSelected={emojiObject =>
              setNoteDetails(noteDetails => ({
                ...noteDetails,
                emoji: emojiObject.emoji,
              }))
            }
            open={emojiPicker}
            onClose={() => setEmojiPicker(false)}
            theme={{
              backdrop: '#16161888',
              knob: '#766dfc',
              container: '#282829',
              header: '#fff',
              skinTonesContainer: '#252427',
              category: {
                icon: '#766dfc',
                iconActive: '#fff',
                container: '#252427',
                containerActive: '#766dfc',
              },
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CreateScreen;
