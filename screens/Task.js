import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const Task = ({ route }) => {
  const { activityName,date } = route.params; // getting the activity name from the route params
  const formattedDate = moment(date).format('DD/MM/YYYY');
  return (
    <View style={styles.container}>
         <Text>Activity: {activityName}</Text>
         <Text>Date: {formattedDate}</Text>
      <Text style={styles.activityDescription}>This is a description of the activity.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default Task;
