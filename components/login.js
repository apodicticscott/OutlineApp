// components/login.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import { auth } from '../database/firebase';


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('TabNavBar', { screen: 'Dashboard' })
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
    >
      <Image style={styles.logo} source={require("../assets/images/logoCircle.png")}/>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ABA5B6" 
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ABA5B6" 
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          style={styles.input}
          maxLength={15}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.userLogin()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signUpBelowText}>────── Don't have an account? ──────</Text>

      <View style={styles.signUpButtonContainer}>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Signup')}
          style={styles.signUpButton}
        >
          <Text style={styles.signUpText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#23252d"
  },
  signUpButtonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#2b2d35',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#21373F',
    borderWidth: 2,
  },
  signUpText: {
    color: '#ABA5B6',
    fontWeight: '600',
    fontSize: 16,
  },
  signUpBelowText: {
    color: '#ABA5B6',
    fontSize: 14,
    fontWeight: '800',
    paddingTop: 30,
    paddingBottom: 30,
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: "#2b2d35",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    borderColor: '#21373F',
    borderWidth: 2,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#2b2d35',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#21373F',
    borderWidth: 2,
  },
  buttonText: {
    color: '#ABA5B6',
    fontWeight: '700',
    fontSize: 16,
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 15,
    marginTop: -25,
  },
});