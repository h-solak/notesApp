import React, {useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  changeCategory,
  filterNotesByCategory,
} from '../../redux/slices/noteSlice';
import CategorySvg from '../../assets/icons/categorysvgrepo.svg';
import FilterSvg from '../../assets/icons/filtersvgrepo.svg';

const Categories = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const notesFilteredByCategory = useSelector(
    state => state.note.notesFilteredByCategory,
  );
  const categories = useSelector(state => state.note.categories);
  const selectedCategory = useSelector(state => state.note.selectedCategory);

  const [editCategoriesModal, setEditCategoriesModal] = useState(false);

  useEffect(() => {
    //scroll to the start if the category changes
    scrollRef.current?.scrollTo({
      x: 0,
      animated: true,
    });

    //if selected category is deleted or all categories are deleted, select "all"
    if (
      !categories?.some(item => item?.id === selectedCategory) ||
      categories.length === 0
    ) {
      dispatch(changeCategory(0));
      dispatch(filterNotesByCategory(0));
    }
  }, [selectedCategory, categories]);

  return (
    <View className="mt-8 pl-4 pr-1 flex-row items-center">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={{display: 'flex', alignItems: 'center', gap: 2}}
        style={{gap: 2}}>
        <TouchableOpacity
          className="mr-3 rounded-full flex-row items-center justify-center align-middle self-center"
          onPress={() => navigation.navigate('Category')}
          //navigation.navigate('EditCategories')
        >
          {/* <MaterialIcon name={'edit'} size={20} style={{color: '#fff'}} /> */}
          <CategorySvg width={22} height={22} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          className="align-middle self-center mr-2"
          onPress={() => setEditCategoriesModal(!editCategoriesModal)}
          //navigation.navigate('EditCategories')
        >
          <FilterSvg width={24} height={24} />
        </TouchableOpacity> */}

        <TouchableHighlight
          className={`py-1 px-4 items-center justify-center rounded-full ${
            selectedCategory === 0 && 'bg-white'
          }`}
          style={{paddingVertical: 2}}
          onPress={() => {
            dispatch(changeCategory(0));
            dispatch(filterNotesByCategory(0));
          }}
          activeOpacity={0.8}
          underlayColor={'#ffffff30'}>
          <Text
            className={`${
              selectedCategory === 0 ? 'text-black' : 'text-white'
            } font-bold text-sm`}>
            All{' '}
            {/* {selectedCategory == 0 && `(${notesFilteredByCategory?.length})`} */}
          </Text>
        </TouchableHighlight>

        {categories?.map((item, index) => (
          <TouchableHighlight
            key={index}
            className={`py-1 px-4 items-center justify-center rounded-full ${
              item?.id === selectedCategory && 'bg-white'
            }`}
            onPress={() => {
              dispatch(changeCategory(item?.id));
              dispatch(filterNotesByCategory(item?.id));
            }}
            activeOpacity={0.8}
            underlayColor={'#ffffff20'}>
            <Text
              className={`${
                item?.id === selectedCategory ? 'text-black' : 'text-white'
              } font-bold text-sm`}>
              {item?.name}{' '}
              {/* {item?.id === selectedCategory &&
                `(${notesFilteredByCategory?.length})`} */}
            </Text>
          </TouchableHighlight>
        ))}
      </ScrollView>
      {/* <View className="flex-row justify-end">
        <TouchableOpacity
          className="items-center justify-center rounded-xl"
          onPress={() => navigation.navigate('Home')}>
          <Ionicon name="filter-sharp" size={24} color="#fff" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Categories;
