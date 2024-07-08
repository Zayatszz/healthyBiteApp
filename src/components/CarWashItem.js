import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
const carwashImg = require("../../assets/carwashApp1.png")
const CarWashItem =({ carwash, navigation })=>{

  
    const images = {
        'carwashApp1.png': require("../../assets/carwashApp1.png"),
        'carwashApp2.jpg': require("../../assets/carwashApp2.jpg"),
        'carwashApp3.jpg': require("../../assets/carwashApp3.jpg"),
        
      };
    return (
    //     <View style={styles.item}>
    //         <Image style={styles.carwashImg} source={images[carwash.imageUrl]} />
    //   <View style={styles.flex}>
        
        
    //     <Text onPress={() => navigation.navigate('DetailCarwash')} style={styles.paragraph}>{carwash.name} {carwash.imageUrl}</Text>
    //     {/* <Text style={styles.paragraph}>{carwash.price}</Text> */}
    //   </View>
    //   <Text style={styles.paragraph}>{carwash.location}</Text>
    // </View>
    <TouchableOpacity onPress={() => navigation.navigate('DetailCarwash', { carwash, navigation })}>
      <View style={styles.item}>
        <Image style={styles.carwashImg} source={images[carwash.imageUrl]} />
        <View style={styles.flex}>
          <Text style={styles.paragraph}>{carwash.name}</Text>
        </View>
        <Text style={styles.paragraph}>{carwash.location}</Text>
      </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor:"#FFF",
        paddingBottom: 15,
        width:280,
        borderRadius: 10,
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'space-between',
        marginBottom:20,
        marginRight:20
    },
    carwashImg:{
        width:280,
        height:200,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    flex:{
        // padding:10,
        // paddingLeft:10,
        // paddingHorizontal:20,
         width:'100%',
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:'center',
         
       },
       paragraph:{
        paddingTop:10,
        paddingHorizontal:10,
        // fontSize:20,
        fontWeight:'bold',
        // textAlign: 'center', 
        // color:'#FFF'
      },
    itemLeft:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
    },
    square:{
        width: 24,
        height: 24,
        backgroundColor: "#55BCF6",
        opacity: 0.4,
        borderRadius: 5,
        marginRight:15,
    },
    itemText:{
        maxWidth:'80%',
    },
    circular:{
        width:12,
        height:12,
        borderColor:'#55BCF6',
        borderWidth:2,
        borderRadius:5,
    },

    
});

export default CarWashItem;