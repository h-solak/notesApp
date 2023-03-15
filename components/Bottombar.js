import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
// import Icon from '../icons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {BlurView, VibrancyView} from '@react-native-community/blur';
const Bottombar = ({navigation}) => {
  const grey = {color: 'rgba(255,255,255,0.7)'};
  return (
    <View className="absolute bottom-0 p-4 w-1/2 self-center">
      <View
        className="relative flex-row justify-center items-center rounded-full px-3 py-2"
        style={{
          zIndex: 9999,
          shadowColor: '#ff0000',
          shadowRadius: 300,
          shadowOpacity: 1,
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.3)',
        }}>
        <BlurView
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
          }}
          blurType="light"
          blurRadius={12}
          overlayColor=""
        />
        <View className="flex-row items-center justify-center rounded-full gap-1">
          <TouchableOpacity
            className="justify-center items-center bg-black rounded-full"
            style={{width: 64, height: 64}}
            onPress={() => navigation.navigate('CreateNote')}>
            {/* Temporary padding pb-1 for the text - will be fixed */}
            <Text className="text-white pb-1" style={{fontSize: 40}}>
              +
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="p-3 rounded-full items-center justify-center"
            onPress={() => navigation.navigate('CreateNote')}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              width: 64,
              height: 64,
            }}>
            <MaterialIcon
              name="keyboard-voice"
              size={30}
              style={{color: '#fff'}}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/*
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.navigate('Home')}>
        <AntIcon
          name="home"
          size={28}
          style={{color: screen === 'Home' ? '#fff' : '#6d6d6d'}}
        />
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <EntypoIcon
          name="magnifying-glass"
          size={28}
          style={{color: screen === 'Search' ? '#fff' : '#6d6d6d'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.navigate('CreateNote')}>
        <IonIcon
          name="add-circle-outline"
          size={36}
          style={{color: screen === 'Create' ? '#fff' : '#6d6d6d'}}
        />
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <FeatherIcon
          name="calendar"
          size={28}
          style={{color: screen === 'Calendar' ? '#fff' : '#6d6d6d'}}
        />
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <EntypoIcon
          name="menu"
          size={28}
          style={{color: screen === 'Menu' ? '#fff' : '#6d6d6d'}}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default Bottombar;
