import { Image, StyleSheet, View, Text } from 'react-native';

const Header = ({ }) => {
    return (

        <View style={styles.container}>
            <Image
                source={require('../images/Profile.png')}
                style={styles.avatarImage}
                resizeMode="contain"
            />

            <Image
                source={require('../images/Logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
            />
            <Image
                source={require('../images/Profile.png')}
                style={styles.avatarImage}
                resizeMode="contain"
            />
        </View>
    );

};

const styles = StyleSheet.create({

    container: {
        flex:0.2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginHorizontal: 10,
        paddingBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
    logoImage: {
    },
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

export default Header;