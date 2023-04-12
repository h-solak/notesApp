import 'react-native-gesture-handler';
import React from 'react';
import {useWindowDimensions} from 'react-native';

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
import CreateNoteScreen from './screens/CreateNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import SearchScreen from './screens/SearchScreen';
import NoteTypeScreen from './screens/NoteTypeScreen';
import EditCategoriesScreen from './screens/EditCategoriesScreen';
import TrashScreen from './screens/TrashScreen';
import ArchiveScreen from './screens/ArchiveScreen';

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
function App() {
  const {height, width} = useWindowDimensions();

  return (
    <Provider store={store}>
      <PersistGate
        // loading={<Text>Loading...</Text>}
        persistor={persistor}>
        <NavigationContainer>
          {/*<Stack.Navigator screenOptions={{animation: 'none'}}> -- DISABLE FOR ALL*/}
          {/* SCREEN SPESIFIC: options={{headerShown: false, animation: 'none'}} */}
          <Drawer.Navigator
            useLegacyImplementation
            drawerContent={props => <DrawerMenu {...props} />}
            initialRouteName="Home"
            drawerPosition="right"
            screenOptions={{
              drawerStyle: {
                backgroundColor: '#000',
                width: 240,
              },
              swipeEdgeWidth: 0,
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateNote"
              component={CreateNoteScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditNote"
              component={EditNoteScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NoteType"
              component={NoteTypeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditCategories"
              component={EditCategoriesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Trash"
              component={TrashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Archive"
              component={ArchiveScreen}
              options={{headerShown: false}}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
