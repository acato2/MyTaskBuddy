import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';

const TaskCard = ({ startTime, endTime, activity, progress, onPress }) => {
  return (
    <View style={styles.card} >
      <TouchableOpacity onPress={onPress}>
      <Text style={styles.activity}>{activity}</Text>
      <Image source={require("../assets/options.png")} style={styles.newImage}></Image>
      <View style={styles.container}>
        <Image source={require("../assets/clock.png")} style={styles.clock}></Image>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{startTime} - {endTime}</Text>
          <Text style={styles.locationText}>Kuća</Text>
          <Image source={require("../assets/placeholder.png")} style={styles.locationIcon}></Image>
        </View>
      </View>

      <ProgressBar progress={progress} />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 350,
    height: 150,
    borderColor: '#C8C8C8',
    borderWidth: 1
  },
  timeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    flex:1,
    fontSize: 16,
    marginRight:10
  },
  activity: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom:15
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  clock: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  newImage: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 15,
    right: 10,
  },
  locationText: {
    fontSize: 16,
    paddingRight:10
    //marginLeft: 10,

  },
  locationIcon:{
    width: 30,
    height: 30,
    //marginRight: 10,
  }
});

export default TaskCard;
