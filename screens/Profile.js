import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import {
  ScrollView,

  StyleSheet,
  TextInput,
  Pressable,

  Alert,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import useUpdate from '../useUpdate';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, saveData, updateData, getAllData } from '../utils';
import { Button } from 'react-native';



const Profile = ({ navigation }) => {

    const [email, onChangeEmail] = useState('');
    const [name, onChangeName] = useState('');

    const [dbName, setDbName] = useState('');
    const [dbLastName, setDbLastName] = useState('');

    const [dbEmail, setDbEmail] = useState('');
    const [dbPhone, setDPhone] = useState('');


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
<View style={styles.container}>
<TextInput>{`First name`}</TextInput>
<TextInput
        style={styles.inputBox}
        value={dbName}
        onChangeText={dbName =>{
        onChangeName(dbName);
        }}
        placeholder={'name'}
        keyboardType={'text'}
      />
      <TextInput>{``}</TextInput>
<TextInput
        style={styles.inputBox}
        value={dbEmail}
        onChangeText={dbEmail =>{
        onChangeName(dbEmail);
        }}
        placeholder={'email'}
        keyboardType={'text'}
      />
      <TextInput>{``}</TextInput>
<TextInput
        style={styles.inputBox}
        value={dbEmail}
        onChangeText={dbEmail =>{
        onChangeEmail(dbEmail);
        }}
        placeholder={'email'}
        keyboardType={'text'}
      />
<Text>{`KAYIT EMAaIL: ${dbEmail}`}</Text>
<Text>{`KAYIT DURUM: ${dbLogin}`}</Text>

<Pressable style={styles.logout}


        onPress={() => {
          saveData('login', 'false');
          saveData('name', '');
          saveData('email', '');
          saveData('phone', '');

          navigation.navigate('Onboarding')}

      }
      >
        <Text>Log out</Text>
</Pressable>
</View>
 );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logout: {
    borderRadius: 8,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    border: 1 ,
    borderRadius:10,


  },

  inputBox: {
    height: 40,
    margin: 22,
    marginHorizontal:50,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: 'EDEFEE',
    backgroundColor: '#EDEFEE',
  },


  regularText: {
    fontSize: 24,
    padding: 1,
    marginVertical: 8,
    color: 'black',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 24,
    padding: 1,
    marginVertical: 8,
    color: 'black',
    textAlign: 'center',
    paddingBottom:100,
  },
  inputBox: {
    height: 40,
    margin: 22,
    marginHorizontal:50,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: 'EDEFEE',
    backgroundColor: '#EDEFEE',
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    marginHorizontal:290,
    marginRight:20,
    alignItems:'center',
    backgroundColor: '#33413e',

    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'center',
    marginTop: 30,
  },
});


export default Profile;