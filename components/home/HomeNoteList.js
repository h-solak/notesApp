import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';

/* Components */
import StandartNote from '../notes/StandartNote';
import {useSelector, useDispatch} from 'react-redux';
import {resetNotes, setCategory} from '../../redux/slices/noteSlice';

const HomeNoteList = ({navigation}) => {
  const dispatch = useDispatch();
  const filteredNotes = useSelector(state => state.note.filteredNotes);

  return (
    <View className="h-full bg-red mt-3 pb-24">
      {/*Individual Notes*/}
      {filteredNotes?.length > 0 ? (
        <ScrollView className="mt-3 flex-col">
          {filteredNotes?.map((item, index) => (
            <StandartNote
              key={index}
              id={item.id}
              title={item?.title}
              text={item?.text}
              color={item?.color}
              emoji={item?.emoji}
              category={item.category}
              isFavorite={item.isFavorite}
              navigation={navigation}
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
