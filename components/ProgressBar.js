import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  const [percent, setPercent] = useState(0);

  const styles = StyleSheet.create({
    container: {
      width: '80%',
      height: 15,
      borderRadius: 10,
      backgroundColor: '#ccc',
      marginVertical: 10,
      alignSelf:'center'

    },
    bar: {
      width: `${progress}%`,
      height: 15,
      borderRadius: 10,
      backgroundColor: '#0066cc',
    },
    text: {
      color: '#0066cc',
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.bar} />
      </View>
      <Text style={styles.text}>{progress}%</Text>
    </View>
  );
};

export default ProgressBar;
