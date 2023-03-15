import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FW5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCategory,
  deleteCategory,
  editCategory,
} from '../../redux/slices/noteSlice';

const EditCategoriesModal = ({modal, setModal}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const categories = useSelector(state => state.note.categories);
  const [categoryInput, setCategoryInput] = useState(''); //input for the new category
  const [editedCategory, setEditedCategory] = useState(''); //text of the edited category
  const [isEditing, setIsEditing] = useState(false); //id of the category that is currently being edited

  const handleAddCategory = () => {
    console.log(categoryInput);
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
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor="#000"
      isVisible={modal}
      onBackdropPress={() => {
        setEditedCategory('');
        setIsEditing('');
        setModal(false);
      }}>
      <View
        className="self-center py-3 px-3 rounded-2xl bg-noteGrey-900"
        style={{
          width: width * 0.7,
          height: height * 0.5,
        }}
        activeOpacity={1}
        onPress={event => {
          if (event.target == event.currentTarget) {
            setModal(false);
          }
        }}
        onPressOut={() => {
          setModal(false);
        }}>
        <Text className="mb-2 first-letter:px-2 text-white text-lg font-bold text-center">
          Edit Categories
        </Text>
        <View className="flex-row justify-center items-center mb-2">
          <View
            className="flex-row items-center gap-0 bg-black rounded-l-xl "
            style={{
              width: width * 0.5,
            }}>
            <TextInput
              className="flex-1 h-10 py-0 px-2 bg-transparent"
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
                <MaterialIcon
                  name={'close'}
                  size={18}
                  style={{color: '#929292'}}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            className="h-10  px-3 rounded-r-xl items-center justify-center self-center align-middle bg-black border-l border-l-noteGrey-300"
            style={{
              width: width * 0.1,
            }}
            onPress={() => handleAddCategory()}>
            <Text className="text-2xl">+</Text>
          </TouchableOpacity>
        </View>
        {categories?.length > 0 ? (
          <ScrollView
            className="pt-1 gap-3"
            showsHorizontalScrollIndicator={false}>
            {categories?.map((item, index) => (
              <View
                className={`flex-row p-1 px-2 justify-between items-center rounded-full self-center ${
                  isEditing === item.id ? 'bg-neutral-700' : 'bg-black'
                }`}
                key={index}
                style={{
                  width: width * 0.6,
                }}>
                <View className="flex-row gap-1 items-center">
                  <TouchableOpacity
                    className="p-1 rounded-full flex-row items-center justify-center align-middle"
                    style={{alignSelf: 'center'}}
                    onPress={() => console.log('Change Category Name')}>
                    {isEditing !== item.id ? (
                      <MaterialIcon
                        name={'edit'}
                        size={18}
                        style={{color: '#fff'}}
                        onPress={() => {
                          setIsEditing(item.id);
                          setEditedCategory(item.name);
                        }}
                      />
                    ) : (
                      <MaterialIcon
                        name={'done'}
                        size={18}
                        style={{color: '#fff'}}
                        onPress={() => {
                          dispatch(
                            editCategory({
                              id: isEditing,
                              newName: editedCategory,
                            }),
                          );
                          setEditedCategory('');
                          setIsEditing('');
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  {isEditing !== item.id ? (
                    <Text className="text-white">{item?.name}</Text>
                  ) : (
                    <TextInput
                      className="text-white py-1"
                      value={editedCategory}
                      onChangeText={item => setEditedCategory(item)}
                      autoFocus></TextInput>
                  )}
                </View>
                <TouchableOpacity
                  className="px-1"
                  onPress={() => dispatch(deleteCategory(item?.id))}>
                  <FW5Icon name={'trash'} size={14} style={{color: '#fff'}} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : null}
        {/* <TouchableOpacity
                className="p-1 border-red-50 items-center justify-center"
                onPress={() => setModal(!modal)}>
                <Text className="text-center">Done</Text>
              </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

export default EditCategoriesModal;
