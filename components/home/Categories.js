import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

const Categories = () => {
  const [category, setCategory] = useState(0);
  const allCategories = [
    'All',
    'Plans',
    'Shopping',
    'Fitness',
    'Vacations',
    'Stuff',
  ];
  return (
    <View className="h-8 mt-10" horizontal={true}>
      <ScrollView className="h-full" horizontal={true}>
        {allCategories?.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`items-center justify-center px-6 py-1 rounded-3xl ${
              category === index && 'bg-notePink'
            }`}
            onPress={() => setCategory(index)}>
            <Text className="text-white font-bold text-base">{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
