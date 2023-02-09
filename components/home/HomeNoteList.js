import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Components */
import StandartNote from '../notes/StandartNote';
import {useSelector, useDispatch} from 'react-redux';
import {resetNotes} from '../../redux/slices/noteSlice';

const HomeNoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.note.notes);

  return (
    <View className="h-full bg-red mt-3 pb-24">
      {/* Two favorites */}
      {/*Individual Notes*/}

      {notes?.length > 0 ? (
        <ScrollView className="mt-3 flex-col">
          {notes?.map((item, index) => (
            <StandartNote
              key={index}
              id={item.id}
              title={item?.title}
              text={item?.text}
              color={item?.color}
              emoji={item?.emoji}
              category={item.category}
              isFavorite={item.isFavorite}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="mt-20 items-center justify-center">
          <Text className="text-noteGrey-500">Nothing to see</Text>
        </View>
      )}
    </View>
  );
};

export default HomeNoteList;
