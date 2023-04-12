import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';

const EditCategoriesScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  return (
    <View className="bg-black py-3" style={{height: height}}>
      <View className="flex-row items-center gap-2 pb-2">
        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={() => navigation.goBack()}>
          <Ionicon name="arrow-back" size={24} color="#929292" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Categories</Text>
      </View>
      <View className="px-1 flex-1 flex-row justify-between items-center bg-transparent border-2 border-noteGrey-900 rounded-xl">
        <View className="flex-row items-center">
          <Text className="">
            <EntypoIcon name="magnifying-glass" size={20} color="#929292" />
          </Text>
          <TextInput
            placeholder="Search your notes..."
            className="flex-1 py-2 text-white"
            placeholderTextColor={'#929292'}
          />
        </View>
      </View>
    </View>
  );
};

export default EditCategoriesScreen;
