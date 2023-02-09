import React from 'react';
import {ScrollView, View, Button} from 'react-native';
import Topbar from '../components/home/Topbar';
import NotesList from '../components/home/HomeNoteList';
import Bottombar from '../components/Bottombar';
import Categories from '../components/home/Categories';
import Types from '../components/home/Types';
import {resetNotes} from '../redux/slices/noteSlice';
import {useDispatch} from 'react-redux';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View className="h-full w-full">
      <ScrollView
        className="bg-black px-2"
        showsVerticalScrollIndicator={false}>
        <Topbar navigation={navigation} />
        <Types />
        <Categories />
        {/* <Button
          title="reset"
          color="#191919"
          onPress={() => dispatch(resetNotes())}
        /> */}
        <NotesList />
      </ScrollView>
      <Bottombar navigation={navigation} screen={'Home'} />
    </View>
  );
};

export default HomeScreen;
