import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import StandartNote from '../components/notes/StandartNote';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';

/* List of favorite notes, alarmed notes... */
const NoteTypeScreen = ({navigation}) => {
  const notesFilteredByType = useSelector(
    state => state.note.notesFilteredByType,
  );
  const selectedNoteType = useSelector(state => state.note.selectedNoteType);
  return (
    <View className="bg-black h-full w-full pt-2">
      <View className={`flex-col px-2`}>
        <View className="mb-5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
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
        </View>
        {notesFilteredByType?.length > 0 ? (
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
                // selectedId={selectedId}
                // setSelectedId={setSelectedId}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <View className="flex-1 h-80 w-full items-center justify-center">
            <Text className="text-noteGrey-300">Nothing to see here</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default NoteTypeScreen;
