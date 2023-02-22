import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Pressable, Text } from 'react-native';
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



  }, []);

  const renderBackButton = () => {
    if (navigation.canGoBack()) {
      return (
        <View style={{ alignSelf: 'flex-end', marginBottom: 10, right: 60 }}>
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



      <Pressable 


onPress={() => {
navigation.navigate('Profile');
}

}
>



        <Image source={require('./images/Profile.png')} style={styles.profilePicture} />
</Pressable>
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
    marginTop: 40,

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