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
import Bottombar from '../components/Bottombar';

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
    <View className="bg-black h-full w-full pt-3">
      <View className="w-full flex-row items-center gap-2 px-2">
        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={() => navigation.goBack()}>
          <Ionicon name="arrow-back" size={30} color="#929292" />
        </TouchableOpacity>
        <View className="px-1 flex-1 flex-row justify-between items-center bg-transparent border-2 border-noteGrey-900 rounded-xl">
          <View className="flex-row items-center">
            <Text className="">
              <EntypoIcon name="magnifying-glass" size={20} color="#929292" />
            </Text>
            <TextInput
              placeholder="Search your notes..."
              className="flex-1 py-2 text-white"
              placeholderTextColor={'#929292'}
              value={searchText}
              onChangeText={onSearchTextChange}
              autoFocus
            />
            {searchText?.length > 0 && (
              <TouchableOpacity
                className="bg-transparent"
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
      </View>

      <View className="flex-1 mt-2 px-2">
        {searchText.length > 0 && (
          <View className="flex-row items-center justify-center px-2">
            <Text className="text-noteGrey-500">
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
      <Bottombar screen="Search" navigation={navigation} />
    </View>
  );
};

export default SearchScreen;
