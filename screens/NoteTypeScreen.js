import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import StandartNote from '../components/notes/StandartNote';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FW5Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList} from 'react-native-gesture-handler';
import {deleteMultipleNotes} from '../redux/slices/noteSlice';

/* List of favorite notes, alarmed notes... */
const NoteTypeScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const notesFilteredByType = useSelector(
    state => state.note.notesFilteredByType,
  );
  const selectedNoteType = useSelector(state => state.note.selectedNoteType);
  const handleLongPress = id => {
    if (selectedNoteIds?.includes(id)) {
      let oldArr = selectedNoteIds;
      oldArr = oldArr.filter(item => item !== id);
      setSelectedNoteIds(oldArr);
    } else {
      setSelectedNoteIds(oldArray => [...oldArray, id]);
    }
  };

  useEffect(() => {
    console.log(selectedNoteIds);
  }, [selectedNoteIds]);

  return (
    <View className="bg-black h-full w-full pt-2">
      <View
        className="mb-5 flex-row items-center justify-between"
        style={{height: height * 0.05, width: width}}>
        {selectedNoteIds?.length > 0 ? (
          <View
            className="bg-noteGrey-500 h-full w-full px-4 flex-row justify-between items-center rounded-"
            style={{height: height * 0.075}}>
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
        ) : (
          <>
            <View className="flex-row items-center" style={{gap: 8}}>
              <TouchableOpacity
                className="w-8 h-8 items-center justify-center rounded-xl"
                onPress={() => navigation.navigate('Home')}>
                <Ionicon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text className="text-xl text-white font-bold">
                {selectedNoteType}
              </Text>
            </View>
            <TouchableOpacity
              className="w-8 h-8 items-center justify-center rounded-xl"
              onPress={() => navigation.navigate('Home')}>
              <Ionicon name="filter-sharp" size={32} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </View>

      {notesFilteredByType?.length > 0 ? (
        <View className="px-2">
          <FlatList
            data={notesFilteredByType}
            renderItem={({item}) => (
              <StandartNote
                id={item.id}
                title={item?.title}
                text={item?.text}
                color={item?.color}
                emoji={item?.emoji}
                category={item.category}
                isFavorite={item.isFavorite}
                navigation={navigation}
                handleLongPress={handleLongPress}
                selectedNoteIds={selectedNoteIds}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <View className="flex-1 h-80 w-full items-center justify-center px-2">
          <Text className="text-noteGrey-300">Nothing to see here</Text>
        </View>
      )}
    </View>
  );
};

export default NoteTypeScreen;
