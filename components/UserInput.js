import React from "react";
import { StyleSheet, View, TextInput,Dimensions } from "react-native";
import Text from '@kaloraat/react-native-text';
const { width, height } = Dimensions.get('window');
const UserInput = ({name, value, setValue, secureTextEntry, autoCapitalize}) => {
    return (

        <View style={styles.inputData}>
            <Text semi style={styles.label}>{name}</Text>
            <TextInput style={styles.inputField} 
            value = {value}
            onChangeText = {(text) => setValue(text)}
            secureTextEntry = {secureTextEntry}
            autoCapitalize={autoCapitalize}></TextInput>
        
        </View>
    )
}

const styles = StyleSheet.create({
    inputData:{
        marginHorizontal:24
    },
    label:{
        marginBottom:5,
        fontSize:width*0.03
    },
    inputField: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10,
        width: 0.7 * width,
        marginBottom:10


    }
});

export default UserInput;