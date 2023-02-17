import { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { validateEmail, validateName } from '../utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

import Button from "../components/Button";

import { getData, saveData, updateData, getAllData } from '../utils';


export default Onboarding = ({navigation}) => {

  const [email, onChangeEmail] = useState('');
  const [name, onChangeName] = useState('');
  const [dbName, setDbName] = useState('');
  const [dbEmail, setDbEmail] = useState('');
  const [dbLogin, setDbLogin] = useState(false);
  const isEmailValid = validateEmail(email);
  const isNameValid = validateName(name);
  const headerHeight = useHeaderHeight();

  useEffect(() => {



    getAllData().then((dataObject) => {
      console.log('Retrieved all data in a:', dataObject);

      // Access individual data items
      setDbEmail(dataObject['email']);
      setDbName(dataObject['name']);
      setDbLogin(dataObject['login']);


      if (dataObject['login'] === 'true') {
        console.log('ben girsi yaptim  aq 31')
        navigation.replace('Profile');
     
      }
      else{
        console.log('ben giris yapmadim aq')    
      }

      console.log('Email:', dbEmail);
      console.log('Name:', dbLogin);
    });
  }, []);

  return (<KeyboardAvoidingView
    keyboardVerticalOffset={headerHeight}
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <ScrollView keyboardDismissMode="on-drag">
            <Image
          style={styles.image}
          source={require('../images/Logo.png')}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
        />
              <Text style={styles.titleText}>Let us get to know you </Text>
      <Text style={styles.regularText}>First Name </Text>
      <TextInput
        style={styles.inputBox}
        value={name}
        onChangeText={name =>{
        onChangeName(name);
        }}
        placeholder={'name'}
        keyboardType={'text'}
      />
            <Text style={styles.regularText}>Email </Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={email =>{
        onChangeEmail(email);
        }}
        placeholder={'email'}
        keyboardType={'email-address'}
      />
<Button
        onPress={() => {
            saveData('login', 'true');
            saveData('name', name);
            saveData('email', email);
            navigation.replace('Profile');

        }}
        disabled={!isEmailValid || !isNameValid}
      >
        Next
      </Button>
      </ScrollView ></KeyboardAvoidingView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: '#EDEFEE',
    textAlign: 'center',
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