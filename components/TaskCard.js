import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import ProgressBar from './ProgressBar';

const TaskCard = ({ startTime, endTime, activity, progress, location, onPress }) => {
  return (
    <View style={styles.card} >
      <TouchableOpacity onPress={onPress}>
      <Text style={styles.activity}>{activity}</Text>
      <Image source={require("../assets/options.png")} style={styles.newImage}></Image>
      <View style={styles.container}>
        <Image source={require("../assets/clock.png")} style={styles.clock}></Image>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{startTime} - {endTime}</Text>
          <Text style={styles.locationText}>{location}</Text>
          <Image source={require("../assets/placeholder.png")} style={styles.locationIcon}></Image>
        </View>
      </View>

      <ProgressBar progress={progress} />

      </TouchableOpacity>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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
    width: deviceWidth *0.83, // Adjust width based on the device screen width
    height: deviceHeight *0.18,
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
    fontSize: deviceWidth*0.035,
    marginRight:10
  },
  activity: {
    fontSize: deviceWidth*0.05,
    fontWeight: 'bold',
    marginBottom:15
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  clock: {
    width: deviceWidth*0.06,
    height: deviceWidth*0.06,
    marginRight: 10,
  },
  newImage: {
    width: deviceWidth*0.06,
    height: deviceWidth*0.06,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  locationText: {
    fontSize: deviceWidth*0.035,
    paddingRight:10

  },
  locationIcon:{
    width: deviceWidth*0.06,
    height: deviceWidth*0.06,
  }
});

export default TaskCard;
