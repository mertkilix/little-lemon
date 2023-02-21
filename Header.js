import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity,Pressable,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getData, saveData, updateData, getAllData } from './utils';


const Header = () => {
  const navigation = useNavigation();
  let [lastName, getLastName] = useState('');
  let [name, getName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const [image, setImage] = useState(null);
  const [initials, setInitials] = useState(null);

  useEffect(() => {

    async function loadProfilePicture() {
      const savedProfilePicture = await AsyncStorage.getItem('profilePicture');
      console.log('savedProfilePicture:', savedProfilePicture); // add this line
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


  const renderBackButton = () => {
    if (navigation.canGoBack()) {
      return (
        <View style={{ alignSelf: 'flex-end', marginBottom: 10,right:60 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
    return <View style={{ width: 24 }} />;
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {renderBackButton()}
        <View style={styles.logoContainer}>



          <Image
            source={require('./images/Logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />




        </View>
      </View>
      <View style={styles.profilePictureContainer}>






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


      </View>
    </View>
  );
};
  const styles = StyleSheet.create({
    header: {
      height: 110,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
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
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      width: '70%',
      paddingHorizontal: 20,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
      height: 50,
      alignSelf: 'flex-end',
      marginTop:40,

    },
    logoImage: {
      width: '100%',
      height: '100%',
    },
    profilePictureContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
  });
  
  export default Header;