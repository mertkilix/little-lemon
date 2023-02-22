import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          style={{


            right: 10,
            borderRadius: 8,
            backgroundColor: selections[index] ? 'lightgray' : 'black',
            padding: 8,
            borderRadius: 10,

          }}>
          <View>
            <Text style={{ color: selections[index] ? 'black' : 'white' ,
          fontWeight: selections[index] ? 'bold' : '' ,
          
          
          }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    justifyContent:'space-around',
    paddingLeft:10,

  },
});

export default Filters;
