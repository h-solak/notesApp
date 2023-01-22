import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Bottombar from '../components/Bottombar';

const CreateScreen = ({navigation}) => {
  const [noteTitle, onChangeNoteTitle] = React.useState('');
  const [noteText, onChangeNoteText] = React.useState('');
  return (
    <View className="h-full w-full bg-transparent">
      {/* <ScrollView className="bg-black px-1"> */}
      <Text onPress={() => navigation.goBack()}>Go Back...</Text>
      <TextInput
        className="bg-notePink"
        placeholder="Enter a title"
        value={noteTitle}
        onChangeText={noteTitle => onChangeNoteTitle(noteTitle)}
      />
      <TextInput
        className="bg-noteRed"
        numberOfLines={20}
        placeholder="Add a note..."
        value={noteText}
        onChangeText={noteText => onChangeNoteText(noteText)}
      />
      <Text className="mt-16 bg-notePink">{noteTitle}</Text>
      <Text className="bg-noteRed">{noteText}</Text>
      <Button
        className="pt-16 bg-noteBlack justify-center"
        title="Reset"
        color="black"
        onPress={() => {
          onChangeNoteTitle('');
          onChangeNoteText('');
        }}
      />
      {/* </ScrollView> */}
      <Bottombar navigation={navigation} />
    </View>
  );
};

export default CreateScreen;
