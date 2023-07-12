// components/dashboard.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import axios from 'axios';

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/completions';


const Dashboard = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [summary, setSummary] = useState('');

  const handleGenerateSummary = async () => {
    try {
      const response = await axios.post(API_URL, {
        prompt: `Write an eight sentence summary about "${bookTitle}"`,
        model: "text-davinci-003",
        max_tokens: 200,
        temperature: 0.7,
        n: 1,
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const summaryText = response.data.choices[0].text;
      setSummary(summaryText);
      console.log(summaryText);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
    >
      <Text style={styles.mainText}> Write A <Text style={styles.summary}>Summary</Text> About</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={bookTitle}
          onChangeText={setBookTitle} 
          maxLength={80}
          placeholder="Book title"
          placeholderTextColor="#ABA5B6" 
        />
        <Text style={styles.responseMainText}>Response:</Text>
      </View>
      <View style = {styles.responseContainer}>
        <Text style = {styles.summaryStyle}>{summary}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleGenerateSummary}
          style={styles.button}
        >
          <Text style={styles.buttonText}>WRITE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#23252d',
    alignItems: 'center',
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
  inputContainer: {
    width: '80%',
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
    color: '#fff'
  },
  mainText: {
    fontSize: 25,
    color: '#ABA5B6',
    fontWeight: '800',
  },
  summary: {
    color: '#704DB1'
  },
  buttonContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2b2d35',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#21373F',
    borderWidth: 2,
  },
  buttonText: {
    color: '#704DB1',
    fontWeight: '700',
    fontSize: 16,
  },
  responseContainer: {
    backgroundColor: '#2b2d35',
    width: '80%',
    height: '55%',
    borderRadius: 10,
    alignItems: 'flex-start',
    borderColor: '#21373F',
    borderWidth: 2,
  },
  responseMainText: {
    fontSize: 22,
    color: '#ABA5B6',
    fontWeight: '800',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  summaryStyle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: -20,
  },
});

export default Dashboard;