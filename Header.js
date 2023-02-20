import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  const navigation = useNavigation();

  const renderBackButton = () => {
    if (navigation.canGoBack()) {
      return (
        <View style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
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
        <Image
          source={require('./images/Profile.png')}
          style={styles.profilePicture}
        />
      </View>
    </View>
  );
};
  const styles = StyleSheet.create({
    header: {
      height: 90,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
      height: 50,
      alignSelf: 'flex-end',
    },
    logoImage: {
      width: '100%',
      height: '100%',
    },
    profilePictureContainer: {
      position: 'absolute',
      bottom: 0,
      right: 10,
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
  });
  
  export default Header;