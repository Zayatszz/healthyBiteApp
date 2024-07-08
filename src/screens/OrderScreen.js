import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CarWashItem from '../components/CarWashItem';
import { fetchCarwashList as fetchCarwashListApi } from '../../api/user';
import { Dropdown } from 'react-native-element-dropdown';

const logoImg = require('../../assets/emu-logo.png');

const OrderScreen = ({ route, navigation }) => {
    const [selectedCarType, setSelectedCarType] = useState(null);
    const [selectedWashType, setSelectedWashType] = useState(null);
    const carTypes = [
        { label: 'Жижиг тэрэг', value: 'Жижиг тэрэг' },
        { label: 'Трактор', value: 'Трактор' },
        { label: 'Автобус', value: 'Автобус' },
     
      ];
    const washTypes = [
        { label: 'Дотор', value: 'Дотор' },
        { label: 'Гадна', value: 'Гадна' },
        { label: 'Бүгд', value: 'Бүгд' },
        
      ];
      const [value, setValue] = useState(null);
    const images = {
        'carwashApp1.png': require("../../assets/carwashApp1.png"),
        'carwashApp2.jpg': require("../../assets/carwashApp2.jpg"),
        'carwashApp3.jpg': require("../../assets/carwashApp3.jpg"),
        
      };
    const {carwash} = route.params;
  const [carwashList, setCarwashList] = useState([]);
  
  useEffect(() => {
    fetchCarwashList();
  }, []);

  const fetchCarwashList = async () => {
    try {
      const data = await fetchCarwashListApi();
      setCarwashList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.section}>
            <Text style={styles.paragraph}>Угаалгын газрын нэр: {carwash.name}</Text>
            <Text style={styles.paragraph}>Location: {carwash.location}</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.paragraph}>Машины төрөл сонгох</Text>
            <Dropdown
          style={styles.dropdown}
          data={carTypes}
          labelField="label"
          valueField="value"
          placeholder="Машины төрлөө сонгоно уу."
          value={selectedCarType}
          onChange={item => {
            setSelectedCarType(item.value);
          }}
        />
            <Text style={styles.paragraph}>Угаалгах төрлөө сонгох</Text>
            <Dropdown
          style={styles.dropdown}
          data={washTypes}
          labelField="label"
          valueField="value"
          placeholder="Угаах төрлөө сонгоно уу."
          value={selectedWashType}
          onChange={item => {
            setSelectedWashType(item.value);
          }}
        />
        </View>

        <View style={styles.section}>
            <Text style={styles.paragraph}>Угаалгах огноо</Text>
            <Text style={styles.paragraph}>Location: {carwash.location}</Text>
        </View>
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Захиалах</Text>
      </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
    section:{
        backgroundColor:'#fff',
        marginHorizontal:20,
        marginTop:20,
        padding:20,
        


    }, 
    carwashImg:{
        // width:280,
        height:200,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
  searchBar: {
    padding: 10,
    marginRight: 30,
    backgroundColor: '#000',
    width: '100%',
  },
  view: {
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#066BCF',
  },
  section1: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'bold',
    // textAlign: 'center',
    // color: '#FFF',
  },
  parText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  flexHeader: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#066BCF',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex: {
    padding: 10,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexz: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  allBtn: {
    width: 120,
    height: 40,
    backgroundColor: '#58B3F0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
  },
  logoImg: {
    width: 70,
    height: 60,
    borderRadius: 10,
  },
  CarWashItem: {
    paddingHorizontal: 20,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#58B3F0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#18A0FB',
    borderWidth: 1,
  },
  addText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },

  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#1E90FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderScreen;
