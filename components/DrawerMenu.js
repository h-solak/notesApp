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
      <View className="py-5 h-full">
        <View className="flex-row justify-between items-top px-4">
          <View className="gap-1">
            <Text className="text-white text-4xl font-bold">Note're</Text>
            <Text className="text-white text-4xl font-bold">Dame</Text>
          </View>
          {/* <AntIcon
            name={'close'}
            size={32}
            color="#fff"
            onPress={() =>
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }
          /> */}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default AppDrawer;
