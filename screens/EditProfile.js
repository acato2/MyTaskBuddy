import React, { useState,useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './Login';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const EditProfile = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    // Fetch user details
  const fetchUserDetails = async () => {
    try {
      // Logged user ID
      const userId = await AsyncStorage.getItem('userId');

      // Make a request to your API to fetch details based on the user ID
      const response = await fetch(`http://10.0.2.2:3000/userdetails?userId=${userId}`);
      const data = await response.json();

      console.log(data)
      // Update fields with the fetched data
      setAvatar(data.avatar);
      setUsername(data.username);
      setPassword(data.password);
      setFirstName(data.firstname);
      setLastName(data.lastname);

    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };
  useEffect(() => {
    // Fetch details when the component mounts or when the selected date changes
    fetchUserDetails();
  }, []);

    
    const handleChanges = async() => {
        // handle changing data logic
        try {
            // Logged user ID
            const userId = await AsyncStorage.getItem('userId');
            const response = await axios.put(`http://10.0.2.2:3000/users/${userId}/profile`, {
                username: username,
                password: password
              });
            console.log(response.data.message);
            alert('Profile updated successfully');
        }catch (error) {
            console.error('Error editing profile:', error);

        }
    }

    const handleSwitch = () => {
        // handle account switch logic
        navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingWrapper>
        <View style={styles.main}>
        <View style={styles.container}>
            <Text style={styles.headingEdit}>Uredi profil</Text>
            </View>
            <View style={styles.userData}>
            {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={styles.image}
          />
        ) : null}
            <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
          
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
            </View>
            </KeyboardAvoidingWrapper>
     
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
        width: 140,
        height: 140,
        borderRadius: 50,
        marginBottom: 20,
        alignSelf:'center'
    },
    inputContainer: {
        width: '100%',
        padding: 20,
        backgroundColor:'#f2f2f2',
        borderTopRightRadius:100,
        height:'65%',
        borderColor:'#d9d9d9',
        borderTopLeftRadius:100,
        borderWidth:1,


    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: 'black',
        fontSize: 18,
        marginLeft:32
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
        backgroundColor:'white',
        marginLeft:32
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
        borderColor:'darkgray',
        marginBottom:20
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
        fontSize: 28,
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
