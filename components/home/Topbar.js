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
  );
};

export default Topbar;
