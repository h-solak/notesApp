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
import AsyncStorage from '@react-native-async-storage/async-storage';

/* \_(^_^)_/ */
import uuid from 'react-native-uuid';
import {BlurView} from '@react-native-community/blur';

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
  // const notes = useSelector(state => state.note.notes);
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
        <View className="flex-row items-center gap-1">
          <Text className="text-gray-400 text-xs">Aaa</Text>
          <Image
            source={{
              uri: 'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403',
            }}
            className="w-10 h-10 rounded-full"
            style={{borderWidth: 2, borderColor: '#ffffff'}}
          />
          <TouchableOpacity>
            <EntypoIcon name="dots-three-vertical" size={22} color="#fff" />
          </TouchableOpacity>
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
        />
        <View className="flex-row gap-2">
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
    </View>
  );
};

export default CreateScreen;
