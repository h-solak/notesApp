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
import NotesList from '../components/home/NotesList';
import Bottombar from '../components/home/Bottombar';
const HomeScreen = () => {
  return (
    <View className="bg-slate-300 h-full w-full">
      {/* 1/12 */}
      <Topbar />
      {/* 10/12 */}
      <NotesList />
      {/* 1/12 */}
      <Bottombar />
    </View>
  );
};

export default HomeScreen;
