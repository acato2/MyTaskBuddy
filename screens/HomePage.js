import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Calendar from '../components/Calendar';
import TaskCard from '../components/TaskCard';
import FilterStatus from '../components/FilterStatus';

const HomePage = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <Calendar onDateChange={handleDateChange} />
      <FilterStatus/>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TaskCard
          startTime="9:00"
          endTime="10:00 AM"
          activity="Morning Exercise"
          progress={70}
          onPress={() =>
            navigation.navigate('Task', {
              activityName: 'Morning Exercise',
              date: selectedDate.toString(),
            })
          }
        />
        <TaskCard
          startTime="10:00"
          endTime="11:00"
          activity="Meeting with John"
          progress={20}
          onPress={() =>
            navigation.navigate('Task', {
              activityName: 'Meeting with John',
              date: selectedDate.toString(),
            })
          }
        />
        <TaskCard
          startTime="11:00"
          endTime="12:00"
          activity="Lunch with Jane"
          progress={50}
          onPress={() =>
            navigation.navigate('Task', {
              activityName: 'Lunch with Jane',
              date: selectedDate.toString(),
            })
          }
        />
        <TaskCard
          startTime="12:00"
          endTime="13:00"
          activity="Presentation preparation"
          progress={100}
          onPress={() =>
            navigation.navigate('Task', {
              activityName: 'Presentation preparation',
              date: selectedDate.toString(),
            })
          }
        />
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
    paddingBottom:10
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
