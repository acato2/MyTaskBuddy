import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './Login';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

const EditProfile = ({navigation}) => {
    const [username, setUsername] = useState('harrymartins');
    const [password, setPassword] = useState('password');

    
    const handleChanges = () => {
        // handle changing data logic
    };

    const handleSwitch = () => {
        // handle account switch logic
        navigation.navigate('Login');
    };

    return (
        <View style={styles.main}>
        <View style={styles.container}>
            <Text style={styles.headingEdit}>Uredi profil</Text>
            </View>
            <View style={styles.userData}>
            <Image
                source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
                }}
                style={styles.image}
            />
            <Text style={styles.name}>Harry Martins</Text>
          
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        <Icon name="user" size={22} color="#2CB237" />  Novo korisničko ime
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <Text style={styles.label}>
                        <Icon name="lock" size={22} color="blue" />  Nova lozinka
                    </Text>
                    <View style={styles.passwordContainer}>
                        <View style={styles.wrapper}>

                            <TextInput
                                style={styles.input}
                                value={password}
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleChanges}>
                        <Text style={styles.buttonText}>Sačuvaj promjene</Text>
                    </TouchableOpacity>
                </View>
                <View
                        style={{
                            borderBottomColor: 'dimgray',
                            borderBottomWidth: 1,
                            width:'60%',
                            alignSelf:'center'
                        }} >
                            
                            
                        </View>
                <TouchableOpacity style={styles.switchProfile} onPress={handleSwitch}>
                    <Text style={styles.switchProfileText}>Prijavi se s drugog računa</Text>
                </TouchableOpacity>
                </View>
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
    backgroundColor: '#cceeff',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderColor:'darkgray',
    borderBottomWidth:2,
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
    heading: {
        fontSize: 25

    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 50,
        marginBottom: 20,
        alignSelf:'center'
    },
    inputContainer: {
        width: '100%',
        padding: 20,

    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: 'black',
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        color: '#696969',
        width: '80%',
        backgroundColor:'white'
    },
    usernameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        //alignItems: 'center',
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        //alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#cceeff',
        borderRadius: 20,
        padding: 12,
        alignSelf: 'center',
        borderWidth:1,
        borderColor:'darkgray'
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize:18
    },
    switchProfile: {
        //padding: 10,
        marginTop: 5,
    },
    switchProfileText: {
        color: '#00004d',
        fontSize:18,
        marginTop:5,
        textDecorationLine: 'underline',
        alignSelf:'center'
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
        color: 'black',


    },
    whiteContainter: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop:280,
        borderTopRightRadius: 70,
        width: '100%',
        //paddingTop: 10
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userData:{
        marginTop:150,
    },
    headingEdit:{
        fontSize: 23,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    main:{
        backgroundColor:'white',
        height:'100%'
    }
  

});

export default EditProfile;
