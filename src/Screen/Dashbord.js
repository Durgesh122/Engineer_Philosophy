import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function Dashbord({ navigation }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => { 
            try {
                let jsonValue = await AsyncStorage.getItem('userData');
                let data = jsonValue != null ? JSON.parse(jsonValue) : null;
                
                if (!data) {

                    data = generateUserData();
                    await AsyncStorage.setItem('userData', JSON.stringify(data));
                }

                setUserData(data);
            } catch (e) {
                console.error('Error reading user data from AsyncStorage', e);
            }
        };

        fetchData();
    }, []);

    const generateUserData = () => {
        const username = `User_${Date.now()}`;
        return {
            userId: 1,
            name: 'John Doe', 
            email: 'john.doe@example.com', 
            dob: '1990-01-01', 
            qualification: 'Graduate',
            username: username 
        };
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('loggedIn');
            navigation.navigate('Login');
        } catch (e) {
            console.error('Error clearing user data from AsyncStorage', e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.firstViewCon}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Dashboard</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.userDataContainer}>
                        {userData && (
                            <>
                                <Text style={styles.label}>User ID:</Text>
                                <Text style={styles.value}>{userData.userId}</Text>

                                <Text style={styles.label}>Name:</Text>
                                <Text style={styles.value}>{userData.name}</Text>

                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.value}>{userData.email}</Text>

                                <Text style={styles.label}>DOB:</Text>
                                <Text style={styles.value}>{userData.dob}</Text>

                                <Text style={styles.label}>Qualification:</Text>
                                <Text style={styles.value}>{userData.qualification}</Text>

                                <Text style={styles.label}>Username:</Text>
                                <Text style={styles.value}>{userData.username}</Text>
                            </>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: responsiveWidth(5),
    },
    firstViewCon: {
        height: responsiveHeight(90),
        width: responsiveWidth(90),
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: responsiveWidth(1.5),
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        height: responsiveHeight(5),
        width: responsiveWidth(89),
        backgroundColor: 'yellow',
        marginBottom: responsiveHeight(3),
        justifyContent: 'center',
    },
    header: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    userDataContainer: {
        borderWidth: 1,
        borderColor: 'black',
        padding: responsiveWidth(5),
        borderRadius: responsiveWidth(2),
        marginBottom: responsiveHeight(5),
        width: responsiveWidth(80),
        height: responsiveHeight(50),
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: responsiveHeight(10), 
    },
    label: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(1),
    },
    value: {
        fontSize: responsiveFontSize(1.8),
        marginBottom: responsiveHeight(2),
    },
    logoutButton: {
        backgroundColor: 'black',
        height: responsiveHeight(5),
        width: responsiveWidth(30),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(55),
        marginBottom: responsiveHeight(1.5),
    },
    logoutText: {
        color: '#fff',
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
    },
});
