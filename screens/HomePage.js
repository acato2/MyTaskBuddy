import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Calendar from '../components/Calendar';
import TaskCard from '../components/TaskCard';
import FilterStatus from '../components/FilterStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const HomePage = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // Fetch tasks from the database based on the logged user ID
  const fetchTasks = async () => {
    try {
      // Logged user ID
      const userId = await AsyncStorage.getItem('userId');

      // Format the selected date in the desired format
      const date = selectedDate.format('YYYY-MM-DD');

      // Make a request to your API to fetch tasks based on the user ID
      const response = await fetch(`http://10.0.2.2:3000/tasks?userId=${userId}&status=${filterStatus}&date=${date}`);
      const data = await response.json();

      // Update the tasks state with the fetched data
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  useEffect(() => {
    // Fetch tasks when the component mounts or when the selected date changes
    fetchTasks();
  }, [selectedDate, filterStatus]);

  return (
    <View style={styles.container}>
      <Calendar onDateChange={handleDateChange} selectedDate={selectedDate}/>
      <FilterStatus setFilterStatus={setFilterStatus}/>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {tasks.map((task) => (
          <TaskCard
            key={task.id}
            startTime={task.startTime}
            endTime={task.endTime}
            activity={task.activity}
            progress={task.progress}
            location={task.location}
            onPress={() =>
              navigation.navigate('Task', {
                activityName: task.activity,
                date: selectedDate.toString(),
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 110,
    paddingHorizontal: 20,
    paddingBottom:10,
    backgroundColor:'white'
  },
  calendar: {
    flex: 1,
    marginBottom: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop:20

  },
});

export default HomePage;
