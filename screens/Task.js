import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import StepsComponent from '../components/StepsComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task = ({ route, navigation }) => {
  const { taskId, activityName, date } = route.params; // getting the activity name from the route params
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState(0);
  const [isWhiteContainerVisible, setIsWhiteContainerVisible] = useState(false);
  const slideInAnimation = useRef(new Animated.Value(0)).current;

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

  const fetchTaskStatus = async () => {
    try {
      // Make a request to your API to fetch the task status based on the task ID
      const response = await fetch(`http://10.0.2.2:3000/tasks/${taskId}/status`);
      const data = await response.json();

      if (response.ok) {
        const taskStatus = data.status;
        setStatus(taskStatus);
        setIsWhiteContainerVisible(taskStatus === 1);
      } else {
        console.error('Error fetching task status:', data.error);
      }
    } catch (error) {
      console.error('Error fetching task status:', error);
    }
  };

  const startTask = async () => {
    try {
      // Update the column status in the tasks table
      // Make a request to your API to update the status of the task
      await fetch(`http://10.0.2.2:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 1 }),
      });

      // Set the whiteContainer visibility to true and animate the slide in
      setStatus(1);
      setIsWhiteContainerVisible(true);
      Animated.timing(slideInAnimation, {
        toValue: 1,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  useEffect(() => {
    fetchFirstName();
    fetchTaskStatus();
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
      {status === 1 ? (
        <ScrollView style={styles.whiteContainer}>
          <StepsComponent taskId={taskId} />
        </ScrollView>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={startTask}>
          <Text style={styles.startButtonText}>Start Task</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  blueContainer: {
    alignItems: 'center',
    marginTop: '25%',
    marginBottom: 5,
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
    marginEnd: 5,
  },
  menuIcon: {
    width: 50,
    height: 50,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70
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
    fontWeight: 'bold',
    paddingTop: 5,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  startButton: {
    backgroundColor: '#333371',
    borderRadius: 20,
    padding: 10,
    marginTop: 30,
    marginBottom: 10,
    width: '60%',
    borderWidth: 2,
    borderColor: 'darkblue',
    alignSelf: 'center',
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  topicon: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
});

export default Task;
