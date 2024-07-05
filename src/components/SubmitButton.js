import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
const carwashImg = require("../assets/carwashApp1.png")

const SubmitButton =({ text })=>{
    return (
       <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 45,
        backgroundColor: '#1E90FF',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default SubmitButton;