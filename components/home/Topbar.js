import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

const Topbar = () => {
  return (
    <View className="w-full mt-10 flex-row justify-between items-start">
      <View className="basis-9/12 flex-column">
        <Text className="text-white text-6xl font-bold">Note're</Text>
        <Text className="text-white text-6xl font-bold">Dame</Text>
      </View>
      <View className="basis-3/12 justify-center items-center overflow-hidden">
        <Image
          source={{
            uri: 'https://hasansolak.com/static/media/me.ceef88180459ba31b0ae.png',
          }}
          className="w-12 h-12 rounded-full"
          style={{borderWidth: 2, borderColor: '#ffffff'}}
        />
      </View>
    </View>
  );
};

export default Topbar;

/*
<View className="basis-1/12 px-2 items-center justify-center">
  <View className="flex-row items-center bg-rose-900 rounded-3xl">
    <Text className="basis-1/6 text-center text-2xl">🍔</Text>
    <TextInput
      className="basis-4/6 text-base font-bold"
      placeholder="Search Your Notes"
    />
    <Text className="basis-1/6 text-center text-2xl">👤</Text>
  </View>
</View>

*/
