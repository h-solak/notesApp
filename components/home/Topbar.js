import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Topbar = ({navigation}) => {
  return (
    <View className="w-full mt-5 flex-row justify-between items-top">
      <View className="pl-4 basis-6/12 flex-row items-top" style={{gap: 4}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <IonIcon name={'menu'} size={32} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Noteflow</Text>
      </View>

      <View className="pr-4 basis-6/12">
        <View
          className="w-full flex-row items-center justify-end"
          style={{gap: 10}}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <IonIcon name={'search'} size={28} color="#fff" />
          </TouchableOpacity> */}
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403',
              }}
              className="w-7 h-7 rounded-full"
              style={{borderWidth: 2, borderColor: '#ffffff'}}
            />
          </TouchableOpacity>
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
