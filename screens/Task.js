import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import StepsComponent from '../components/StepsComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task = ({ route, navigation }) => {
  const { activityName, date } = route.params; // getting the activity name from the route params
  const [firstName, setFirstName] = useState('');
  const fetchFirstName = async () => {
    try {
      // Logged user ID
      const userId = await AsyncStorage.getItem('userId');

      // Make a request to your API to fetch firstname based on the user ID
      const response = await fetch(`http://10.0.2.2:3000/users/${userId}/firstname`);
      const data = await response.json();

      if (response.ok) {
        setFirstName(data.firstName);
      } else {
        console.error('Error fetching name:', data.error);
      }
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  useEffect(() => {
    fetchFirstName();
  }, []);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/left.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuIconContainer}>
      <Image source={require('../assets/detail.png')} style={styles.menuIcon} />
    </TouchableOpacity>
      <View style={styles.blueContainer}>
        <Image source={require('../assets/planning2.png')} style={styles.topicon} />
        <Text style={styles.lets}>Hi {firstName}, let's</Text>
        <Text style={styles.activityName}>{activityName}</Text>
        <View style={styles.line} />
      </View>
      <ScrollView style={styles.whiteContainer}>
        <StepsComponent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#66b3ff',
   backgroundColor: 'white',
  },
  blueContainer: {
    alignItems: 'center',
    marginTop: '25%',
    marginBottom:5
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    marginTop: 40,
    marginStart: 5,
  },
  menuIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    marginTop: 40,
    marginEnd: 5
  },
  menuIcon: {
    width: 50,
    height: 50,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    //borderTopRightRadius: 70,
    width: '100%',
    //borderTopLeftRadius: 70,
    //marginTop: '8%',
  },
  lets: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
    paddingTop: 20,
  },
  activityName: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight:'bold',
    paddingTop:5
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
    //width: '70%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    paddingTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  regularText: {
    fontSize: 14,
  },
  topicon: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#333371',
    borderRadius: 20,
    padding: 10,
    marginTop: 30,
    marginBottom: 10,
    width: '60%',
    borderWidth: 2,
    borderColor: 'darkblue',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  
});

export default Task;
