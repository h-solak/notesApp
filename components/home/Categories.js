import React, {useRef, useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {filterNotesByCategory} from '../../redux/slices/noteSlice';
import EditCategoriesModal from './EditCategoriesModal';

const Categories = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const filteredNotes = useSelector(state => state.note.filteredNotes);
  const categories = useSelector(state => state.note.categories);
  const selectedCategory = useSelector(state => state.note.selectedCategory);
  let allCategories = [{id: 0, name: 'All'}].concat(categories);

  const [editCategoriesModal, setEditCategoriesModal] = useState(false);

  useEffect(() => {
    allCategories = [{id: 0, name: 'All'}].concat(categories);
  }, [categories, filteredNotes]);

  useEffect(() => {
    //scroll to the start if the category changes
    scrollRef.current?.scrollTo({
      x: 0,
      animated: false /* ? */,
    });

    //if selected category is deleted or all categories are deleted, select "all"
    if (
      !categories?.some(item => item.id === selectedCategory) ||
      categories.length === 0
    ) {
      dispatch(filterNotesByCategory(0));
    }
  }, [selectedCategory, categories]);

  return (
    <View className="h-8 mt-10 px-4">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}>
        {allCategories?.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`items-center justify-center rounded-full ${
              item.id !== selectedCategory ? 'px-3' : 'bg-white px-5'
            }`}
            onPress={() => {
              dispatch(filterNotesByCategory(item.id));
            }}>
            <Text
              className={`${
                item.id === selectedCategory ? 'text-black' : 'text-white'
              } font-bold text-base`}>
              {item.name}{' '}
              {item.id === selectedCategory && `(${filteredNotes?.length})`}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          className="ml-3 w-6 h-6 bg-noteGrey-300 p-1 rounded-full flex-row items-center justify-center align-middle self-center"
          onPress={() => setEditCategoriesModal(!editCategoriesModal)}>
          <MaterialIcon name={'edit'} size={16} style={{color: '#000'}} />
        </TouchableOpacity>

        <EditCategoriesModal
          modal={editCategoriesModal}
          setModal={setEditCategoriesModal}
        />
      </ScrollView>
    </View>
  );
};

export default Categories;
