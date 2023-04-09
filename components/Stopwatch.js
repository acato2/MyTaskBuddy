import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Stopwatch = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStartPause = () => {
    setIsActive(!isActive);
    setIsPaused(isActive && !isPaused);
    if (isActive) {
      clearInterval(countRef.current);
    } else {
      countRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds + 1;
          const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
          const newHours = prevTime.hours + Math.floor(newMinutes / 60);
          return {
            hours: newHours,
            minutes: newMinutes % 60,
            seconds: newSeconds % 60,
          };
        });
      }, 1000);
    }
  };
  
  const handleStop = () => {
    clearInterval(countRef.current);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsActive(false);
    setIsPaused(false);
  };

  const formatTime = (time) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={handleStartPause}
          style={[styles.button, isActive && styles.buttonPause]}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isPaused ? 'Nastavi' : isActive ? 'Pauziraj' : 'Započni'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleStop}
          style={[styles.button, styles.buttonStop]}
          activeOpacity={0.7}
          disabled={!isActive && !isPaused}
        >
          <Text style={[styles.buttonText, styles.buttonTextStop]}>Zaustavi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 55,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white',
    fontStyle:'italic'
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    borderColor:'white',
    borderWidth:2
  },
  buttonPause: {
    backgroundColor: '#FDD835',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize:17
  },
  buttonStop: {
    backgroundColor: '#F44336',
  },
  buttonTextStop: {
    color: '#FFFFFF',
  },
});

export default Stopwatch;
