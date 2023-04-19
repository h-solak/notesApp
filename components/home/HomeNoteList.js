import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  FlatList,
  useWindowDimensions,
} from 'react-native';

/* Components */
import StandardNote from '../notes/StandardNote';
import {useSelector, useDispatch} from 'react-redux';
import {resetNotes, setCategory} from '../../redux/slices/noteSlice';

const HomeNoteList = ({selectedNoteIds, setSelectedNoteIds, navigation}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const notesFilteredByCategory = useSelector(
    state => state.note.notesFilteredByCategory,
  );
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
    <View className="mt-3 pb-24">
      {/*Individual Notes*/}
      {notesFilteredByCategory?.length > 0 ? (
        //notes have px-2, other parts of the home screen have px-4
        <ScrollView className="mt-3 px-2" style={{width: width}}>
          {notesFilteredByCategory?.map((item, index) => (
            <StandardNote
              key={index}
              id={item.id}
              title={item?.title}
              text={item?.text}
              color={item?.color}
              emoji={item?.emoji}
              category={item.category}
              isFavorite={item.isFavorite}
              handleLongPress={handleLongPress}
              selectedNoteIds={selectedNoteIds}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="mt-20 items-center justify-center" style={{gap: 4}}>
          <Text className="text-noteGrey-500">Nothing to see</Text>
        </View>
      )}
    </View>
  );
};

export default HomeNoteList;
