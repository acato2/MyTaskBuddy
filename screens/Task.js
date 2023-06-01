import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import StepsComponent from '../components/StepsComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
};

const Task = ({ route, navigation }) => {
  const { taskId, activityName, date, startTime, endTime, location } = route.params; // getting the activity name from the route params
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState(0);
  const [isWhiteContainerVisible, setIsWhiteContainerVisible] = useState(false);
  const slideUpAnimation = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const formattedDate = moment(new Date(date)).format('dddd D. MMMM YYYY');
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  const [congratulationVisible, setCongratulationVisible] = useState(false);

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
        setIsWhiteContainerVisible(taskStatus === 1 || taskStatus === 2); // Update the visibility condition
        setCongratulationVisible(taskStatus === 2);
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

      // Set the whiteContainer visibility to true
      setStatus(1);
      setIsWhiteContainerVisible(true);

      if (status === 0) {
        // Animate the slide up for whiteContainer
        Animated.timing(slideUpAnimation, {
          toValue: 1,
          duration: 500, // Adjust the duration as needed
          useNativeDriver: true,
        }).start();
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  useEffect(() => {
    fetchFirstName();
    fetchTaskStatus();
  }, []);

  useEffect(() => {
    if (isWhiteContainerVisible) {
      Animated.timing(slideUpAnimation, {
        toValue: 1,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    }
  }, [isWhiteContainerVisible]);

  const handleImagePress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/left.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleImagePress} style={styles.menuIconContainer}>
        <Image source={require('../assets/detail.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <View style={styles.blueContainer}>
      <Image source={congratulationVisible ? require('../assets/checklist.png') : require('../assets/planning2.png')} style={styles.topicon} />
      <Text style={styles.lets}>{congratulationVisible ? "Great job, you've completed the task" : `Hi ${firstName}, let's`}</Text>
        <Text style={styles.activityName}>{activityName}</Text>
        <View style={styles.line} />
      </View>
      {isWhiteContainerVisible ? (
        <Animated.View
          style={[
            styles.whiteContainer,
            {
              transform: [
                {
                  translateY: slideUpAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <ScrollView>
            <StepsComponent taskId={taskId} />
          </ScrollView>
        </Animated.View>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={startTask} disabled={status !== 0}>
          <Text style={styles.startButtonText}>Start Task</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {/* Task details */}
      <Text style={styles.modalHeading}>{activityName}</Text>
      <View style={styles.modalDetails}>
        <View style={styles.row}>
          <Image source={require('../assets/schedule.png')} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>Datum:</Text>
            <Text style={styles.regularText}>{formattedDate}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Image source={require('../assets/clock.png')} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>Trajanje:</Text>
            <Text style={styles.regularText}>{formattedStartTime} - {formattedEndTime}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Image source={require('../assets/placeholder.png')} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>Lokacija:</Text>
            <Text style={styles.regularText}>{location}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</TouchableWithoutFeedback>

      </Modal>
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
    borderTopRightRadius: 70,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderWidth:2
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
    textAlign: 'center',
  },
  modalDetails: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  regularText: {
    fontSize: 15,
  },
  closeButton: {
    backgroundColor: '#66ccff',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    alignSelf: 'flex-end',
    borderWidth:2,
    width:'30%',
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  
});

export default Task;
