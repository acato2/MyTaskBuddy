import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterStatus = () => {
  const [inprogress, setInProgress] = useState(false);
  const [allTasks, setAllTasks] = useState(false);
  const [completed, setCompleted] = useState(true);

  const handleClick = (status) => {
    setInProgress(false);
    setAllTasks(false);
    setCompleted(false);

    switch (status) {
      case 'inprogress':
        setInProgress(true);
        break;
      case 'allTasks':
        setAllTasks(true);
        break;
      case 'completed':
        setCompleted(true);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          inprogress && styles.activeFilterButton,
        ]}
        onPress={() => handleClick('inprogress')}
      >
        <Text
          style={[
            styles.filterButtonText,
            inprogress && styles.activeFilterButtonText,
          ]}
        >
          In progress
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          allTasks && styles.allTasksFilterButton,
        ]}
        onPress={() => handleClick('allTasks')}
      >
        <Text
          style={[
            styles.filterButtonText,
            allTasks && styles.allTasksFilterButtonText,
          ]}
        >
          To Do
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          completed && styles.completedFilterButton,
        ]}
        onPress={() => handleClick('completed')}
      >
        <Text
          style={[
            styles.filterButtonText,
            completed && styles.completedFilterButtonText,
          ]}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
   

  },
  filterButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal:5,
    borderColor:'lightgray',
    borderWidth:1,
    width:110,
    backgroundColor:'white',
    
  },
  filterButtonText: {
    fontSize: 18,
    textAlign:'center',
    color:'gray'
  },
  activeFilterButton: {
    backgroundColor: '#66b3ff',
    
  },
  activeFilterButtonText: {
    color: '#262626',
  },
  allTasksFilterButton: {
    backgroundColor: 'lightgray',
  },
  allTasksFilterButtonText: {
    color: '#262626',
  },
  completedFilterButton: {
    backgroundColor: '#66ff66',
  },
  completedFilterButtonText: {
    color: '#262626',
  },
});

export default FilterStatus;
