import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [qualification, setQualification] = useState("");
    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!userId || isNaN(userId)) {
            errors.userId = "User ID should be a number";
            valid = false;
        }
        if (!name || name.length < 2) {
            errors.name = "Name should have a minimum of 2 characters";
            valid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = "Email should have a valid format";
            valid = false;
        }
        const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dob || !dobRegex.test(dob)) {
            errors.dob = "DOB should be in dd/mm/yyyy format";
            valid = false;
        }
        if (!password || password !== confirmPassword) {
            errors.password = "Passwords do not match";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSignUp = async () => {
        if (validate()) {
            const user = {
                userId,
                name,
                email,
                dob,
                qualification,
                password,
            };
            try {
                await AsyncStorage.setItem('userData', JSON.stringify(user));
                Alert.alert('Success!', 'Registration successful!');
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error!', 'Failed to save data.');
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.textsty}>Sign Up Form</Text>
                <View style={styles.firstViewcon}>
                    <Text style={styles.textsty2}>SIGN UP</Text>
                    <Text style={styles.textsty3}>USER ID</Text>
                    <TextInput
                        style={styles.textinsty}
                        placeholder='Enter a user ID'
                        keyboardType="numeric"
                        onChangeText={setUserId}
                        value={userId}
                    />
                    {errors.userId && <Text style={styles.errorText}>{errors.userId}</Text>}

                    <Text style={styles.namesty}>NAME</Text>
                    <TextInput
                        style={styles.textinsty}
                        placeholder='Enter your name'
                        onChangeText={setName}
                        value={name}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                    <Text style={styles.emtextsty}>EMAIL ADDRESS</Text>
                    <TextInput
                        style={styles.textinsty}
                        placeholder='Enter your email'
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value={email}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    
                    <Text style={styles.emtextsty}>QUALIFICATION</Text>
                    <View style={styles.textinsty}>
                        <Picker
                            selectedValue={qualification}
                            style={styles.picker}
                            onValueChange={(itemValue) => setQualification(itemValue)}
                        >
                            <Picker.Item label="Select your qualification" value="" />
                            <Picker.Item label="High School" value="highschool" />
                            <Picker.Item label="Bachelor's" value="bachelor" />
                            <Picker.Item label="Master's" value="master" />
                            <Picker.Item label="PhD" value="phd" />
                        </Picker>
                    </View>

                    <Text style={styles.dobtextsty}>DOB</Text>
                    <TextInput
                        style={styles.textinsty}
                        placeholder='Enter your DOB (dd/mm/yyyy)'
                        onChangeText={setDob}
                        value={dob}
                    />
                    {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

                    <Text style={styles.textsty4}>PASSWORD</Text>
                    <TextInput
                        style={styles.textinsty}
                        placeholder='Enter your password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                    />

                    <Text style={styles.compass}>CONFIRM PASSWORD</Text>
                    <TextInput
                        style={styles.textinsty}
                        placeholder='Confirm your password'
                        secureTextEntry={true}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    <TouchableOpacity style={styles.signbtn} onPress={handleSignUp}>
                        <Text style={styles.btntext}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.btnview}>
                        <TouchableOpacity style={styles.signbtn2} onPress={handleLogin}>
                            <Text style={styles.btntext2}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signupbtn} onPress={handleSignUp}>
                            <Text style={styles.btntext2}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textsty: {
        fontSize: responsiveFontSize(2.5),
        color: "black",
        fontWeight: "bold",
        marginBottom: responsiveHeight(2),
        marginLeft:responsiveWidth(-57)
    },
    btnview: {
        flexDirection: "row",
        marginTop: responsiveHeight(2),
    },
    textsty2: {
        fontSize: responsiveFontSize(2.5),
        color: "black",
        fontWeight: "bold",
        letterSpacing: 1,
        textAlign: "center",
        marginVertical: responsiveHeight(2),
    },
    textsty3: {
        fontSize: responsiveFontSize(1.5),
        color: "black",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: responsiveWidth(1.5),
    },
    namesty: {
        fontSize: responsiveFontSize(1.5),
        color: "black",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: responsiveWidth(1.5),
        marginTop: responsiveHeight(2),
    },
    emtextsty: {
        fontSize: responsiveFontSize(1.5),
        color: "black",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: responsiveWidth(1.5),
        marginTop: responsiveHeight(2),
    },
    dobtextsty: {
        fontSize: responsiveFontSize(1.5),
        color: "black",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: responsiveWidth(1.5),
        marginTop: responsiveHeight(2),
    },
    textsty4: {
        fontSize: responsiveFontSize(1.5),
        color: "black",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: responsiveWidth(1.5),
        marginTop: responsiveHeight(2),
    },
    compass: {
        fontSize: responsiveFontSize(1.5),
        color: "black",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: responsiveWidth(1.5),
        marginTop: responsiveHeight(2),
    },
    firstViewcon: {
        height:responsiveHeight(90),
        width: responsiveWidth(90),
        padding: responsiveWidth(5),
        borderWidth: 2,
        borderColor: "black",
        borderRadius: responsiveWidth(1.5),
        alignItems: "center",
    },
    textinsty: {
        height: responsiveHeight(5),
        width: responsiveWidth(80),
        borderWidth: 1,
        borderColor: "black",
        borderRadius: responsiveWidth(2),
        backgroundColor: "rgba(219, 219, 219, 1)",
        paddingLeft: responsiveWidth(2),
    },
    picker: {
        width: responsiveWidth(80),
        marginLeft: responsiveWidth(-4),
        marginTop: responsiveHeight(-1),
    },
    signbtn: {
        borderWidth: 1,
        height: responsiveHeight(5),
        width: responsiveWidth(80),
        backgroundColor: "black",
        borderRadius: responsiveWidth(2),
        justifyContent: "center",
        marginTop: responsiveHeight(2),
    },
    signbtn2: {
        borderWidth: 1,
        height: responsiveHeight(5),
        width: responsiveWidth(45),
        backgroundColor: "rgba(219, 219, 219, 1)",
        justifyContent: "center",
        marginTop:responsiveHeight(3.2)
    },
    signupbtn: {
        borderWidth: 1,
        height: responsiveHeight(5),
        width: responsiveWidth(45),
        backgroundColor: "#face2f",
        justifyContent: "center",
        marginTop:responsiveHeight(3.2)
    },
    btntext: {
        color: 'white',
        fontSize: responsiveFontSize(1.5),
        textAlign: "center",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    btntext2: {
        color: 'black',
        fontSize: responsiveFontSize(1.5),
        textAlign: "center",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    errorText: {
        color: 'red',
        fontSize: responsiveFontSize(1.2),
        marginLeft: responsiveWidth(5),
        marginBottom: responsiveHeight(1),
    },
});
