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
import HomeScreen from './HomeScreen'
import { validateEmail, validateName,validatePhone } from '../utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import { MaskedTextInput } from "react-native-mask-text";

import Button from "../components/Button";

import { getData, saveData, updateData, getAllData } from '../utils';


export default Onboarding = ({navigation}) => {

  const [email, onChangeEmail] = useState('');
  const [name, onChangeName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [phone, onChangePhone] = useState('');


  const [dbName, setDbName] = useState('');
  const [dbLastName, setDbLastName] = useState('');

  const [dbEmail, setDbEmail] = useState('');
  const [dbLogin, setDbLogin] = useState(false);
  const isEmailValid = validateEmail(email);
  const isPhoneValid = validatePhone(phone);
  const isNameValid = (validateName(name) && validateName(lastName));
  const headerHeight = useHeaderHeight();

  useEffect(() => {



    getAllData().then((dataObject) => {
      console.log('Retrieved all data in a:', dataObject);

      // Access individual data items
      setDbEmail(dataObject['email']);
      setDbName(dataObject['name']);
      setDbName(dataObject['lastname']);

      setDbLogin(dataObject['login']);


      if (dataObject['login'] === 'true') {
        console.log('ben girsi yaptim  aq 31')
        navigation.replace('HomeScreen');
     
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
    <ScrollView keyboardDismissMode="on-drag"><Image
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
      <Text style={styles.regularText}>Last Name </Text>
      <TextInput
        style={styles.inputBox}
        value={lastName}
        onChangeText={lastName =>{
          onChangeLastName(lastName);
        }}
        placeholder={'lastname'}
        keyboardType={''}
      />
            <Text style={styles.regularText}>Phone number</Text>
      <MaskedTextInput
        style={styles.inputBox}

        mask="+1-999-999-9999"

        value={phone}
        onChangeText={phone =>{
          onChangePhone(phone);
        }}
        placeholder={'phone'}
        keyboardType={'phone-pad'}
        textContentType={'telephoneNumber'}
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
      /><View style={{paddingTop:50,paddingHorizontal:170}}>
<Button 
        onPress={() => {
            saveData('login', 'true');
            saveData('name', name);
            saveData('lastName', lastName);
            saveData('phone',phone)
            saveData('email', email);

            navigation.navigate('HomeScreen');

        }}
        disabled={(!isEmailValid || !isNameValid || !isPhoneValid)}
      >
        Next
      </Button></View>
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
    marginVertical: 1,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 20,
  },
  inputBox: {
    height: 40,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    marginHorizontal:290,
    marginRight:20,
    alignItems:'center',
    backgroundColor: '#33413e',
    paddingTop:10,
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