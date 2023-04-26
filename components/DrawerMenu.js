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
  useWindowDimensions,
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
import HomeSvg from '../assets/icons/homesvgrepo.svg';
const AppDrawer = props => {
  const {height, width} = useWindowDimensions();
  //TO CLOSE: props.navigation.dispatch(DrawerActions.closeDrawer())
  return (
    <DrawerContentScrollView>
      <View
        className="py-5"
        style={{
          height: height,
          backgroundColor: '#000000',
          // borderRightWidth: 2,
          // borderRightColor: '#ffffff10',
          borderRadius: 12,
        }}>
        <View className="flex-row px-4">
          <Text className="text-white text-2xl font-bold">Noteflow</Text>
        </View>
        {/* Home section */}
        <View className="pt-8 px-4 justify-between my-2 py-2 border-b border-noteGrey-900">
          <TouchableOpacity
            className="py-4 flex-row items-center gap-3"
            onPress={() => props.navigation.navigate('Home')}>
            <HomeSvg width={22} height={22} />
            <Text className="text-noteGrey-300 text-md font-semibold">
              Home
            </Text>
          </TouchableOpacity>
        </View>
        {/* Another section */}
        <View className="pb-2 px-4 options">
          {/* <TouchableOpacity
            className="py-4 border-b border-noteGrey-900 flex-row items-center gap-3"
            onPress={() => props.navigation.navigate('Home')}>
            <HomeSvg width={22} height={22} />
            <Text className="text-noteGrey-300 text-md font-semibold">
              Home
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            className="py-4 flex-row items-center gap-3"
            onPress={() => props.navigation.navigate('Task')}>
            <MCIcons
              name={'calendar-week'}
              size={24}
              style={{color: '#929292'}}
            />
            <Text className="text-noteGrey-300 text-md font-semibold">
              Tasks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-4 flex-row items-center gap-3"
            onPress={() => props.navigation.navigate('Category')}>
            <MCIcons name={'tag'} size={20} style={{color: '#929292'}} />
            <Text className="text-noteGrey-300 text-sm font-semibold">
              Categories
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-4 flex-row items-center gap-3"
            onPress={() => props.navigation.navigate('Archive')}>
            <MaterialIcon
              name={'archive'}
              size={24}
              style={{color: '#929292'}}
            />
            <Text className="text-noteGrey-300 text-sm font-semibold">
              Archive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-4 flex-row items-center gap-3"
            onPress={() => props.navigation.navigate('Trash')}>
            <MCIcons name={'trash-can'} size={24} style={{color: '#929292'}} />
            <Text className="text-noteGrey-300 text-md font-semibold">
              Trash
            </Text>
          </TouchableOpacity>
        </View>
        {/* Settings and user section */}
        <View className="flex-1 justify-between my-2 px-4 py-2 border-t border-noteGrey-900">
          <TouchableOpacity
            className="py-4 flex-row items-center gap-3"
            onPress={() => props.navigation.navigate('Trash')}>
            <MaterialIcon
              name={'settings'}
              size={24}
              style={{color: '#929292'}}
            />
            <Text className="text-noteGrey-300 text-md font-semibold">
              Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-4 flex-row justify- items-center gap-3"
            onPress={() => null}>
            <Text className="text-noteGrey-300 text-xs font-semibold">
              Noteflow v1.0 (beta)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default AppDrawer;
