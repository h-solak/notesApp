import React, {useEffect} from 'react';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import Topbar from '../components/home/Topbar';
import NotesList from '../components/home/HomeNoteList';
import Bottombar from '../components/Bottombar';
import Categories from '../components/home/Categories';
import {resetNotes} from '../redux/slices/noteSlice';
import {useDispatch} from 'react-redux';
import NoteTypeCarousels from '../components/home/NoteTypeCarousels';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();

  return (
    <View className="h-full w-full">
      <ScrollView
        className="bg-black"
        showsVerticalScrollIndicator={false}
        style={{minHeight: height, width: width}}>
        <Topbar navigation={navigation} />
        <NoteTypeCarousels navigation={navigation} />
        <Categories />
        {/* <TouchableOpacity
          className="mt-1 w-6 h-6 bg-gray-500 items-center justify-center rounded-sm"
          onPress={() => dispatch(resetNotes())}></TouchableOpacity> */}
        <NotesList navigation={navigation} />
      </ScrollView>
      <Bottombar navigation={navigation} screen={'Home'} />
    </View>
  );
};

export default HomeScreen;
