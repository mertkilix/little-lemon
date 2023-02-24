import { StyleSheet, Text, View, Image } from 'react-native';
import Search from './Search';

function Hero({ }) {


    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Little Lemon</Text>
            <View style={styles.hero2container}>
                <Text style={styles.h3}><Text style={styles.h2}>Chicago</Text><Text>{"\n"}{"\n"}
                </Text>We are a family owned Mediterranean restaurant focused on traditional recipes served with a modern twist.</Text>
                <Image source={require('../images/Hero.jpeg')} resizeMode="cover" style={styles.heroimage} />

                

            </View>
            <Search/>

            
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#495e57',
        paddingBottom: 20,

    },
    h1: {
        paddingLeft: 25,
        paddingTop: 10,
        color: '#f4ce14',
        fontSize: '42',
    },
    h2: {
        paddingLeft: 25,
        color: 'white',
        fontSize: '33',
        paddingBottom: 20,
    },
    h3: {
        paddingLeft: 25,
        color: 'white',
        fontSize: '15',
        paddingRight: 20,
    },
    hero2container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 70,
        paddingRight: 90,
    },
    heroimage: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
});


export default Hero;