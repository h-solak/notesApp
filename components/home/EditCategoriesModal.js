import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FW5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {addCategory, deleteCategory} from '../../redux/slices/noteSlice';

const EditCategoriesModal = ({modal, setModal}) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.note.categories);
  const [categoryInput, setCategoryInput] = useState('');

  const addCategory = () => {
    try {
      if (categoryInput !== '') {
        dispatch(addCategory(categoryInput));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCategoryInput('');
    }
  };

  return (
    <View style={{alignSelf: 'center'}}>
      <TouchableOpacity
        className="ml-3 bg-secondary p-1 rounded-full flex-row items-center justify-center align-middle"
        onPress={() => setModal(!modal)}>
        <MaterialIcon name={'edit'} size={16} style={{color: '#000'}} />
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <Pressable onPress={() => setModal(!modal)}>
          <View
            className="flex-col relative h-full w-full items-center justify-center bottom-0"
            style={{backgroundColor: 'rgba(0,0,0,0.8)'}}
            activeOpacity={1}
            onPress={event => {
              if (event.target == event.currentTarget) {
                setModal(false);
              }
            }}
            onPressOut={() => {
              setModal(false);
            }}>
            <View
              className="py-3 px-3 w-60 h-72 rounded-2xl bg-noteGrey-900"
              //   style={{backgroundColor: '#e2e2e2'}}
            >
              <Text className="mb-2 first-letter:px-2 text-white text-lg font-bold text-center">
                Edit Categories
              </Text>
              <View className="flex-row items-center gap-0 mb-2 bg-black rounded-xl border ">
                <TextInput
                  className="py-1 px-2 flex-1 bg-transparent rounded-l-xl"
                  style={{fontSize: 14}}
                  placeholder="Add a category"
                  maxLength={15}
                  value={categoryInput}
                  onSubmitEditing={() => addCategory()}
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
                    <MaterialIcon
                      name={'close'}
                      size={18}
                      style={{color: '#929292'}}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className="bg-noteGrey-900 py-2 px-2 rounded-r-xl"
                  onPress={() => addCategory()}>
                  <MaterialIcon
                    name={'add'}
                    size={20}
                    style={{color: '#fff'}}
                  />
                </TouchableOpacity>
              </View>
              {categories?.length > 0 ? (
                <ScrollView
                  className="pt-1 gap-3"
                  showsHorizontalScrollIndicator={false}>
                  {categories?.map((item, index) => (
                    <Pressable
                      className="flex-row p-1 px-2 justify-between items-center bg-black rounded-full"
                      key={index}
                      onPress={null}>
                      <View className="flex-row gap-1 items-center">
                        <TouchableOpacity
                          className="p-1 rounded-full flex-row items-center justify-center align-middle"
                          style={{alignSelf: 'center'}}
                          onPress={() => console.log('Change Category Name')}>
                          <MaterialIcon
                            name={'edit'}
                            size={16}
                            style={{color: '#fff'}}
                          />
                        </TouchableOpacity>
                        <Text className="text-white">{item?.name}</Text>
                      </View>
                      <TouchableOpacity
                        className="px-1"
                        onPress={() => dispatch(deleteCategory(item?.id))}>
                        <FW5Icon
                          name={'trash'}
                          size={13}
                          style={{color: '#fff'}}
                        />
                      </TouchableOpacity>
                    </Pressable>
                  ))}
                </ScrollView>
              ) : null}
              {/* <TouchableOpacity
                className="p-1 border-red-50 items-center justify-center"
                onPress={() => setModal(!modal)}>
                <Text className="text-center">Done</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default EditCategoriesModal;
