import React from 'react';
import {View, Text, Image} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Topbar = ({navigation}) => {
  return (
    <View className="w-full mt-10 flex-row justify-between items-start">
      <View className="basis-6/12 flex-column">
        <Text className="text-white text-5xl font-bold">Note're</Text>
        <Text className="text-white text-5xl font-bold">Dame</Text>
      </View>
      <View className="basis-6/12">
        <View className="w-full flex-row items-center justify-end gap-3">
          <Image
            source={{
              uri: 'https://hasansolak.com/static/media/me.ceef88180459ba31b0ae.png',
            }}
            className="w-8 h-8 rounded-full"
            style={{borderWidth: 2, borderColor: '#ffffff'}}
          />
          <IonIcon name={'search'} size={36} color="#fff" />
          <IonIcon
            name={'menu'}
            size={44}
            color="#fff"
            onPress={() => navigation.openDrawer()}
          />
        </View>
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
