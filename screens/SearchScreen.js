import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {resetSearchedNotes, searchNotes} from '../redux/slices/noteSlice';
import StandartNote from '../components/notes/StandartNote';

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const searchedNotes = useSelector(state => state.note.searchedNotes);
  const [searchText, setSearchText] = useState('');

  const onSearchTextChange = text => {
    setSearchText(text);
    dispatch(searchNotes(text));
  };

  useEffect(() => {
    dispatch(resetSearchedNotes());
  }, []);

  return (
    <View className="bg-black h-full w-full">
      <View className="w-full flex-row items-center gap-2">
        <TouchableOpacity
          className="w-8 h-8 items-center justify-center rounded-xl"
          onPress={() => navigation.navigate('Home')}>
          <Ionicon name="arrow-back" size={30} color="#929292" />
        </TouchableOpacity>
        <View className="flex-1 bg-white rounded-xl flex-row justify-betweendsad items-center">
          <TextInput
            placeholder="Search your notes..."
            className="flex-1 py-2 px-2 bg-white text-black rounded-xl"
            placeholderTextColor={'#000'}
            value={searchText}
            onChangeText={onSearchTextChange}
            autoFocus
          />
          {searchText?.length > 0 && (
            <TouchableOpacity
              className="bg-transparent px-2"
              onPress={() => {
                onSearchTextChange('');
              }}>
              <MaterialIcon
                name={'close'}
                size={18}
                style={{color: '#929292'}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="flex-1 mt-2">
        {searchText.length > 0 && (
          <View className="flex-row items-center justify-center px-2 gap-1 ">
            <EntypoIcon name="magnifying-glass" size={16} color="#6b7280" />
            <Text className="text-gray-500">
              {searchedNotes?.length} result(s) found
            </Text>
          </View>
        )}
        {searchedNotes?.length > 0 && (
          <ScrollView
            className={`flex-col ${searchText?.length < 1 ? 'mt-4' : 'mt-2'}`}>
            {searchedNotes?.map((item, index) => (
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
        )}
        {/* {searchText.length > 0 && searchedNotes.length == 0 ? (
          <View className="self-center h-80 w-80 items-center justify-center bg-">
            <Text>Nothing to see</Text>
          </View>
        ) : null} */}
      </View>
    </View>
  );
};

export default SearchScreen;
