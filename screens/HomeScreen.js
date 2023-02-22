import { useState, useEffect,useCallback, useMemo } from 'react';

import { View, Text,StyleSheet,Image, Pressable,  StatusBar,  FlatList,  SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Filters from '../Filters';
import { getSectionListData, useUpdateEffect } from '../utils';
import debounce from 'lodash.debounce';
import { Searchbar } from 'react-native-paper';

function HomeScreen({ navigation }) {
   const [data, setData] = useState([]);
   const sections = ['mains', 'starters', 'desserts'];
   const [query, setQuery] = useState('');

   const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );


  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };


   useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const json = await response.json();
        setData(json.menu);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMenu();

     }, []);

     const renderItem = ({ item }) => (
      <Item name={item.name} price={item.price} description={item.description} image={item.image}  category={item.category} />
    );

     const Item = ({ name, price, description,image }) => (
      <View style={styles.itemcolumns}>
      <View style={styles.itemcontainer}>
      <View style={styles.itemleft}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
      <Text style={styles.itemPrice}>{price}</Text>
      </View>
      <View style={styles.itemRight}>
      <Image source={{uri:(`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`)}} resizeMode="cover" style={styles.itemimage} />
      </View>
      </View>
      </View>
    );

  return (

    <>
      <View style={styles.herocontainer}>
      <Text style={styles.h1}>Little Lemon</Text>

      <View style={styles.hero2container}>
      
      <Text style={styles.h3}><Text style={styles.h2}>Chicago</Text><Text>{"\n"}{"\n"}</Text>We are a family owned Mediterranean restaurant focused on traditional recipes served with a modern twist.</Text>

        <Image source={require('../images/Hero.jpeg')} resizeMode="cover" style={styles.heroimage} />


      </View>
      <Pressable>
      <Image source={require('../images/search.png')} resizeMode="cover" style={styles.searchimage} />
      </Pressable>
      </View>

      <Text style={styles.order}>ORDER FOR DELIVERY    </Text>

      <View style={styles.filtercontainer}>





      </View>
      
      <SafeAreaView style={styles.container}>

      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />


<FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={renderItem}


          
        />




            </SafeAreaView>

</>
  );
}


const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: 'white',

    },
    herocontainer: {
      backgroundColor: '#495e57',
      paddingBottom:20,

},
itemcolumns: {
  marginTop:10,
  paddingTop:10,
  
  flexDirection: 'column',
      justifyContent:'center',

    },
itemcontainer: {
paddingTop:10,

flexDirection: 'row',
    justifyContent:'center',
    borderTopColor: 'black',
    borderTopWidth: StyleSheet.hairlineWidth,
  },

filtercontainer: {
  flexDirection: 'row',
  justifyContent:'space-around',
  paddingLeft:10,

},
    h1: {
      paddingLeft:25,
      paddingTop:25,

      color:'#f4ce14',
      fontSize:'33',
    },
    h2: {
      paddingLeft:25,


      color:'white',
      fontSize:'33',
      paddingBottom:20,
    },
    h3: {
      paddingLeft:25,

      color:'white',
      fontSize:'15',
      paddingRight:20,
    },
    hero2container: {
      flexDirection: 'row',
    justifyContent:'center',
    paddingLeft:70,
    paddingRight:90,

},
heroimage: {
  width: 150,
  height: 170,
  borderRadius: 20,
},
itemimage: {
  width: 70,
  height: 70,
  margin:15,
},
searchimage: {
  width: 60,
  height: 60,
  borderRadius: 50,
  marginLeft:20,
  backgroundColor:'lightgray',
},
filtercover: {
    right: 10,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 20,
    height: 33,
    alignSelf: 'center',
    alignItems: 'center',
    
},
filter: {
fontWeight:'bold',
color: '#495e57',
},
order: {
  paddingLeft:25,
  paddingTop:25,
fontWeight:'bold',
backgroundColor:'white',
  fontSize:'18',
  paddingBottom:15,
},
itemName: {
  paddingTop:10,
  fontWeight:'bold',
  fontSize:'15',
},
itemDescription: {
  paddingTop:10,
  fontSize:'15',
  paddingBottom:15,
  maxWidth:280,
},
itemPrice: {
  fontSize:'15',
  paddingBottom:15,
  maxWidth:280,
},
  });

export default HomeScreen;