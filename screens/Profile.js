import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

import useUpdate from '../useUpdate';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, saveData, updateData, getAllData } from '../utils';
import Button from '../components/Button';



const Profile = ({ navigation }) => {

    const [email, onChangeEmail] = useState('');
    const [name, onChangeName] = useState('');
    const [dbName, setDbName] = useState('');
    const [dbEmail, setDbEmail] = useState('');
    const [dbLogin, setDbLogin] = useState(false);


    useEffect(() => {
        // Get all data from AsyncStorage
        getAllData().then((dataObject) => {
          console.log('Retrieved all data:', dataObject);
    
          // Access individual data items
          setDbEmail(dataObject['email']);
          setDbName(dataObject['name']);
          setDbLogin(dataObject['login']);
    
    
          console.log('Email:', dbEmail);
          console.log('Name:', dbLogin);
        });
      }, []);


    return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>{`KAYIT ISIM: ${dbName}`}</Text>
<Text>{`KAYIT EMAaIL: ${dbEmail}`}</Text>
<Text>{`KAYIT DURUM: ${dbLogin}`}</Text>

<Button
        onPress={() => {

            navigation.replace('Onboarding');

            saveData('login', 'false');
            saveData('name', '');
            saveData('email', '');
        }}
      >
        LogOut
      </Button>
</View>
 );
}



export default Profile;