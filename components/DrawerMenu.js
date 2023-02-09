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
import CreateScreen from '../screens/CreateNoteScreen';
import HomeScreen from '../screens/HomeScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
const AppDrawer = props => {
  return (
    <DrawerContentScrollView>
      <View className="bg-black py-5 h-full">
        <Text>Hey</Text>
        <AntIcon
          name={'close'}
          size={44}
          color="#fff"
          onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default AppDrawer;
