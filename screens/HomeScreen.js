import { useState, useEffect,useCallback, useMemo } from 'react';

import { View, Text,StyleSheet,Image, Pressable,  StatusBar,  FlatList,  SafeAreaView,TouchableOpacity,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getSectionListData, useUpdateEffect } from '../utils';
import debounce from 'lodash.debounce';
import { Searchbar } from 'react-native-paper';
const BASE_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main';
import Header from '../Header';

function HomeScreen({ navigation }) {
   const [data, setData] = useState([]);
   const sections = ['mains', 'starters', 'desserts', 'drinks'];
   const [query, setQuery] = useState('');
   const [selectedCategories, setSelectedCategories] = useState([]);
   const [menuItems, setMenuItems] = useState([]);
   const [searchText, setSearchText] = useState('');


   const filteredMenuItems = menuItems.filter((menuItem) =>
   (selectedCategories.length === 0 || selectedCategories.includes(menuItem.category)) &&
   (searchText === '' || menuItem.name.toLowerCase().includes(searchText.toLowerCase()) || menuItem.description.toLowerCase().includes(searchText.toLowerCase()))
 );
   const Filters = ({ onChange, selections, sections }) => {
    return (
      <View style={styles.filtersContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            onPress={() => {
              onChange(index);
              handleCategorySelection(section);
              console.log(section);
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



   const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };
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
  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
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
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const data = await response.json();
        setMenuItems(data.menu);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenuItems();

     }, []);


  return (

    <>

        <ScrollView keyboardDismissMode="on-drag" style={styles.scrollContainer}>

      <View style={styles.herocontainer}>
      <Text style={styles.h1}>Little Lemon</Text>

      <View style={styles.hero2container}>
      
      <Text style={styles.h3}><Text style={styles.h2}>Chicago</Text><Text>{"\n"}{"\n"}</Text>We are a family owned Mediterranean restaurant focused on traditional recipes served with a modern twist.</Text>

        <Image source={require('../images/Hero.jpeg')} resizeMode="cover" style={styles.heroimage} />


      </View>
      <Pressable>
      <View style={styles.searchContainer}><Image source={require('../images/search.png')} resizeMode="cover" style={styles.searchimage}/>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
        </View>
      </View>
      </Pressable>
      </View>

      <Text style={styles.order}>ORDER FOR DELIVERY    </Text>

 
      <View style={styles.filtercontainer}>





      </View>
      

      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />





      {filteredMenuItems.map((menuItem) => (

      <View style={styles.itemcolumns}>
      <View style={styles.itemcontainer}>
      <View style={styles.itemleft}>
      <Text style={styles.itemName}>{menuItem.name}</Text>
      <Text style={styles.itemDescription}>{menuItem.description}</Text>
      <Text style={styles.itemPrice}>{menuItem.price}</Text>
      </View>
      <View style={styles.itemRight}>
      <Image source={{uri:(`${BASE_URL}/images/${menuItem.image}?raw=true`)}} resizeMode="cover" style={styles.itemimage} />
      </View>
      </View>
      </View>
        ))}

      </ScrollView>

</>
  );
}


const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',

  },
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
    borderTopColor: 'black',
    paddingLeft:10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  searchBarContainer: {

alignSelf:'center',


},

  searchContainer: {
    flexDirection: 'row',
    justifyContent:'flex-start',

    backgroundColor: '#495e57',
  },
  searchBar: {
    marginHorizontal:15,

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 110,
    paddingVertical: -20,
    height:30,
    backgroundColor: 'white',
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
filtersContainer: {
  flexDirection: 'row',
  justifyContent:'space-around',
  paddingLeft:10,

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