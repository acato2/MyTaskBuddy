import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/bs'; // Bosnian locale
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(moment()); // Current date
  const [scrollPosition, setScrollPosition] = useState(0); // Initial scroll position
  const daysToShow = 14; // Show 7 days at a time

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Do something else
    console.log(date)
  };

  const renderDay = (day) => {
    const date = moment().add(day, 'days');
    const isCurrentDate = date.isSame(selectedDate, 'day');

    return (
      <TouchableOpacity key={day} onPress={() => handleDateClick(date)}>
        <View style={isCurrentDate ? styles.currentDate : styles.date}>
          <Text style={isCurrentDate ? styles.currentDateText : styles.dateText}>
            {date.format('dddd D. MMMM')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const days = [];
  for (let i = 0; i < daysToShow; i++) {
    days.push(renderDay(i));
  }

  const handleScroll = (event) => {
    const position = event.nativeEvent.contentOffset.x;
    setScrollPosition(position);
  };

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {days}
    </ScrollView>
  );
};

const styles = {
  date: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  dateText: {
    fontSize: 16,
  },
  currentDate: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#4285F4',
  },
  currentDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285F4',
  },
};

export default Calendar;
