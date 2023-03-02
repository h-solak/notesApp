import React, {useRef, useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {filterNotesByCategory} from '../../redux/slices/noteSlice';

const Categories = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.note.categories);
  const selectedCategory = useSelector(state => state.note.selectedCategory);
  const allCategories = ['All'].concat(categories);
  useEffect(() => {
    //scroll to the start if the category changes
    scrollRef.current?.scrollTo({
      x: 0,
      animated: false /* ? */,
    });
  }, [selectedCategory]);

  return (
    <View className="h-8 mt-10">
      <ScrollView
        className="h-full"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}>
        {allCategories?.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`items-center justify-center px-5 rounded-full`}
            style={item === selectedCategory ? {backgroundColor: '#fff'} : null}
            onPress={() => {
              dispatch(filterNotesByCategory(item));
            }}>
            <Text
              className={`${
                item === selectedCategory ? 'text-black' : 'text-white'
              } font-bold text-base`}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        {allCategories?.length < 2 ? (
          <TouchableOpacity
            className="ml-2 rounded-full items-center justify-center align-middle"
            style={{alignSelf: 'center'}}>
            <MaterialIcon
              name={'add-circle'}
              size={24}
              style={{color: '#fff'}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="ml-3 bg-secondary p-1 rounded-full flex-row items-center justify-center align-middle"
            style={{alignSelf: 'center'}}>
            <MaterialIcon name={'edit'} size={16} style={{color: '#000'}} />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default Categories;
