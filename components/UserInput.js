import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Text from '@kaloraat/react-native-text';

const UserInput = ({name, value, setValue, secureTextEntry}) => {
    return (

        <View style={styles.inputData}>
            <Text semi style={styles.label}>{name}</Text>
            <TextInput style={styles.inputField} 
            value = {value}
            onChangeText = {(text) => setValue(text)}
            secureTextEntry = {secureTextEntry}></TextInput>
        
        </View>
    )
}

const styles = StyleSheet.create({
    inputData:{
        marginHorizontal:24
    },
    label:{
        marginBottom:5
    },
    inputField: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10,
        width: 280,
        marginBottom:10


    }
});

export default UserInput;