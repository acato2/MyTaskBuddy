import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from "react-native";
import Text from '@kaloraat/react-native-text';
import UserInput from "../components/UserInput";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');



const Login = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /*const navigation = useNavigation();

    const handleButtonPress = () => {
        navigation.navigate('Registration');
      }*/
      

    const handleLogin = async () =>{
        if(!username || !password){
            alert("Sva polja trebaju biti popunjena!");
            return;
        }
        try{
            const {data} = await axios.post('http://localhost:3000/login',{
                username,
                password
            })
            console.log("LOGIN SUCCESSFULL ",data);
        }
        catch (err){
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
        <View style={styles.login}>
            <Image source={require("../assets/logo.png")} style={styles.image}></Image>
            <Text style={styles.textLogin} dark bold>Prijava</Text>
            <Text style={styles.subtitle} >Prijavi se da nastaviš.</Text>
            <UserInput name="KORISNIČKO IME" value={username} setValue={setUsername}></UserInput>
            <UserInput name="LOZINKA" value={password} setValue={setPassword} secureTextEntry={true}></UserInput>
            <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                <Text dark bold style={{color:'#FFFFFF' , fontSize:16}}>Prijavi se</Text>
            </TouchableOpacity>
            <Text bold style={{marginTop:20}}>Nemate račun?</Text>
            <TouchableOpacity style={styles.buttonRegistration} onPress={()=>navigation.navigate('Registration')}>
                <Text dark bold style={{color:'#000000' , fontSize:16}}>Registruj se</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width: 180,
          height: 180,
          marginTop: height * -0.4,
          marginBottom: height * 0.05,
    },
    container:{
        flex: 1,
        backgroundColor: '#00004d'
    },
    login: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:280,
        borderTopRightRadius: 70
    },
    textLogin: {
        marginTop:20,
        fontSize: 40,
        color: 'rgb(28,33,32)'

    },
    subtitle: {
        marginBottom: 40

    },
    buttonLogin:{
        backgroundColor:'#00b300',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width:280,
        marginTop:10
    },
    buttonRegistration:{
        backgroundColor:'#ffdb4d',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width:280,
        marginTop:5
    }
});

export default Login;