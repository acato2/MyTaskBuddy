import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const StepsComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // Replace with the total number of steps

  const handleStepCompletion = () => {
    setCurrentStep(currentStep + 1);
  };

  const renderStepButton = (stepNumber) => {
    const isCurrentStep = currentStep === stepNumber;
    const isCompletedStep = currentStep > stepNumber;
  
    let buttonText = '';
    let buttonStyle = {};
  
    if (isCompletedStep) {
      buttonText = 'Complete';
      buttonStyle = styles.completeButton;
    } else if (isCurrentStep) {
      if (currentStep === 1) {
        buttonText = 'Start';
        buttonStyle = styles.startButton;
      } else if (currentStep === totalSteps) {
        buttonText = 'Finish';
        buttonStyle = styles.finishButton;
      } else {
        buttonText = 'Continue';
        buttonStyle = styles.continueButton;
      }
    } else {
      // Step is inactive
      return (
        <View style={styles.inactiveStepIcon}>
          <Icon name="lock" size={22} color="gray" />
        </View>
      );
    }
  
    return (
      <TouchableOpacity
        style={[styles.stepButton, buttonStyle]}
        onPress={handleStepCompletion}
        disabled={!isCurrentStep}
      >
        <Text style={styles.stepButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };
  

  const renderStepCard = (stepNumber, stepName, stepDescription) => {
    const isCurrentStep = currentStep === stepNumber;
    const isCompletedStep = currentStep > stepNumber;

    const stepCardStyle = [
      styles.stepCard,
      isCompletedStep && styles.completedStepCard,
      isCurrentStep && styles.currentStepCard,
    ];

    const stepNumberStyle = [
      styles.stepNumber,
      isCompletedStep ? styles.completedStepNumber : styles.inactiveStepNumber,
      isCurrentStep && styles.currentStepNumber,
    ];

    const stepNameStyle = [
      styles.stepName,
      isCompletedStep && styles.completedStepName,
    ];

    return (
      <View style={stepCardStyle}>
        <View style={stepNumberStyle}>
          {isCompletedStep ? (
            <Text style={styles.checkmark}>✓</Text>
          ) : (
            <Text style={styles.stepNumberText}>{stepNumber}</Text>
          )}
        </View>
        <View style={styles.stepContent}>
          <Text style={stepNameStyle}>{stepName}</Text>
          <Text style={styles.stepDescription}>{stepDescription}</Text>
        </View>
        {renderStepButton(stepNumber)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderStepCard(1, 'Step 1', 'Description of Step 1')}
      {renderStepCard(2, 'Step 2', 'Description of Step 2')}
      {renderStepCard(3, 'Step 3', 'Description of Step 3')}
      {renderStepCard(4, 'Step 4', 'Description of Step 4')}
      {renderStepCard(5, 'Step 5', 'Description of Step 5')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    backgroundColor: 'white',
    paddingLeft: 40,
    height:100,
    marginHorizontal:20
  },
  completedStepCard: {
    borderColor: '#00b386',
    backgroundColor: '#e6fff5',
  },
  currentStepCard: {
    borderColor: '#66b3ff',
    backgroundColor: 'white',
  },
  stepNumber: {
    position: 'absolute',
    left: -20, // Adjust this value as needed for positioning
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the number is above the card background
    backgroundColor: 'white',
  },
  inactiveStepNumber: {
    borderColor: '#d9d9d9'
  },
  currentStepNumber: {
    borderColor: '#66b3ff',
  },
  stepNumberText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  completedStepNumber: {
    backgroundColor: '#00b386',
    borderColor: '#00b386',
  },
  stepName: {
    fontWeight: 'bold',
    fontSize:18
  },
  completedStepName: {
    color: '#00b377',
  },
  stepContent: {
    flex: 1,
    marginRight: 16,
  },
  stepDescription: {
    marginTop: 8,
    color:'grey'
  },
  stepButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1a75ff',
    backgroundColor: 'white',
  },
  startButton: {
    backgroundColor: '#66b3ff',
    borderColor: '#66b3ff',
    borderRadius:15
  },
  continueButton: {
    backgroundColor: '#66b3ff',
    borderColor: '#66b3ff',
    borderRadius:15
  },
  finishButton: {
    backgroundColor: '#333371',
    borderColor: '#333371',
    borderRadius:15
  },
  completeButton: {
    backgroundColor: '#00b377',
    borderColor: '#00b377',
    borderRadius:15
  },
  stepButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default StepsComponent;
