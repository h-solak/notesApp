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
  const allCategories = [{id: 0, name: 'All'}].concat(categories); //might cause bugs? (useeffect?)
  const [editCategoriesModal, setEditCategoriesModal] = useState(false);

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
            style={
              item.id == selectedCategory ? {backgroundColor: '#fff'} : null
            }
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

        <EditCategoriesModal
          modal={editCategoriesModal}
          setModal={setEditCategoriesModal}
        />
      </ScrollView>
    </View>
  );
};

export default Categories;
