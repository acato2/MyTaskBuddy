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
    const [email, setEmail] = useState('harrymartins@gmail.com');
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
        <View style={styles.container}>
            <Image
                source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
                }}
                style={styles.image}
            />
            <Text style={styles.name}>Harry Martins</Text>
            <View style={styles.whiteContainter}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        <Icon name="envelope" size={20} color="#00004d" />  Nova email adresa
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
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
                            width:'60%'
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
        flex: 1,
        backgroundColor: '#00004d',
        alignItems: 'center',
        paddingTop: 80,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 25

    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 50,
        marginBottom: 20,
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
        width: '80%'
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
        backgroundColor: '#2CB237',
        borderRadius: 20,
        padding: 12,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:16
    },
    switchProfile: {
        //padding: 10,
        marginTop: 5,
    },
    switchProfileText: {
        color: '#00004d',
        fontSize:15,
        marginTop:5,
        textDecorationLine: 'underline'
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
        color: 'white',


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

});

export default EditProfile;
