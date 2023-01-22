import React from 'react';
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

const Bottombar = () => {
  return (
    <View className="basis-1/12 w-full flex-row items-center justify-around bg-rose-900">
      <TouchableOpacity className="p-2">
        <Text className="text-center text-2xl">🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <Text className="text-center text-2xl">📝</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <Text className="text-center text-2xl">🔍</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <Text className="text-center text-2xl">👤</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Bottombar;
