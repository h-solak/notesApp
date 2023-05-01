import React from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

/* Third-Party */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';

import DrawerMenu from './components/DrawerMenu';

/* Screens */
import HomeScreen from './screens/HomeScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import SearchScreen from './screens/SearchScreen';
import NoteTypeScreen from './screens/NoteTypeScreen';
import CategoryScreen from './screens/CategoryScreen';
import TrashScreen from './screens/TrashScreen';
import ArchiveScreen from './screens/ArchiveScreen';
import TaskScreen from './screens/TaskScreen';
import TestScreen from './screens/TestScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
/*
Yukarı kaydırınca ekran esnemiyor?? stacklerden dolayı mı
??????
????????
??????????
????????
??????
*/

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <DrawerMenu {...props} />}
      drawerPosition="right"
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000',
          width: 240,
        },
        swipeEdgeWidth: 200,
        swipeEnabled: true,
        swipeMinDistance: 50,
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false, animation: 'simple_push'}}
      />
      <Drawer.Screen
        name="Test"
        component={TestScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="NoteType"
        component={NoteTypeScreen}
        options={{headerShown: false, animation: 'none'}}
      />
      <Drawer.Screen
        name="Task"
        component={TaskScreen}
        options={{headerShown: false, animation: 'none'}}
      />
      <Drawer.Screen
        name="Category"
        component={CategoryScreen}
        options={{headerShown: false, animation: 'none'}}
      />
      <Drawer.Screen
        name="Trash"
        component={TrashScreen}
        options={{headerShown: false, animation: 'none'}}
      />
      <Drawer.Screen
        name="Archive"
        component={ArchiveScreen}
        options={{headerShown: false, animation: 'none'}}
      />
    </Drawer.Navigator>
  );
}
function App() {
  return (
    <Provider store={store}>
      <PersistGate
        // loading={<Text>Loading...</Text>}
        persistor={persistor}>
        <NavigationContainer>
          {/*<Stack.Navigator screenOptions={{animation: 'none'}}> -- DISABLE FOR ALL*/}
          {/* SCREEN SPESIFIC: options={{headerShown: false, animation:"none", animation: 'none'}} */}

          <Stack.Navigator initialRouteName="Home" useLegacyImplementation>
            <Stack.Screen
              options={{headerShown: false, animation: 'none'}}
              name="DrawerNavigation"
              component={DrawerNavigation}
            />
            {/* <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false, animation: 'default'}}
            /> */}
            <Stack.Screen
              name="Test"
              component={TestScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Task"
              component={TaskScreen}
              options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
              name="EditNote"
              component={EditNoteScreen}
              options={{headerShown: false, animation: 'simple_push'}}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
              name="NoteType"
              component={NoteTypeScreen}
              options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
              name="Category"
              component={CategoryScreen}
              options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
              name="Trash"
              component={TrashScreen}
              options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
              name="Archive"
              component={ArchiveScreen}
              options={{headerShown: false, animation: 'none'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
