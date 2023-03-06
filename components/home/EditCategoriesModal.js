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
              className="pt-3 pb-2 px-3 bg-noteGrey- w-60 h-60 rounded-2xl bg-noteGrey-900"
              //   style={{backgroundColor: '#e2e2e2'}}
            >
              <Text className="px-2 text-white font-bold text-center">
                Edit Categories
              </Text>
              <View className="py-2 flex-row items-center gap-2 mb-2">
                <TextInput
                  className="py-1 px-2 flex-1 bg-black rounded-xl"
                  placeholder="Add"
                  maxLength={15}
                  value={categoryInput}
                  onChangeText={text => {
                    setCategoryInput(text);
                  }}
                />
                <TouchableOpacity
                  className="bg-black p-1 rounded-full"
                  onPress={() => {
                    try {
                      if (categoryInput !== '') {
                        dispatch(addCategory(categoryInput));
                      }
                    } catch (err) {
                      console.log(err);
                    } finally {
                      setCategoryInput('');
                    }
                  }}>
                  <MaterialIcon
                    name={'add'}
                    size={18}
                    style={{color: '#fff'}}
                  />
                </TouchableOpacity>
              </View>
              {categories?.length > 0 ? (
                <ScrollView
                  className="gap-2"
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
              <TouchableOpacity
                className="p-1 border-red-50 items-center justify-center"
                onPress={() => setModal(!modal)}>
                <Text className="text-center">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default EditCategoriesModal;
