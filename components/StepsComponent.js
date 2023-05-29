import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const StepsComponent = ({ taskId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);

  const updateStepStatus = useCallback(async (stepId) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/update-step', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stepId, status: 1 }),
      });
      // Handle the response as needed
    } catch (error) {
      console.error('Error updating step status:', error);
    }
  }, []);

  useEffect(() => {
    const fetchSubsteps = async (taskId) => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/substeps/${taskId}`);
        const data = await response.json();
        const substeps = data.substeps;
  
        // Find the index of the first step with status 0
        const firstIncompleteStepIndex = substeps.findIndex(step => step.status === 0);
  
        // Set the current step to the index of the first incomplete step + 1
        setCurrentStep(firstIncompleteStepIndex + 1);
  
        setSteps(substeps);
      } catch (error) {
        console.error('Error fetching substeps:', error);
      }
    };
  
    fetchSubsteps(taskId);
  }, [taskId, steps]);
  

  const handleStepCompletion = async () => {
    const currentStepId = steps[currentStep - 1]?.id;
    if (currentStepId) {
      await updateStepStatus(currentStepId);
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  

  const renderStepButton = (stepNumber, stepStatus) => {
    const isCurrentStep = currentStep === stepNumber;
    const isCompletedStep = stepStatus === 1;
    

    let buttonText = '';
    let buttonStyle = {};

    if (isCompletedStep) {
      buttonText = 'Complete';
      buttonStyle = styles.completeButton;
    } else if (isCurrentStep) {
        buttonText = 'Continue';
        buttonStyle = styles.continueButton;
    } else {
      // Step is locked and inactive
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

  const renderStepCard = (stepNumber, stepName, stepDescription, index, stepStatus) => {
    const isCurrentStep = currentStep === stepNumber;
    const isCompletedStep = stepStatus === 1;
   // console.log(stepStatus)

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
      <View key={index} style={stepCardStyle}>
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
        {renderStepButton(stepNumber, stepStatus)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) =>
        renderStepCard(index + 1, step.stepName, step.description, index, step.status)
      )}
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
    marginHorizontal: 20,
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
    borderColor: '#d9d9d9',
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
    fontSize: 18,
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
    color: 'grey',
  },
  stepButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1a75ff',
    backgroundColor: 'white',
  },
  continueButton: {
    backgroundColor: '#66b3ff',
    borderColor: '#66b3ff',
    borderRadius: 15,
  },
  completeButton: {
    backgroundColor: '#00b377',
    borderColor: '#00b377',
    borderRadius: 15,
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
