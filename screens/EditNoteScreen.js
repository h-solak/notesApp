import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ScrollView,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
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
import moment from 'moment';
/* Components */
import NoteColorPicker from '../components/notes/NoteColorPicker';
import {useSelector, useDispatch} from 'react-redux';
import {deleteNote, editNote} from '../redux/slices/noteSlice';

const EditNoteScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [noteDetails, setNoteDetails] = useState({
    title: '',
    text: '',
    color: '#000000',
    emoji: '✍️',
  });
  const [chosenCategories, setChosenCategories] = useState([]);

  const allCategories = useSelector(state => state.note.categories);

  const crrNote = useSelector(state => state.note.crrNote);

  //modals
  const [optionsModal, setOptionsModal] = useState(false); //three vertical dots
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [emojiModal, setEmojiModal] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [categoriesModal, setCategoriesModal] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!(noteDetails.text === '' && noteDetails.title === '')) {
      try {
        const crrDate = new Date();
        dispatch(
          editNote({
            id: crrNote?.id,
            title: noteDetails.title.trim(),
            text: noteDetails.text.trim(),
            color: noteDetails.color,
            emoji: noteDetails.emoji,
            categories: chosenCategories,
            isFavorite: crrNote?.isFavorite,
            createdAt: crrNote?.createdAt,
            updatedAt: crrDate, //when the text or title is changed
          }),
        );
      } catch (err) {
        console.log(err);
      } finally {
        ToastAndroid.show(
          'Your note is saved',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        navigation.navigate('Home');
        setNoteDetails({
          title: '',
          text: '',
          color: '#000000',
          emoji: '✍️',
        });
      }
    }
  };

  const handleCategories = chosenItemId => {
    if (!chosenCategories.includes(chosenItemId)) {
      setChosenCategories(old => [...old, chosenItemId]);
    } else {
      let newChosenCategories = chosenCategories?.filter(
        item => item !== chosenItemId,
      );
      setChosenCategories(newChosenCategories);
    }
  };

  //page load
  useEffect(() => {
    setNoteDetails({
      title: crrNote?.title,
      text: crrNote?.text,
      color: crrNote?.color,
      emoji: crrNote?.emoji,
    });
    setChosenCategories(crrNote?.categories);
  }, [crrNote]);

  return (
    <View>
      <ScrollView
        className="relative h-full w-full px-4 py-4"
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: noteDetails.color}}>
        <View className="flex-row items-center justify-between">
          {/* <TouchableOpacity
        className="bg-noteGrey-900 w-8 h-8 items-center justify-center rounded-xl"
        onPress={() => navigation.navigate('Home')}>
        <EntypoIcon name="chevron-left" size={28} color="#929292" />
      </TouchableOpacity> */}
          <TouchableOpacity
            className="w-9 h-9 items-center justify-center rounded-xl py-1 "
            style={{
              overflow: 'hidden',
            }}
            onPress={() => navigation.navigate('Home')}>
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
            <EntypoIcon name="chevron-left" size={28} color="#fff" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              className="items-center justify-center"
              onPress={() => setEmojiModal(!emojiModal)}>
              <Text className="text-black text-2xl">{noteDetails.emoji}</Text>
            </TouchableOpacity>
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
                <View
                  className="absolute top-8 right-0 bg-noteGrey-900 py-3 px-7 rounded-2xl"
                  style={{
                    overflow: 'hidden',
                  }}>
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
                    overlayColor="#44444480"
                  />
                  <TouchableOpacity
                    className="py-1"
                    onPress={() => setOptionsModal(false)}>
                    <Text className="text-base text-white py-1">Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="py-1 flex-row justify-between"
                    onPress={() => {
                      setOptionsModal(!optionsModal);
                      setEmojiModal(true);
                    }}>
                    <Text className="text-base text-white py-1">Emoji</Text>
                    <Text className="text-base text-white py-1">
                      {noteDetails.emoji}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="py-1"
                    onPress={() => {
                      setOptionsModal(!optionsModal);
                      setCategoriesModal(!categoriesModal);
                    }}>
                    <Text className="text-base text-white py-1">
                      Categories
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="py-1 flex-1 flex-row items-center justify-between"
                    style={{gap: 6}}
                    onPress={() => {
                      setOptionsModal(!optionsModal);
                      setColorPickerVisible(!colorPickerVisible);
                    }}>
                    <Text className="text-base text-white">Color</Text>
                    <View
                      className="rounded-full border border-white"
                      style={{
                        backgroundColor: noteDetails.color,
                        width: 16,
                        height: 16,
                      }}></View>
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
        <ScrollView className="flex-col">
          <TextInput
            className="flex-1 bg-transparent text-white text-2xl font-semibold"
            multiline={true}
            maxLength={50}
            placeholder="Title"
            value={noteDetails.title}
            placeholderTextColor="#929292"
            onChangeText={title =>
              setNoteDetails(noteDetails => ({
                ...noteDetails,
                title: title,
              }))
            }
            style={{textAlignVertical: 'top'}}
          />
          <TextInput
            className="pb-24 flex-1 text-white text-base border-t border-t-white10" /* text-base === 16px or 1 rem */
            multiline={true}
            // onTextLayout={onTextLayout}
            placeholder="Note"
            placeholderTextColor="#929292"
            value={noteDetails.text}
            onChangeText={text => {
              setNoteDetails(noteDetails => ({
                ...noteDetails,
                text: text,
              }));
            }}
            style={{fontWeight: '400'}}
          />
        </ScrollView>
        {/* BottomBar for notes */}
        <View className="flex-row items-center justify-between">
          <NoteColorPicker
            noteDetails={noteDetails}
            setNoteDetails={setNoteDetails}
            colorPickerVisible={colorPickerVisible}
            setColorPickerVisible={setColorPickerVisible}
          />
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
              (Press on the emoji to change it)
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
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropColor="#000"
          isVisible={categoriesModal}
          onBackdropPress={() => setCategoriesModal(false)}>
          <View className="self-center bg-noteGrey-900 w-2/3 p-3 rounded-xl">
            <Text className="text-lg text-white text-center">Categories</Text>
            <View className="gap-1">
              {allCategories.map((item, index) => (
                <TouchableOpacity
                  className="flex-row items-center gap-1"
                  onPress={() => handleCategories(item.id)}
                  key={index}>
                  <IonIcon
                    name={
                      chosenCategories.includes(item.id)
                        ? 'checkmark-circle'
                        : 'checkmark-circle-outline'
                    }
                    size={24}
                    style={{
                      color: chosenCategories.includes(item.id)
                        ? '#fff'
                        : '#929292',
                    }}
                  />
                  <Text className="text-base">{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </ScrollView>
      <KeyboardAvoidingView
        behavior="height"
        className="px-5 py-3"
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          backgroundColor: `${noteDetails.color}`,
          // overflow: 'hidden',
        }}
        keyboardVerticalOffset={height * 0.4}>
        {/* <BlurView
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
      /> */}
        <TouchableWithoutFeedback>
          <View className="w-full flex-row justify-end" style={{gap: 12}}>
            <TouchableOpacity
              className="w-24 items-center rounded-xl py-1"
              style={{
                overflow: 'hidden',
              }}
              onPress={() => {
                navigation.navigate('Home');
              }}>
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditNoteScreen;
