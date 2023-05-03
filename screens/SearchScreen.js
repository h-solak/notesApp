import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  BackHandler,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {resetSearchedNotes, searchNotes} from '../redux/slices/noteSlice';
import StandardNote from '../components/notes/StandardNote';
import Bottombar from '../components/Bottombar';
import EmptyNoteSvg from '../assets/icons/emptynotesvgrepo2.svg';

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const searchedNotes = useSelector(state => state.note.searchedNotes);
  const [searchText, setSearchText] = useState('');

  const onSearchTextChange = text => {
    setSearchText(text);
    dispatch(searchNotes(text));
  };

  useEffect(() => {
    dispatch(resetSearchedNotes());

    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View className="bg-black pt-3" style={{height: height, width: width}}>
      <View
        className="flex-row items-center px-2 py-2 border-b-2"
        style={{borderColor: '#191919'}}>
        <Pressable
          className="px-2 h-8 items-center justify-center"
          android_ripple={{color: '#ffffff30', borderless: true}}
          hitSlop={{left: 500, top: 500, bottom: 100, right: 100}}
          onPress={() => navigation.goBack()}>
          <View style={{borderRadius: 10}}>
            <Ionicon name="arrow-back" size={28} color="#929292" />
          </View>
        </Pressable>
        <View className="px-1 flex-1 flex-row justify-between items-center bg-transparent rounded-xl">
          <View className="flex-row items-center">
            {/* <Text className="">
              <EntypoIcon name="magnifying-glass" size={20} color="#929292" />
            </Text> */}
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
                  size={22}
                  style={{color: '#929292'}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View className="flex-1 px-2">
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{minHeight: height * 0.5}}
          className={`flex-col ${searchText?.length < 1 ? 'mt-4' : 'mt-2'}`}>
          {searchText.length > 0 && searchedNotes?.length > 0 ? (
            <View
              className="flex-row items-center justify-center px-2 mb-2"
              style={{gap: 4}}>
              <EntypoIcon name="magnifying-glass" size={18} color="#6d6d6d" />
              <Text className="text-noteGrey-500">
                {searchedNotes?.length} result(s) found
              </Text>
            </View>
          ) : null}
          {searchedNotes?.length == 0 ? (
            <View
              className="items-center justify-center"
              style={{gap: 6, height: height * 0.9}}>
              <EmptyNoteSvg width={72} height={72} />
              <Text className="text-sm" style={{color: '#929292'}}>
                No notes
              </Text>
            </View>
          ) : (
            searchedNotes?.map((item, index) => (
              <StandardNote
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
            ))
          )}
        </ScrollView>
        {/* {searchText.length > 0 && searchedNotes.length == 0 ? (
          <View className="self-center h-80 w-80 items-center justify-center bg-">
            <Text>Nothing to see</Text>
          </View>
        ) : null} */}
      </View>
      {/* <Bottombar screen="Search" navigation={navigation} /> */}
    </View>
  );
};

export default SearchScreen;
