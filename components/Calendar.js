import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/bs';
import { Ionicons } from '@expo/vector-icons';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handlePrevDay = () => {
    setSelectedDate(prevDate => moment(prevDate).subtract(1, 'days'));
  };

  const handleNextDay = () => {
    setSelectedDate(prevDate => moment(prevDate).add(1, 'days'));
  };

  const isToday = moment().isSame(selectedDate, 'day');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrevDay}>
        <Ionicons name="chevron-back-outline" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.date}>
        {isToday ? 'Danas' : selectedDate.format('dddd, D. MMMM', 'bs')}
      </Text>
      <TouchableOpacity onPress={handleNextDay}>
        <Ionicons name="chevron-forward-outline" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffdb4d',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  date: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    fontSize: 26,
    color: '#333',
  },
});

export default Calendar;
