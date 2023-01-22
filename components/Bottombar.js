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
// import Icon from '../icons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
const Bottombar = ({navigation}) => {
  const grey = {color: 'rgba(255,255,255,0.7)'};
  return (
    <View
      className="absolute w-full flex-row items-center justify-around pt-1 px-4"
      style={{
        zIndex: 999,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 500,
        shadowOffset: {height: 390, width: 300},
        elevation: 24,
      }}>
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.navigate('Home')}>
        <AntIcon name="home" size={28} color={'#fff'} />
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <EntypoIcon name="magnifying-glass" size={28} style={grey} />
      </TouchableOpacity>
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.navigate('Create')}>
        <IonIcon name="add-circle-outline" size={36} style={grey} />
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <FeatherIcon name="calendar" size={28} style={grey} />
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <EntypoIcon name="menu" size={28} style={grey} />
      </TouchableOpacity>
    </View>
  );
};

export default Bottombar;
