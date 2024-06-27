import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    navigation.navigate("Register");
  };

  const handleDashboard = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.email === email && userData.password === password) {
          await AsyncStorage.setItem('loggedIn', 'true');
          navigation.navigate("Dashbord", { userData });
        } else {
          Alert.alert("Error", "Invalid email or password");
        }
      } else {
        Alert.alert("Error", "No user data found. Please sign up.");
      }
    } catch (error) {
      console.error('Error fetching data', error);
      Alert.alert("Error", "Failed to login. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textSty}>Sign In Form</Text>
      <View style={styles.firstViewCon}>
        <Text style={styles.textSty2}>SIGN IN</Text>
        <Text style={styles.textSty3}>EMAIL ADDRESS</Text>
        <TextInput
          style={styles.textInputSty}
          placeholder='Enter your email'
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.textSty4}>PASSWORD</Text>
        <TextInput
          style={styles.textInputSty}
          placeholder='Enter your password'
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.signBtn} onPress={handleDashboard}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.signBtn2} onPress={handleDashboard}>
            <Text style={styles.btnText2}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
            <Text style={styles.btnText2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textSty: {
    fontSize: responsiveFontSize(2.5),
    color: "black",
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
    marginLeft:responsiveWidth(-60)
  },
  btnView: {
    flexDirection: "row",
    marginTop: responsiveHeight(2),
  },
  textSty2: {
    fontSize: responsiveFontSize(2.5),
    color: "black",
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    marginVertical: responsiveHeight(2),
  },
  textSty3: {
    fontSize: responsiveFontSize(1.5),
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: responsiveWidth(1.5),
  },
  textSty4: {
    fontSize: responsiveFontSize(1.5),
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: responsiveWidth(1.5),
    marginTop: responsiveHeight(2),
  },
  firstViewCon: {
    height:responsiveHeight(80),
    width: responsiveWidth(90),
    padding: responsiveWidth(5),
    borderWidth: 2,
    borderColor: "black",
    borderRadius: responsiveWidth(1.5),
    alignItems: "center",
  },
  textInputSty: {
    height: responsiveHeight(5),
    width: responsiveWidth(80),
    borderWidth: 1,
    borderColor: "black",
    borderRadius: responsiveWidth(2),
    backgroundColor: "rgba(219, 219, 219, 1)",
    marginBottom: responsiveHeight(2),
    paddingLeft: responsiveWidth(2),
  },
  signBtn: {
    borderWidth: 1,
    height: responsiveHeight(5),
    width: responsiveWidth(80),
    backgroundColor: "black",
    borderRadius: responsiveWidth(2),
    justifyContent: "center",
    marginTop: responsiveHeight(2),
  },
  signBtn2: {
    borderWidth: 1,
    height: responsiveHeight(5),
    width: responsiveWidth(45),
    backgroundColor: "#face2f",
    justifyContent: "center",
    marginTop: responsiveHeight(35),
  },
  signupBtn: {
    borderWidth: 1,
    height: responsiveHeight(5),
    width: responsiveWidth(45),
    backgroundColor: "rgba(219, 219, 219, 1)",
    justifyContent: "center",
    marginTop: responsiveHeight(35),
  },
  btnText: {
    color: 'white',
    fontSize: responsiveFontSize(1.5),
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  btnText2: {
    color: 'black',
    fontSize: responsiveFontSize(1.5),
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
