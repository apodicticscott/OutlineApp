// components/signup.js

import React, { Component } from 'react';
import {  StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, KeyboardAvoidingView, Image, TouchableOpacity  } from 'react-native';
import { auth } from '../database/firebase';


export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
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

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Login')
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
      <Text
        style={styles.titleText}
      >
        Join Outline
      </Text>
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#ABA5B6" 
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />   
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
          maxLength={15}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.registerUser()}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signUpBelowText}>────── Have an account? ──────</Text>

      <View style={styles.loginButtonContainer}>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>Login Here</Text>
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
  titleText: {
    color: '#ABA5B6',
    fontWeight: '600',
    fontSize: 40,
  },
  loginButtonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#2b2d35',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#21373F',
    borderWidth: 2,
  },
  loginText:{
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
});