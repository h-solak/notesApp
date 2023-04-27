import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import StandardNote from '../components/notes/StandardNote';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FW5Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList} from 'react-native-gesture-handler';
import {trashMultipleNotes} from '../redux/slices/noteSlice';

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

  //if user presses on back button when select mode on
  useEffect(() => {
    const backAction = () => {
      if (selectedNoteIds?.length > 0) {
        setSelectedNoteIds([]);
      } else {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [selectedNoteIds]);

  return (
    <>
      <ScrollView className="bg-black pt-4" style={{width: width}}>
        <View
          className="mb-2 flex-row items-center justify-between"
          style={{height: height * 0.05, width: width}}>
          <View
            className="flex-row justify-between items-center px-2"
            style={{width: width}}>
            <View className="flex-row items-center" style={{gap: 8}}>
              <TouchableOpacity
                className="w-8 h-8 items-center justify-center rounded-xl"
                onPress={() => navigation.goBack()}>
                <IonIcon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text className="text-xl text-white font-bold">
                {selectedNoteType}{' '}
              </Text>
            </View>
            <View className="flex-row items-center" style={{gap: 4}}>
              <TouchableOpacity
                className="w-8 h-8 items-center justify-center rounded-xl"
                onPress={() => navigation.navigate('Home')}>
                <IonIcon name="grid-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-8 h-8 items-center justify-center rounded-xl"
                onPress={() => navigation.navigate('Home')}>
                <IonIcon name="filter-sharp" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <TouchableOpacity
          className="mx-2 px-2 py-2 rounded-xl bg-noteGrey-900 flex-row items-center"
          style={{gap: 8}}
          onPress={() => navigation.navigate('Search')}>
          <IonIcon name={'search'} size={22} color="#929292" />
          <Text className="text-noteGrey-900 flex-1" style={{color: '#929292'}}>
            Search your notes
          </Text>
        </TouchableOpacity> */}

        {notesFilteredByType?.length > 0 ? (
          <View
            className="items-center justify-center px-2 pt-2 pb-16"
            style={{width: width}}>
            {notesFilteredByType?.map(item => (
              <StandardNote
                key={item.id}
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
            ))}
          </View>
        ) : (
          <View className="flex-1 h-80 w-full items-center justify-center px-2">
            <Text className="text-noteGrey-300">Nothing to see here</Text>
          </View>
        )}
      </ScrollView>
      {selectedNoteIds?.length > 0 && (
        <View
          className="bg-noteGrey-900 h-full w-full px-2 flex-row justify-between items-center"
          style={{height: height * 0.075, position: 'absolute', top: 0}}>
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
                dispatch(trashMultipleNotes(selectedNoteIds));
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
    </>
  );
};

export default NoteTypeScreen;
