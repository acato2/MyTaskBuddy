import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Calendar from '../components/Calendar';
import TaskCard from '../components/TaskCard';
import Task from './Task';

const HomePage = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
    setSelectedDate(date);
    };
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.leftColumn}>
                    <Text style={styles.text}>Dobro došli,</Text>
                    <Text style={styles.name}>Harry Martins</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Image
                        source={{
                            uri:
                                'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
                        }}
                        style={styles.avatar}
                    />
                </View>
            </View>

            <Calendar style={{ flex: 1}} onDateChange={handleDateChange}/>
            <ScrollView style={{ height: 580 }}>
                <TaskCard startTime="9:00" endTime="10:00 AM" activity="Morning Exercise" progress={70} onPress={()=>navigation.navigate('Task', {activityName:'Morning Exercise',date:selectedDate.toString()})}/>
                <TaskCard startTime="10:00" endTime="11:00"  activity="Meeting with John" progress={20} onPress={()=>navigation.navigate('Task', {activityName:'Meeting with John',date:selectedDate.toString()})}/>
                <TaskCard startTime="11:00" endTime="12:00"  activity="Lunch with Jane" progress={50} onPress={()=>navigation.navigate('Task', {activityName:'Lunch with Jane',date:selectedDate.toString()})}/>
                <TaskCard startTime="12:00" endTime="13:00"  activity="Presentation preparation" progress={100} onPress={()=>navigation.navigate('Task', {activityName:'Presentation preparation',date:selectedDate.toString()})}/>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    rightColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    avatar: {
        width: 65,
        height: 65,
        borderRadius: 25,
    },
});

export default HomePage;
