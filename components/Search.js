import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';

import ReactNativeAnimatedSearchbox from './ReactNativeAnimatedSearchbox';

class App extends React.Component {
  state = {
    searchIconColor: '#555',
  };

  componentDidMount() {
    this.openSearchBox();
  }

  openSearchBox = () => this.refSearchBox.open();
  closeSearchBox = () => this.refSearchBox.close();

  render() {
    return (
      <View style={styles.container}>
        






          <ReactNativeAnimatedSearchbox
            ref={ref => (this.refSearchBox = ref)}
            placeholder={'Search...'}
            searchIconColor={this.state.searchIconColor}
            onClosed={() => {
              this.setState({ searchIconColor: '#fff' });
            }}
            onOpening={() => {
              this.setState({ searchIconColor: '#555' });
            }}
          />

<TouchableWithoutFeedback onPress={this.closeSearchBox}>
                <View style={styles.overlay}></View>
            </TouchableWithoutFeedback>
            
<View style={styles.buttonsArea}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.openSearchBox}>
                <Text style={styles.buttonText}>OPEN</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.closeSearchBox}>
                <Text style={styles.buttonText}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </View>


          
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    height: 150,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: Constants.statusBarHeight + 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonsArea: {
    flex: 1,
    marginBottom: 15,
    justifyContent: 'flex-end',
    marginTop:44,
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: -10,
    marginRight: -10,
    maxHeight: 50,
    marginTop: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.80)',
    margin: 10,
    height: 40,
    borderRadius: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#555',
  },
});
