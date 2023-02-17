import AsyncStorage from '@react-native-async-storage/async-storage';


export const validateEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
    return false;
    
  }
  else {

    return true;

  }
};


export const validateName = (name) => {
  let reg = /^[a-zA-Z]+$/;;
  if (reg.test(name) === false) {
    return false;
    
  }
  if(name.length >= 2 && reg.test(name) === true) {

    return true;

  }
};


const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Data saved for key "${key}": ${value}`);

    return true;
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
    return false;
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
      console.log(`Retrieved data for key "${key}": ${value}`);

    } else {
      return null;
    }
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
    return null;
  }
};

const updateData = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, value);
    return true;
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
    return false;
  }
};

const getAllData = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(allKeys);

    const dataObject = {};

    allData.forEach((data) => {
      const key = data[0];
      const value = data[1];
      dataObject[key] = value;
    });
    console.log('Retrieved all data:', dataObject);

    return dataObject;
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
    return null;
  }
};

export { saveData, getData, updateData, getAllData };