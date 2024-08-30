import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
const carwashImg = require("../assets/carwashApp1.png")

const SubmitButton =({ text, onPress })=>{
    return (
       <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    button: {

        width: '100%',
        height: 48,
        // backgroundColor: '#033669',
        backgroundColor: '#033669',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
       
      },
      buttonText: {
        color: '#F5F5F5',
        fontSize: 18,
        fontWeight: '450',
      },
});

export default SubmitButton;