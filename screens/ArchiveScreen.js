import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TrashedNote from '../components/notes/TrashedNote';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {unarchiveNotes} from '../redux/slices/noteSlice';
import MenuSvg from '../assets/icons/hamburgersvgrepo.svg';
import {DrawerActions} from '@react-navigation/native';
/* List of favorite notes, alarmed notes... */
const ArchiveScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false); //for multiple deletes
  const archivedNotes = useSelector(state => state.note.archivedNotes);

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
    <View className="bg-black h-full w-full pt-4">
      <ScrollView
        className={`flex-col px-2`}
        showsVerticalScrollIndicator={false}>
        <View className="mb-5 py-1 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              className="flex-row items-center justify-center rounded-xl"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{gap: 8}}>
              <MenuSvg width={28} height={28} />
              <Text className="text-xl text-white font-bold">Trash</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="w-8 h-8 items-center justify-center rounded-xl"
            onPress={() => navigation.navigate('Home')}>
            <Ionicon name="filter-sharp" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {archivedNotes?.length > 0 ? (
          <View className="pb-8">
            {archivedNotes?.map((item, index) => (
              <TrashedNote
                key={index}
                id={item?.id}
                title={item?.title}
                text={item?.text}
                color={item?.color}
                emoji={item?.emoji}
                category={item?.category}
                isFavorite={item?.isFavorite}
                isArchiveScreen={true}
                selectedNoteIds={selectedNoteIds}
                setSelectedNoteIds={setSelectedNoteIds}
                handleLongPress={handleLongPress}
                navigation={navigation}
              />
            ))}
          </View>
        ) : (
          <View className="flex-1 h-80 w-full items-center justify-center">
            <Text className="text-noteGrey-300">Nothing to see here</Text>
          </View>
        )}
      </ScrollView>
      {selectedNoteIds?.length > 0 && (
        <View
          className="absolute top-0 bg-noteGrey-900 px-4 flex-row justify-between items-center"
          style={{height: height * 0.08, width: width}}>
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
              className="rounded-full items-center justify-center"
              onPress={() => {
                const allItems = archivedNotes?.map(item => item?.id);
                setSelectedNoteIds(allItems);
              }}>
              <MaterialIcon
                name={'select-all'}
                size={22}
                style={{color: '#ffffff'}}
              />
              <Text className="text-md text-white">Select All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full items-center justify-center"
              onPress={() => {
                dispatch(unarchiveNotes(selectedNoteIds));
                setSelectedNoteIds([]);
              }}>
              <MaterialIcon
                name={'archive'}
                size={22}
                style={{color: '#ffffff'}}
              />
              <Text className="text-md text-white">Unarchive</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-full items-center justify-center"
              onPress={() => {
                setDeleteModal(true);
              }}>
              <MaterialIcon
                name={'delete'}
                size={22}
                style={{color: '#ffffff'}}
              />
              <Text className="text-md text-white">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ArchiveScreen;
