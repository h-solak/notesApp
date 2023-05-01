import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ScrollView,
  Pressable,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {trashNote, editNote} from '../redux/slices/noteSlice';
import EmptyCategoriesSvg from '../assets/icons/emptycategoriessvgrepo.svg';

const EditNoteScreen = ({navigation}) => {
  const noteTitleInput = useRef(null);
  const noteTextInput = useRef(null);
  const {height, width} = useWindowDimensions();
  const [noteDetails, setNoteDetails] = useState({
    title: '',
    text: '',
    color: '#000000',
    emoji: '✍️',
  });

  const [wordCount, setWordCount] = useState(0);
  const [chosenCategories, setChosenCategories] = useState([]);

  const {categories, crrNote} = useSelector(state => state.note);

  //modals
  const [optionsModal, setOptionsModal] = useState(false); //three vertical dots
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [emojiModal, setEmojiModal] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [categoriesModal, setCategoriesModal] = useState(false);

  const dispatch = useDispatch();

  const handleChange = () => {
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
      }
      // finally {
      //   ToastAndroid.show(
      //     'Your note is saved',
      //     ToastAndroid.SHORT,
      //     ToastAndroid.CENTER,
      //   );
      //   navigation.goBack();
      //   setNoteDetails({
      //     title: '',
      //     text: '',
      //     color: '#000000',
      //     emoji: '✍️',
      //   });
      // }
    }
  };

  const handleCategories = chosenItemId => {
    if (!chosenCategories?.includes(chosenItemId)) {
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

  //save note on every change
  useEffect(() => {
    handleChange();
  }, [noteDetails, chosenCategories]);

  useEffect(() => {
    const trimmedText = noteDetails?.text.trim();
    const totalWords = trimmedText
      .split(' ')
      .filter(item => item !== '').length;
    setWordCount(totalWords);
  }, [noteDetails.text]);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
      <View
        className="relative pt-4"
        // showsVerticalScrollIndicator={false}
        style={{height: height, backgroundColor: noteDetails.color}}>
        <View className="flex-row items-center justify-between px-4">
          <TouchableOpacity
            className="w-9 h-9 items-center justify-center rounded-xl py-1 "
            style={{
              overflow: 'hidden',
            }}
            onPress={
              noteDetails.text.length === 0 && noteDetails.title.length === 0
                ? () => {
                    dispatch(trashNote(crrNote?.id));
                    navigation.goBack();
                  }
                : () => navigation.goBack()
            }>
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
            {noteDetails.text.length === 0 && noteDetails.title.length === 0 ? (
              <IonIcon name={'md-arrow-back'} size={20} color="#fff" />
            ) : (
              <MaterialIcon name={'done'} size={20} color="#fff" />
            )}
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
                animationIn="slideInDown"
                animationOut="fadeOutUp"
                backdropColor="#00000050"
                style={{margin: 0}}
                isVisible={optionsModal}
                onBackdropPress={() => setOptionsModal(false)}
                swipeDirection="left"
                onSwipeComplete={() => setOptionsModal(false)}>
                <View
                  className="m-0 absolute top-0 right-0 bg-noteGrey-900 pt-4 pb-12 rounded-b-2xl"
                  style={{
                    width: width,
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
                  {[
                    {
                      icon: (
                        <MaterialIcon
                          name="more-horiz"
                          style={{fontSize: 24}}
                        />
                      ),
                      text: 'Details',
                      onPress: () => setOptionsModal(false),
                    },
                    {
                      icon: <MCIcons name={'tag'} size={24} />,
                      text: 'Categories',
                      onPress: () => {
                        setOptionsModal(!optionsModal);
                        setCategoriesModal(!categoriesModal);
                      },
                    },
                    {
                      icon: (
                        <View
                          className="rounded-full border border-noteGrey-500"
                          style={{
                            backgroundColor: noteDetails.color,
                            width: 20,
                            height: 20,
                            marginLeft: 2, //margin left: 2 is a temporary fix!!!
                          }}></View>
                      ),
                      text: 'Color',
                      onPress: () => {
                        setOptionsModal(!optionsModal);
                        setColorPickerVisible(!colorPickerVisible);
                      },
                    },
                    {
                      icon: (
                        <MCIcons name="delete-outline" style={{fontSize: 24}} />
                      ),
                      text: 'Delete',
                      onPress: () => {
                        dispatch(trashNote(crrNote?.id));
                        navigation.goBack();
                      },
                    },
                    {
                      icon: (
                        <IonIcon
                          name="share-social-outline"
                          style={{fontSize: 24}}
                        />
                      ),
                      text: 'Share',
                      onPress: () => {
                        return null;
                      },
                    },
                  ].map((item, index) => (
                    <Pressable
                      key={index}
                      className="px-4 py-3 rounded-full"
                      android_ripple={{
                        color: '#ffffff30',
                        borderless: false,
                        radius: 1000,
                        foreground: false,
                      }}
                      onPress={item.onPress}>
                      <View
                        className="flex-row items-center"
                        style={{width: width, gap: 16}}>
                        {item.icon}

                        <Text className="text-base">{item.text}</Text>
                      </View>
                    </Pressable>
                  ))}
                  <View
                    className="absolute bottom-4 h-1 bg-white10 self-center rounded-2xl"
                    style={{width: width * 0.2}}></View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="mt-5 px-4">
          <TextInput
            ref={noteTitleInput}
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
            ref={noteTextInput}
            className="pb-80 flex-1 text-white text-base border-t border-t-white10" /* text-base === 16px or 1 rem */
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
        {/* Notes Bottombar */}
        <View
          className="absolute bottom-0 flex-1 px-3 py-3 flex-row justify-between items-center"
          style={{
            overflow: 'hidden',
            width: width,
            // position: 'absolute',
            // bottom: 0,
            backgroundColor: `${noteDetails?.color}`,
          }}>
          <Text className="text-xs">{wordCount} Words</Text>
          {/* CATEGORIES WILL BE LISTED AT THE END OF THE TEXT INPUT AND USER WILL BE ABLE TO REMOVE OR ADD FROM THERE*/}
          {/* {chosenCategories?.length > 0 && (
            <View className="flex-row" style={{gap: 4}}>
              {categories?.map(item => {
                if (chosenCategories?.includes(item.id)) {
                  return <Text key={item.id}>{item.name}</Text>;
                }
              })}
            </View>
          )} */}
          {crrNote?.updatedAt && (
            <Text className="text-xs">
              Edited on {moment(crrNote?.updatedAt).format('MMM Do YY')}
            </Text>
          )}
        </View>

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
          overlayColor="#ffffff80"
        /> */}
      </View>
      {/* Modals */}
      <>
        <NoteColorPicker
          noteDetails={noteDetails}
          setNoteDetails={setNoteDetails}
          colorPickerVisible={colorPickerVisible}
          setColorPickerVisible={setColorPickerVisible}
        />
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
          <View
            className="self-center bg-noteGrey-900 rounded-xl"
            style={{width: width * 0.9, height: height * 0.7}}>
            <Text
              className={`mt-8 text-lg text-center ${
                categories ? 'text-white' : 'text-white'
              }`}>
              Categories
            </Text>
            <ScrollView className="mt-4 mb-20">
              {categories ? (
                categories?.map((item, index) => (
                  <Pressable
                    android_ripple={{color: '#ffffff30', borderless: false}}
                    className="px-8 py-4 flex-row items-center justify-between rounded-full"
                    style={{gap: 16}}
                    onPress={() => handleCategories(item?.id)}
                    key={index}>
                    <View className="flex-row items-center" style={{gap: 16}}>
                      <MCIcons
                        name={
                          chosenCategories?.includes(item?.id)
                            ? 'checkbox-marked-circle'
                            : 'checkbox-blank-circle-outline'
                        }
                        size={24}
                        style={{
                          color: chosenCategories?.includes(item?.id)
                            ? '#fff'
                            : '#929292',
                        }}
                      />
                      <Text
                        className={`text-base ${
                          chosenCategories?.includes(item?.id)
                            ? 'text-white'
                            : null
                        }`}>
                        {item?.name}
                      </Text>
                    </View>
                    {chosenCategories?.includes(item?.id) && (
                      <>
                        <View
                          className="flex-1 bg-white10"
                          style={{height: 1}}></View>
                        <Text className="">(Selected)</Text>
                      </>
                    )}
                  </Pressable>
                ))
              ) : (
                <View className="m-0 py-40 justify-around items-center">
                  <EmptyCategoriesSvg width={50} height={50} />
                  <Text className="text-center mt-2 mb-2">
                    No categories yet
                  </Text>
                  {/* <Pressable
                    className="mt-2 py-2 px-5 self-center bg-white rounded-full"
                    android_ripple={{color: '#ffffff30', borderless: true}}
                    onPress={() => navigation.navigate('Category')}>
                    <Text className="text-center text-black font-">
                      Create new categories
                    </Text>
                  </Pressable> */}
                </View>
              )}
            </ScrollView>
            <View
              className="flex-row justify-center items-center self-center absolute bottom-8"
              style={{width: width * 0.9, gap: 32}}>
              <Pressable
                android_ripple={{
                  color: '#ffffff30',
                  borderless: true,
                  radius: 100,
                }}
                style={{width: width * 0.35}}
                className="rounded-full"
                onPress={() => navigation.navigate('Category')}>
                <View
                  className="py-2 self-center just border-white border-2 rounded-full"
                  style={{width: width * 0.35}}>
                  <Text className="font-bold text-center text-white">
                    Edit categories
                  </Text>
                </View>
              </Pressable>
              <Pressable
                className="py-2 self-center bg-white rounded-full"
                android_ripple={{
                  color: '#ffffff30',
                  borderless: true,
                  radius: 75,
                  foreground: false,
                }}
                style={{width: width * 0.25}}
                onPress={() => setCategoriesModal(false)}>
                <Text className="text-center text-black">Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
      {/* <KeyboardAvoidingView
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
        <TouchableWithoutFeedback>
          <View className="w-full flex-row justify-end" style={{gap: 12}}>
            <TouchableOpacity
              className="w-24 items-center rounded-xl py-1"
              style={{
                overflow: 'hidden',
              }}
              onPress={() => {
                navigation.goBack();
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
      </KeyboardAvoidingView> */}
    </View>
  );
};

export default EditNoteScreen;
