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
import Bottombar from '../components/home/Bottombar';
import Categories from '../components/home/Categories';
const HomeScreen = () => {
  return (
    <View className="bg-black h-full w-full px-1">
      <Topbar />
      <Categories />
      <NotesList />
      <Bottombar />
    </View>
  );
};

export default HomeScreen;
