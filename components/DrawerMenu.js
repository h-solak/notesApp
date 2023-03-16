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
import CreateScreen from '../screens/CreateNoteScreen';
import HomeScreen from '../screens/HomeScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const AppDrawer = props => {
  //TO CLOSE: props.navigation.dispatch(DrawerActions.closeDrawer())
  return (
    <DrawerContentScrollView>
      <View className="py-5 h-full">
        <View className="flex-row justify- items-end px-4">
          <View className="gap-1">
            <Text className="text-white text-4xl font-bold">Note're</Text>
            <View className="flex-row items-center">
              <Text className="text-white text-4xl font-bold">Dame</Text>
              <Text className="ml-2 text-noteGrey-300 text-xl font-bold">
                v1
              </Text>
            </View>
          </View>
        </View>
        <View className="pt-8 pb-2 options px-4">
          <TouchableOpacity className="bg-noteGrey- py-3 flex-row items-center gap-3">
            <MCIcons
              name={'calendar-week'}
              size={24}
              style={{color: '#929292'}}
            />
            <Text className="text-noteGrey-300 text-base font-semibold">
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-noteGrey- py-3 flex-row items-center gap-3"
            onPress={() => props.navigation.navigate('Archive')}>
            <MaterialIcon
              name={'archive'}
              size={24}
              style={{color: '#929292'}}
            />
            <Text className="text-noteGrey-300 text-base font-semibold">
              Archived Notes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-noteGrey- py-3 flex-row items-center gap-3"
            onPress={() => props.navigation.navigate('Trash')}>
            <MCIcons name={'trash-can'} size={24} style={{color: '#929292'}} />
            <Text className="text-noteGrey-300 text-base font-semibold">
              Trash
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View className="py-2 border-t border-noteGrey-900 px-4">
          <TouchableOpacity className="bg-noteGrey- py-3 flex-row items-center gap-3">
            <MCIcons name={'pencil'} size={24} style={{color: '#929292'}} />
            <Text className="text-noteGrey-300 text-base font-semibold">
              Edit Categories
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </DrawerContentScrollView>
  );
};

export default AppDrawer;
