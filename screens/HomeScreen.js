import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import Topbar from '../components/home/Topbar';
import NotesList from '../components/home/HomeNotes';
import Bottombar from '../components/Bottombar';
import Categories from '../components/home/Categories';
const HomeScreen = ({navigation}) => {
  return (
    <View className="h-full w-full">
      <ScrollView className="bg-noteBlack px-2">
        <Topbar />
        <Categories />
        <NotesList />
      </ScrollView>
      <Bottombar navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
