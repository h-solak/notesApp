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
              uri: 'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403',
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
