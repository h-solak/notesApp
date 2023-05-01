import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useRef} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FW5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCategory,
  deleteCategory,
  editCategory,
} from '../redux/slices/noteSlice';

const CategoryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const inputRef = useRef(null);
  const {categories} = useSelector(state => state.note);
  const [editedCategory, setEditedCategory] = useState(''); //text of the edited category
  const [isEditing, setIsEditing] = useState(false); //id of the category that is currently being edited
  const [categoryInput, setCategoryInput] = useState(''); //input for the new category

  const handleAddCategory = () => {
    try {
      if (categoryInput !== '') {
        dispatch(addCategory(categoryInput));
      }
      setCategoryInput('');
      Keyboard.dismiss();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="bg-black py-3 px-2" style={{height: height}}>
      {/* Topbar */}
      <View className="flex-row items-center" style={{gap: 12}}>
        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={() => navigation.goBack()}>
          <Ionicon name="arrow-back" size={30} color="#929292" />
        </TouchableOpacity>
        <Text className="text-xl text-white font-bold">Categories</Text>
      </View>
      <View
        className="mt-4 flex-row items-center self-center border-2 border-white20 rounded-xl"
        style={{
          width: width * 0.9,
        }}>
        <TextInput
          ref={inputRef}
          className="flex-1 h-12 py-0 px-3 bg-transparent"
          style={{fontSize: 14}}
          placeholder="Add a category"
          maxLength={15}
          value={categoryInput}
          onSubmitEditing={() => handleAddCategory()}
          onChangeText={text => {
            setCategoryInput(text);
          }}
        />
        {categoryInput?.length > 0 && (
          <TouchableOpacity
            className="bg-transparent px-2"
            onPress={() => {
              setCategoryInput('');
            }}>
            <MaterialIcon name={'close'} size={18} style={{color: '#929292'}} />
          </TouchableOpacity>
        )}
        <Pressable
          className="bg-noteGrey-900 pl-3 pr-3 h-12 items-center justify-center rounded-r-lg"
          android_ripple={{color: '#ffffff30', borderless: false}}
          onPress={handleAddCategory}>
          <Text>Add</Text>
        </Pressable>
      </View>
      {categories?.length > 0 ? (
        <ScrollView
          className="pt-4 gap-3"
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {categories?.map((item, index) => (
            <View
              className={`flex-row justify-between items-center rounded-full self-center ${
                isEditing === item?.id
                  ? 'bg-neutral-700 h-14'
                  : 'bg-white20 h-12'
              }`}
              key={index}
              style={{
                width: width * 0.9,
              }}>
              <View className="flex-row gap-1 items-center">
                <Pressable
                  className={`pl-4 pr-2 rounded-full self-center items-center justify-center ${
                    isEditing === item?.id ? 'h-14' : 'h-12'
                  }`}
                  android_ripple={{color: '#ffffff30', borderless: true}}
                  style={{alignSelf: 'center'}}
                  onPress={
                    isEditing !== item?.id
                      ? () => {
                          setIsEditing(item.id);
                          setEditedCategory(item.name);
                        }
                      : () => {
                          dispatch(
                            editCategory({
                              id: isEditing,
                              newName: editedCategory,
                            }),
                          );
                          setEditedCategory('');
                          setIsEditing('');
                        }
                  }>
                  {isEditing !== item?.id ? (
                    <MaterialIcon
                      name={'edit'}
                      size={18}
                      style={{color: '#fff'}}
                    />
                  ) : (
                    <MaterialIcon
                      name={'done'}
                      size={18}
                      style={{color: '#fff'}}
                    />
                  )}
                </Pressable>
                {isEditing !== item?.id ? (
                  <Text className="text-white">{item?.name}</Text>
                ) : (
                  <TextInput
                    className="text-white py-1"
                    value={editedCategory}
                    onChangeText={item => setEditedCategory(item)}
                    autoFocus></TextInput>
                )}
              </View>
              <Pressable
                className={`px-8 rounded-full self-center items-center justify-center ${
                  isEditing === item?.id ? 'h-14' : 'h-12'
                }`}
                onPress={() => dispatch(deleteCategory(item?.id))}
                android_ripple={{color: '#ffffff30', borderless: true}}>
                <FW5Icon name={'trash'} size={14} style={{color: '#fff'}} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View
          className="px-5 text-center items-center justify-center bg-"
          style={{height: height * 0.8}}>
          <Text className="text-center ">Nothing to see here.</Text>
          <Text className="text-center font-bold">
            (Add some categories like "Shopping")
          </Text>
        </View>
      )}
    </View>
  );
};

export default CategoryScreen;
