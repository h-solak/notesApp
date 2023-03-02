import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {BlurView} from '@react-native-community/blur';
import moment from 'moment';

/* Components */
import NoteColorPicker from '../components/notes/NoteColorPicker';
import {useSelector, useDispatch} from 'react-redux';
import {editNote} from '../redux/slices/noteSlice';

const EditNoteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const crrNote = useSelector(state => state.note.crrNote);

  const [noteTitle, onChangeNoteTitle] = useState('');
  const [noteText, onChangeNoteText] = useState('');
  const [noteDetails, setNoteDetails] = useState({
    color: '#000000',
    emoji: '✍️',
  });

  //page start
  useEffect(() => {
    onChangeNoteTitle(crrNote.title);
    onChangeNoteText(crrNote.text);
    setNoteDetails({
      color: crrNote.color,
      emoji: crrNote.emoji,
    });
  }, [crrNote]);

  const handleSubmit = () => {
    if (!(noteText === '' && noteTitle === '')) {
      try {
        const crrDate = new Date();
        dispatch(
          editNote({
            id: crrNote.id,
            title: noteTitle.trim(),
            text: noteText.trim(),
            color: noteDetails.color,
            emoji: noteDetails.emoji,
            category: 'Shopping',
            isFavorite: crrNote.isFavorite,
            createdAt: crrNote.createdAt,
            updatedAt: crrDate,
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
          <View className="items-end">
            <Text className="text-white text-sm">Ciri Icabet</Text>
            <Text className="text-noteGrey-300 text-xs">
              {`${moment(crrNote.updatedAt).format('L')}, ${moment(
                crrNote.updatedAt,
              ).format('LT')}`}
            </Text>
          </View>
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
        className="bg-transparent text-white text-6xl font-bold pt-5"
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
      <KeyboardAvoidingView behavior="height">
        <View className="w-full flex-row items-center justify-between">
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditNoteScreen;
