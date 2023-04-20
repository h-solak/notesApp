import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarSvg from '../../assets/icons/calendarsvgrepo.svg';
import MenuSvg from '../../assets/icons/hamburgersvgrepo.svg';

const Topbar = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  return (
    <View className="w-full mt-5 flex-row justify-between items-center">
      <TouchableOpacity
        className="pl-4 flex-row items-center"
        style={{gap: 8, width: width / 2}}
        onPress={() => navigation.openDrawer()}>
        <MenuSvg width={28} height={28} />
        <Text className="text-white font-bold" style={{fontSize: 22}}>
          Noteflow
        </Text>
      </TouchableOpacity>

      <View className="pr-4" style={{width: width / 2}}>
        <View
          className="w-full flex-row items-center justify-end"
          style={{gap: 12}}>
          <TouchableOpacity onPress={() => null}>
            <CalendarSvg width={28} height={28} />
          </TouchableOpacity>
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
