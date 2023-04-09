import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import Stopwatch from '../components/Stopwatch';

const Task = ({ route, navigation }) => {
    const { activityName, date } = route.params; // getting the activity name from the route params
    const formattedDate = moment(date).format('DD/MM/YYYY');
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/left.png')} style={styles.icon}></Image>
            </TouchableOpacity>
            <Image source={require('../assets/hourglass.png')} style={styles.topicon}></Image>
            <View style={styles.stopwatch}>

                <Stopwatch ></Stopwatch>
            </View>
            <View style={styles.whiteContainer}>
                <Text style={styles.activityName}>{activityName}</Text>
                <View style={styles.line}></View>
                <View style={styles.row}>
                    <Image
                        source={require('../assets/ancestors.png')}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.boldText}>Zadatak zadao/la:</Text>
                        <Text style={styles.regularText}>Jenny Martins</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Image
                        source={require('../assets/schedule.png')}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.boldText}>Datum:</Text>
                        <Text style={styles.regularText}>09/04/2023</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Image
                        source={require('../assets/clock.png')}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.boldText}>Trajanje:</Text>
                        <Text style={styles.regularText}>09:00 - 10:00</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Image
                        source={require('../assets/placeholder.png')}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.boldText}>Lokacija:</Text>
                        <Text style={styles.regularText}>Kuća</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Završeno</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333371'
    },
    icon: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 30,
        height: 30,
        marginTop: 40,
        marginStart: 5
    },
    stopwatch: {
        position: 'absolute',
        top: 150,
        alignSelf: 'center'


    },

    whiteContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 70,
        width: '100%',
        borderTopLeftRadius: 70,
        borderWidth: 2,
        borderColor: '#333371',
        marginTop: '80%'
    },
    activityName: {
        fontSize: 30,
        paddingTop: 20
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
        width: '80%',
    },



    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 40,
        paddingTop: 20
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    regularText: {
        fontSize: 14,
    },
    topicon: {
        height: 60,
        width: 60,
        position: 'absolute',
        top: 80,
        alignSelf: 'center',



    },
    button: {
        backgroundColor: '#333371',
        borderRadius: 20,
        padding: 10,
        marginTop:30,
        marginBottom:10,
        width: '60%',
        borderWidth:2,
        borderColor:'darkblue'

    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:20,
        textAlign:'center'
    
    },
});

export default Task;
