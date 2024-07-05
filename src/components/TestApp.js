import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, StatusBar, Keyboard, KeyboardAvoidingView, TextInput, Platform, Image} from 'react-native';
import CarWashItem from './components/CarWashItem';

const logoImg = require("./assets/emu-logo.png")
export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const handleAddTask=()=>{
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }
  const completeTask=(index)=>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}> 
    <View
      behavior={Platform.OS ==="ios" ? "padding":"height"}
      style={styles.flexHeader}
    >
      <Image style={styles.logoImg} source={logoImg}/>
   
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
 
    </View>

     <View style={styles.section1}>
      <Text style={styles.sectionTitle}>EMU</Text>
      <Text style={styles.paragraph}>Машин угаалгын апп</Text>

    </View>

    <View style={styles.flex}>
     
     <View >
          <Text style={styles.parText}>Угаалгын газрууд</Text>
        </View>
 
        <View style={styles.allBtn}>
          <Text style={styles.addText}>Бүгд</Text>
        </View>
 
    </View>

    <View style={styles.CarWashItem}>

      <CarWashItem/>
    </View>
    
    <KeyboardAvoidingView
      behavior={Platform.OS ==="ios" ? "padding":"height"}
      style={styles.writeTaskWrapper}
    >
      <TextInput style={styles.input} placeholder={'Write a task'}  value={task} onChangeText={text=>setTask(text)}/>
      <TouchableOpacity onPress={()=>handleAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#000',
    
    // backgroundColor:'#E8EAED',
  },
  taskWrapper:{
    paddingTop: 80,
    paddingHorizontal:20
    
  },
  section1:{
    paddingTop: 80,
    paddingBottom:60,
    paddingHorizontal:20
  },
  sectionTitle:{
    fontSize:50,
    fontWeight:'bold',
    textAlign: 'center', 
    color:'#FFF'
  },
  paragraph:{
    fontSize:20,
    fontWeight:'bold',
    textAlign: 'center', 
    color:'#FFF'
  },
  parText:{
    fontSize:20,
    textAlign: 'center', 
    color:'#FFF'
  },
  items:{
    marginTop:30
  },
  flexHeader:{
    backgroundColor:"#FFF",
   padding:10,
   paddingHorizontal:20,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  flex:{
   padding:10,
   paddingHorizontal:20,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  allBtn:{
    width:120,
    height:40,
    backgroundColor:"#FFF",
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderColor:"#C0C0C0",
    borderWidth:1,
  },
  logoImg:{
    width:70,
    height:60,
    borderRadius:10
  }, 
  CarWashItem:{
    paddingHorizontal:20
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal:15,
    backgroundColor:'#FFF',
    borderRadius:60,
    borderColor:'#C0C0C0',
    borderWidth:1,
    width:250,
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:"#FFF",
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderColor:"#C0C0C0",
    borderWidth:1,
  },
  addText:{

  },
})