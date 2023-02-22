import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { useHeaderHeight } from '@react-navigation/elements';
import { MaskedTextInput } from "react-native-mask-text";

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
import * as ImagePicker from 'expo-image-picker';




const Profile = ({ navigation }) => {
  const headerHeight = useHeaderHeight();

  const [profilePicture, setProfilePicture] = useState(null);



    const [image, setImage] = useState(null);
    const [initials, setInitials] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          await AsyncStorage.setItem('profilePicture', result.assets[0].uri);
          setProfilePicture(result.assets[0].uri);
        } else {
          await AsyncStorage.setItem('profilePicture', result.uri);
          setProfilePicture(result.uri);
        }
        setImage(null);
        setInitials(null);
      }
    };

    const handleRemovePicture = async () => {
      // Remove profile picture from local storage
      await AsyncStorage.removeItem('profilePicture');
  
      // Set profilePicture state to null
      setProfilePicture(null);
    };

    const generateInitials = (name, lastName) => {
      let initials = '';
      if (name) {
        initials += name.charAt(0);
      }
      if (lastName) {
        initials += lastName.charAt(0);
      }
      return initials || (profilePicture ? null : 'N/A');
    };


  

  let [email, getEmail] = useState('');
  let [phone, getPhone] = useState('');
  let [lastName, getLastName] = useState('');
  let [name, getName] = useState('');


  let [newemail, onChangeEmail] = useState('');
  let [newname, onChangeName] = useState('');
  let [newphone, onChangePhone] = useState('');
  let [newlastName, onChangeLastName] = useState('');


  const [preferences, setPreferences] = useState({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsLetter: false,
  });

  useUpdate(() => {
    (async () => {
      // Every time there is an update on the preference state, we persist it on storage
      // The exercise requierement is to use multiSet API
      const keyValues = Object.entries(preferences).map((entry) => {
        return [entry[0], String(entry[1])];
      });
      try {
        await AsyncStorage.multiSet(keyValues);
      } catch (e) {
        Alert.alert(`An error occurred: ${e.message}`);
      }
    })();
  }, [preferences]);


  const updateState = (key) => () =>
    setPreferences((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));

  useEffect(() => {
    // Get all data from AsyncStorage
    (async () => {
      try {
        const values = await AsyncStorage.multiGet(Object.keys(preferences));
        const initialState = values.reduce((acc, curr) => {
          // Every item in the values array is itself an array with a string key and a stringified value, i.e ['pushNotifications', 'false']
          acc[curr[0]] = JSON.parse(curr[1]);
          return acc;
        }, {});
        setPreferences(initialState);
      } catch (e) {
        Alert.alert(`An error occurred: ${e.message}`);
      }
    })();




    async function loadProfilePicture() {
      const savedProfilePicture = await AsyncStorage.getItem('profilePicture');
      if (savedProfilePicture) {
        setProfilePicture(savedProfilePicture);
      }
    }
    loadProfilePicture();


    getAllData().then((dataObject) => {
      console.log('Retrieved all data:', dataObject);

      // Access individual data items


      getEmail(dataObject['email']);
      getLastName(dataObject['lastName']);
      getName(dataObject['name']);
      getPhone(dataObject['phone']);

 
      console.log('name: ', name);
      console.log('last: ', lastName);
      console.log('email ', email);
      console.log('phone: ', phone);
    });


    
  }, []);


  return (
  <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <ScrollView keyboardDismissMode="on-drag">
    <View style={styles.container}>
      <Text style={styles.mainTitle} >Personal information</Text>

      <Text style={styles.itemTitle}>Avatar</Text>

      <View style={styles.avatarcontainer}>

  
      {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : image ? (
          <Image source={{ uri: image }} style={styles.profilePicture} />
        ) : (
          <View style={styles.initialsContainer}>
            <Pressable style={styles.initials} ><Text style={{color:'white',fontWeight:'bold'}}>
              {initials ? initials : generateInitials(name, lastName)}
            </Text></Pressable>
          </View>
        )}



        <Pressable style={styles.change} onPress={() => {
pickImage()
        }

        }
        >
          <Text style={styles.buttonText}>Change</Text>


        </Pressable>
        <Pressable style={styles.remove}


          onPress={() => {
handleRemovePicture();
          }

          }
        >
          <Text style={styles.buttonText}>Remove</Text>
        </Pressable>
      </View>

      <Text style={styles.itemTitle}>First name</Text>

      <TextInput
        style={styles.inputBox}
        value={name}

        onChangeText={newname => {
          onChangeName(newname);
        }}
        placeholder={'name'}
        keyboardType={'text'}
      />
      <Text style={styles.itemTitle}>Last name</Text>

      <TextInput
        style={styles.inputBox}
        value={lastName}
        onChangeText={newlastName => {
          onChangeLastName(newlastName);
        }}
        placeholder={'Last name'}
        keyboardType={'text'}
      />
      <Text style={styles.itemTitle}>Email</Text>

      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={newemail => {
          onChangeEmail(newemail);
        }}
        placeholder={'email'}
        keyboardType={'text'}
      />
      <Text style={styles.itemTitle}>Phone number</Text>

      <TextInput
        style={styles.inputBox}
        value={phone}
        onChangeText={newphone => {
          onChangePhone(newphone);
        }}
        placeholder={'Phone number'}
        keyboardType={'text'}
      />

      <View style={styles.checkcontainer}>
        <Text style={styles.checkheader}>Email notifications</Text>
        <View style={styles.row}>
          <Checkbox
            style={styles.checkbox}
            value={preferences.orderStatuses}
            onValueChange={updateState('orderStatuses')}
          /><Text style={styles.checkTitle}>Order statutes</Text></View>
        <View style={styles.row}>

          <Checkbox
            style={styles.checkbox}
            value={preferences.passwordChanges}
            onValueChange={updateState('passwordChanges')}
          /><Text style={styles.checkTitle}>Password changes</Text>
        </View>
        <View style={styles.row}>

          <Checkbox
            style={styles.checkbox}
            value={preferences.specialOffers}
            onValueChange={updateState('specialOffers')}
          /><Text style={styles.checkTitle}>Special offers</Text>
        </View>
        <View style={styles.row}>

          <Checkbox

            style={styles.checkbox}
            value={preferences.newsLetter}
            onValueChange={updateState('newsLetter')}

          />
          <Text style={styles.checkTitle}>Newsletter</Text>
        </View>
      </View>

      <Pressable style={styles.logout}


        onPress={() => {
          saveData('login', 'false');
          saveData('name', '');
          saveData('email', '');
          saveData('phone', '');
          saveData('profilePicture', '');
          navigation.replace('Onboarding')
        }

        }
      >
        <Text style={styles.logbuttonText}>Log out</Text>
      </Pressable>


      <View style={styles.buttoncontainer}>
        <Pressable style={styles.discard}


          onPress={() => {
            navigation.goBack()

          }

          }
        >
          <Text style={styles.buttonText}>Discard Changes</Text>
        </Pressable>


        <Pressable style={styles.save} onPress={() => {


        saveData('login', 'true');
        saveData('name', newname);
        saveData('lastName', newlastName);
        saveData('phone',newphone)
        saveData('email',newemail)
        alert('Your information updated');
        }

        }
        >
          <Text style={styles.buttonText}>Save Changes</Text>


        </Pressable>
      </View>

    </View></ScrollView></KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatarcontainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  logout: {
    borderRadius: 8,
    backgroundColor: '#F4CE14',
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#dbb275',


  },
  change: {
    right: 10,
    borderRadius: 8,
    backgroundColor: '#495e57',
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 20,
    height: 33,
    alignSelf: 'center',
    alignItems: 'center',


  },
  remove: {
    right: 35,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 1,
    marginHorizontal: 20,
    height: 33,
    borderWidth: 1,
    borderColor: '#495e57',
    alignSelf: 'center',
    alignItems: 'center',


  },


  save: {
    right: 10,
    borderRadius: 8,
    backgroundColor: '#495e57',
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 20,
    height: 33,
    alignSelf: 'center',
    alignItems: 'center',


  },
  discard: {
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 20,
    height: 33,
    borderWidth: 1,
    borderColor: '#495e57',
    alignSelf: 'center',
    alignItems: 'center',


  },


  buttoncontainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 2,
    marginLeft: 15,
  },
  checkheader: {
    margin: 5,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',

  },
  checkbox: {
    margin: 1,
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
  logbuttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 40,
    margin: 10,
    marginTop: 0,
  },
  itemTitle: {
    fontSize: 11,
    paddingLeft: 10,
    paddingBottom: 2,
    fontWeight: 'bold',

    marginVertical: 8,
    color: 'gray',

  },
  initials: { 
    right: 10,
    borderRadius: 58,
    backgroundColor: '#62d6c4',
    padding: 8,
    borderRadius: 50,
    marginHorizontal: 20,
    height: 33,
    alignSelf: 'center',
    alignItems: 'center',
  },
  checkTitle: {
    fontSize: 11,
    paddingLeft: 10,
    fontWeight: 'bold',
    marginBottom: 14,
    marginVertical: 3,
    color: 'gray',
  },

  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#c4c9c7',

  },
  mainTitle: {
    fontSize: 18,
    padding: 15,
    marginVertical: 1,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 1,
  },
});
export default Profile;