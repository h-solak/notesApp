import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';

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
    <View className="h-8 mt-10">
      <ScrollView
        className="h-full"
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {allCategories?.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`items-center justify-center px-5 rounded-full`}
            style={index === category ? {backgroundColor: '#fff'} : null}
            onPress={() => setCategory(index)}>
            <Text
              className={`${
                index === category ? 'text-black' : 'text-white'
              } font-bold text-base`}
              style={{alignSelf: 'center'}}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
