import React, { useState } from 'react';
import { View, Image, Pressable, Text,StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllData } from './utils';
import Header from './Header';
import * as Updates from 'expo-updates';

const Avatar = ({showButtons}) => {
  const [image, setImage] = useState(null);
  const [initials, setInitials] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  let [lastName, getLastName] = useState('');
  let [name, getName] = useState('');
  
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
        Updates.reloadAsync()

      } else {
        await AsyncStorage.setItem('profilePicture', result.uri);
        setProfilePicture(result.uri);
        Updates.reloadAsync()

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

  const loadProfilePicture = async () => {
    const savedProfilePicture = await AsyncStorage.getItem('profilePicture');
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }

  };

  React.useEffect(() => {
    loadProfilePicture();
    
    getAllData().then((dataObject) => {
        console.log('Retrieved all data:', dataObject);
  
        // Access individual data items
  
  

        getName(dataObject['name']);
        getLastName(dataObject['lastName']);
  
   

      });

  }, []);

  return (<>
    <View style={styles.avatarcontainer}>
      {profilePicture ? (
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      ) : image ? (
        <Image source={{ uri: image }} style={styles.profilePicture} />
      ) : (
          <Pressable style={styles.initials}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {initials ? initials : generateInitials(name, lastName)}
            </Text>
          </Pressable>
      )}
{showButtons === 'yes' && (
    <View style={styles.buttoncontainer}>
      <Pressable style={styles.change} onPress={() => {pickImage()

    
    }}>
        <Text style={styles.buttonText}>Change</Text>
      </Pressable>

  
        <Pressable style={styles.remove} onPress={() => {handleRemovePicture()
            Updates.reloadAsync()
}}>
          <Text style={styles.buttonText}>Remove</Text>
        </Pressable>
        </View>)}
   
     </View>
     </>
   );
 };

 const styles = StyleSheet.create({
    container: {
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
      width: 45,
      height: 45,
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
      right: 1,
      borderRadius: 58,
      backgroundColor: '#62d6c4',
      padding: 8,
      borderRadius: 50,
      marginHorizontal: 20,
      height: 33,
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
  export default Avatar;