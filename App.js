import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef} from 'react';
import { Switch } from 'react-native-paper';

import Onboarding from './screens/Onboarding'
import HomeScreen from './screens/HomeScreen'
import Profile from './screens/Profile'
import { getData, saveData, updateData, getAllData } from './utils';
import Header from './Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements';
import { getHeaderTitle } from '@react-navigation/elements';

import { NavigationContainer } from '@react-navigation/native';


export default function App( ) {

  const Stack = createNativeStackNavigator();
  
  const [initialRoute, setInitialRoute] = useState('Onboarding');
  const [loginStatus,setLoginStatus] = useState('false');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getAllData().then((dataObject) => {


      // Check if the user is already logged in

    });
  }, []);


  return ( <NavigationContainer>


<Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}
      >
<Stack.Screen name="Onboarding" component={Onboarding}  options={{ headerShown: false }}
 />
<Stack.Screen name="Profile" component={Profile}

/>
<Stack.Screen name="HomeScreen" component={HomeScreen}   
 />

</Stack.Navigator>
</NavigationContainer>  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
