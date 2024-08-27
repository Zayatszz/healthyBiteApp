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
        height: 50,
        // backgroundColor: '#033669',
        backgroundColor: '#033669',
        borderRadius: 15,
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