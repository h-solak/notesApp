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
import {MotiView, AnimatePresence} from 'moti';
import CategorySvg from '../../assets/icons/categorysvgrepo.svg';
import EmptyNoteSvg from '../../assets/icons/emptynotesvgrepo.svg';

const HomeNoteList = ({selectedNoteIds, setSelectedNoteIds, navigation}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const {notesFilteredByCategory, homenotesLoading, selectedCategory} =
    useSelector(state => state.note);
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
    <View className="mt-4 pb-24">
      {/*Individual Notes*/}
      {homenotesLoading ? (
        <Text>Loading...</Text>
      ) : notesFilteredByCategory?.length > 0 ? (
        //notes have px-2, other parts of the home screen have px-4
        <ScrollView className="px-2" style={{width: width}}>
          <AnimatePresence>
            {notesFilteredByCategory?.map(
              (item, index) =>
                notesFilteredByCategory && (
                  <MotiView
                    key={item?.id}
                    style={{flex: 1}}
                    from={{
                      opacity: 0,
                      translateX: -50 + index * 10,
                      // scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      translateX: 0,
                      // scale: 1,
                    }}
                    transition={{
                      type: 'spring',
                      duration: 200,
                      delay: 50,
                    }}>
                    <StandardNote
                      key={index}
                      id={item?.id}
                      title={item?.title}
                      text={item?.text}
                      color={item?.color}
                      emoji={item?.emoji}
                      category={item?.category}
                      isFavorite={item?.isFavorite}
                      handleLongPress={handleLongPress}
                      selectedNoteIds={selectedNoteIds}
                      navigation={navigation}
                    />
                  </MotiView>
                ),
            )}
          </AnimatePresence>
        </ScrollView>
      ) : (
        <View className="mt-20 items-center justify-center" style={{gap: 6}}>
          <EmptyNoteSvg width={36} height={36} />
          <View className="items-center">
            <Text className="text-sm" style={{color: '#929292'}}>
              No notes yet
            </Text>
            {selectedCategory === 0 && (
              <Text className="text-xs text-center" style={{color: '#929292'}}>
                (Press on the plus button to create one!)
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeNoteList;
