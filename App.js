import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  Header  from './components/Header';
import Hero from './components/Hero';

export default function App() {
  return (
    <View style={styles.container}>
<Header/>
<Hero/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
