import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import Topbar from '../components/home/Topbar';
import NotesList from '../components/home/HomeNoteList';
import Bottombar from '../components/Bottombar';
import Categories from '../components/home/Categories';
import {deleteMultipleNotes, resetNotes} from '../redux/slices/noteSlice';
import {useDispatch} from 'react-redux';
import NoteTypeCarousels from '../components/home/NoteTypeCarousels';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);

  return (
    <View className="h-full w-full">
      <ScrollView
        className="bg-black"
        showsVerticalScrollIndicator={false}
        style={{minHeight: height, width: width}}>
        <Topbar navigation={navigation} />
        <TouchableOpacity
          className="mx-4 mt-4 mb-2 py-2 rounded-full px-4 bg-noteGrey-900 flex-row items-center"
          style={{gap: 8}}
          onPress={() => navigation.navigate('Search')}>
          <IonIcon name={'search'} size={22} color="#929292" />
          <Text className="text-noteGrey-900 flex-1" style={{color: '#929292'}}>
            Search your notes
          </Text>
        </TouchableOpacity>
        <NoteTypeCarousels navigation={navigation} />
        <Categories />
        {/* <TouchableOpacity
          className="mt-1 w-6 h-6 bg-gray-500 items-center justify-center rounded-sm"
          onPress={() => dispatch(resetNotes())}></TouchableOpacity> */}
        <NotesList
          selectedNoteIds={selectedNoteIds}
          setSelectedNoteIds={setSelectedNoteIds}
          navigation={navigation}
        />
      </ScrollView>
      <View
        className="bg-noteGrey-900 h-full w-full px-4 flex-row justify-between items-center"
        style={{height: height * 0.075}}>
        <View className="flex-row items-center" style={{gap: 12}}>
          <TouchableOpacity className="" onPress={() => setSelectedNoteIds([])}>
            <MaterialIcon name={'close'} size={22} style={{color: '#ffffff'}} />
          </TouchableOpacity>
          <Text>{selectedNoteIds?.length} selected</Text>
        </View>
      </View>
      {selectedNoteIds?.length > 0 && (
        <View
          className="absolute top-0 bg-noteGrey-900 h-full w-full px-4 flex-row justify-between items-center"
          style={{height: height * 0.08}}>
          <View className="flex-row items-center" style={{gap: 12}}>
            <TouchableOpacity
              className=""
              onPress={() => setSelectedNoteIds([])}>
              <MaterialIcon
                name={'close'}
                size={22}
                style={{color: '#ffffff'}}
              />
            </TouchableOpacity>
            <Text>{selectedNoteIds?.length} selected</Text>
          </View>
          <View className="flex-row items-center" style={{gap: 24}}>
            <TouchableOpacity
              className="rounded-full items-center justify-center flex-row"
              onPress={() => {
                console.log('archive');
                setSelectedNoteIds([]);
              }}>
              <MaterialIcon
                name={'archive'}
                size={22}
                style={{color: '#ffffff'}}
              />
              <Text className="text-md text-white">Archive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full items-center justify-center flex-row"
              onPress={() => {
                dispatch(deleteMultipleNotes(selectedNoteIds));
                setSelectedNoteIds([]);
              }}>
              <MaterialIcon
                name={'delete'}
                size={22}
                style={{color: '#ffffff'}}
              />
              <Text className="text-md text-white">Trash</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Bottombar navigation={navigation} screen={'Home'} />
    </View>
  );
};

export default HomeScreen;
