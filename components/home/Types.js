import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const Categories = () => {
  return (
    <View className="mt-7 h-64">
      <ScrollView
        className="w-full h-40 flex-row gap-3"
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {[1, 1, 1].map((item, index) => (
          <TouchableOpacity
            key={index}
            className="w-40 relative bg-indigo-500 rounded-3xl px-5"
            onPress={() => console.log('not goofy')}>
            <TouchableOpacity
              className="absolute h-10 w-10 rounded-full items-center justify-center p-2"
              style={{
                right: 10,
                top: 10,
                backgroundColor: 'rgba(255,255,255,0.3)',
                zIndex: 99,
              }}
              onPress={() => console.log('goofy')}>
              <AntIcon name="hearto" size={22} style={{color: '#fff'}} />
            </TouchableOpacity>
            <Text
              className="w-4/5 text-white font-bold text-xl mt-6 pr-4"
              style={{lineHeight: 24}}>
              Notes w/ Images
            </Text>

            <Text
              className="absolute text-base"
              style={{
                bottom: 0,
                left: '50%',
                // borderWidth: 2,
                // borderColor: '#ffffff',
              }}>
              Image here
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
