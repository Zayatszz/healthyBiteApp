import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, Button,StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CarWashItem from '../components/CarWashItem';
import SkeletonCarWashItem from '../components/SkeletonCarWashItem';
import { fetchCarwashServiceList as fetchCarwashServiceListApi, filterCarwashes as filterCarwashesApi } from '../api/user';
import { Dropdown } from 'react-native-element-dropdown';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const logoImg = require('../../assets/logoo.png');
const bannerImg = require('../../assets/carwashBanner.png'); // Update the path to your banner image

const HomeScreen = ({ navigation }) => {
  const [carwashList, setCarwashList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [selectedWashType, setSelectedWashType] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districts, setDistricts] = useState([]);

  const carTypes = [
    { label: "Том оврын жийп", value: "Том оврын жийп" },
    { label: "Дунд оврын жийп", value: "Дунд оврын жийп" },
    { label: "Жижиг тэрэг", value: "Жижиг тэрэг" },
    { label: "Портер", value: "Портер" },
    { label: "Том ачааны машин", value: "Том ачааны машин" },
    { label: "Жижиг трактор", value: "Жижиг трактор" },
    { label: "Том трактор", value: "Том трактор" },
    { label: "Мотоцикл", value: "Мотоцикл" },
    { label: "Автобус", value: "Автобус" },
    { label: "Микро", value: "Микро" },
  ];

  const washTypes = [
    { label: "Энгийн гадна угаалга", value: "Энгийн гадна угаалга" },
    { label: "Энгийн дотор угаалга", value: "Энгийн дотор угаалга" },
    { label: "Энгийн бүтэн угаалга", value: "Энгийн бүтэн угаалга" },
    { label: "Уурийн угаалга", value: "Уурийн угаалга" },
    { label: "VIP угаалга", value: "VIP угаалга" },
    { label: "Суудал угаалга", value: "Суудал угаалга" },
    { label: "Шал тааз угаалга", value: "Шал тааз угаалга" },
    { label: "Мотор шүрших", value: "Мотор шүрших" },
    { label: "Мотор угаалга", value: "Мотор угаалга" },
    { label: "Дрилл өнгөлгөө", value: "Дрилл өнгөлгөө" },
  ];

  const provinces = [
    { label: "Улаанбаатар", value: "Улаанбаатар" },
    { label: "Дархан-Уул", value: "Дархан-Уул" },
    { label: "Сэлэнгэ", value: "Сэлэнгэ" },
  ];

  const districtsByProvince = {
    "Улаанбаатар": [
      { label: "Багануур", value: "Багануур" },
      { label: "Багахангай", value: "Багахангай" },
      { label: "Баянгол", value: "Баянгол" },
      { label: "Баянзүрх", value: "Баянзүрх" },
      { label: "Налайх", value: "Налайх" },
      { label: "Сүхбаатар", value: "Сүхбаатар" },
      { label: "Сонгинохайрхан", value: "Сонгинохайрхан" },
      { label: "Хан-Уул", value: "Хан-Уул" },
      { label: "Чингэлтэй", value: "Чингэлтэй" },
    ],
    "Дархан-Уул": [
      { label: "Дархан", value: "Дархан" },
      { label: "Орхон", value: "Орхон" },
      { label: "Хонгор", value: "Хонгор" },
      { label: "Шарын гол", value: "Шарын гол" },
    ],
    "Сэлэнгэ": [
      { label: "Алтанбулаг", value: "Алтанбулаг" },
      { label: "Баянгол", value: "Баянгол" },
      { label: "Баруунбүрэн", value: "Баруунбүрэн" },
      { label: "Ерөө", value: "Ерөө" },
      { label: "Жавхлант", value: "Жавхлант" },
      { label: "Зүүнбүрэн", value: "Зүүнбүрэн" },
      { label: "Мандал", value: "Мандал" },
      { label: "Орхон", value: "Орхон" },
      { label: "Орхонтуул", value: "Орхонтуул" },
      { label: "Сант", value: "Сант" },
      { label: "Сайхан", value: "Сайхан" },
      { label: "Сүхбаатар", value: "Сүхбаатар" },
      { label: "Хушаат", value: "Хушаат" },
      { label: "Хүдэр", value: "Хүдэр" },
      { label: "Түшиг", value: "Түшиг" },
      { label: "Цагааннуур", value: "Цагааннуур" },
      { label: "Шаамар", value: "Шаамар" },
    ],
  };

  useEffect(() => {
    fetchCarwashList();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setDistricts(districtsByProvince[selectedProvince] || []);
      setSelectedDistrict(null); // Reset selected district when province changes
    }
  }, [selectedProvince]);

  const fetchCarwashList = async () => {
    setLoading(true);
    try {
      const data = await fetchCarwashServiceListApi();
      setCarwashList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const filters = {
      carType: selectedCarType,
      washType: selectedWashType,
      province: selectedProvince,
      district: selectedDistrict,
    };

    try {
      let filteredList = await filterCarwashesApi(filters);
      navigation.navigate('AllCarwash', { filteredList });

      // Reset selections
      setSelectedCarType(null);
      setSelectedWashType(null);
      setSelectedProvince(null);
      setSelectedDistrict(null);
    } catch (error) {
      console.error('Failed to fetch filtered carwashes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    navigation.navigate('AllCarwash', { filteredList: carwashList });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#033669" barStyle="light-content" />
      <View style={styles.flexHeader}>
        <Image style={styles.logoImg} source={logoImg} />
        <TouchableOpacity onPress={()=> navigation.navigate("Notification")}>
          <Feather name='bell' style={styles.bellIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.banner}>
       <Image style={styles.bannerImg} source={bannerImg} />
       </View>
      <View style={styles.searchSection}>
      <Text style={styles.parText}>Угаалгын газар хайх</Text>
        <Dropdown
          style={styles.dropdown}
          data={carTypes}
          labelField="label"
          valueField="value"
          placeholder="Машины хэмжээ"
          value={selectedCarType}
          iconStyle={styles.iconStyle}
          iconColor='rgba(0, 0, 0, 0.72)'
          onChange={item => {
            setSelectedCarType(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={washTypes}
          labelField="label"
          valueField="value"
          placeholder="Угаалгах төрөл"
          value={selectedWashType}
          iconStyle={styles.iconStyle}
          iconColor='rgba(0, 0, 0, 0.72)'
          onChange={item => {
            setSelectedWashType(item.value);
          }}
         
        />
        <Dropdown
          style={styles.dropdown}
          data={provinces}
          labelField="label"
          valueField="value"
          placeholder="Аймаг, хот"
          value={selectedProvince}
          iconStyle={styles.iconStyle}
          iconColor='rgba(0, 0, 0, 0.72)'
          onChange={item => {
            setSelectedProvince(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={districts}
          labelField="label"
          valueField="value"
          placeholder="Сум, дүүрэг"
          value={selectedDistrict}
          iconStyle={styles.iconStyle}
          iconColor='rgba(0, 0, 0, 0.72)'
          onChange={item => {
            setSelectedDistrict(item.value);
          }}
          disabled={!selectedProvince}
        />
        <TouchableOpacity style={[styles.button, styles.flexz]} onPress={handleSearch}>
          <Text style={styles.buttonText}>Хайх</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flex}>
        <Text style={styles.parText}>Угаалгын газрууд</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.addText}>Бүгдийг харах</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.CarWashItem}>
        {loading ? (
          <FlatList
            data={Array(5).fill({})}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={() => <SkeletonCarWashItem />}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <FlatList
            data={carwashList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <CarWashItem carwash={item} navigation={navigation} />}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  parText: {
    fontSize: 16,
    lineHeight:19,
    fontWeight:'500',
    color: '#141218',
    paddingBottom:16
  },

  addText: {
    color: '#8B8E95',
    fontSize: 13,
    lineHeight:16,
    paddingBottom:16
  },
  flexHeader: {
   paddingVertical:8,
    paddingHorizontal:20,
    paddingRight:12,
    backgroundColor: '#033669',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex: {
    paddingTop: 16,
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
  searchSection: {
    marginVertical:16,
    paddingHorizontal: 20,
    // marginBottom: 10,
  },
  dropdown: {
    height: 48,
    width:'100%',
    borderRadius: 8,
    // paddingHorizontal: 8,
    paddingLeft:16,
    paddingRight:8,
    paddingVertical:8,
    marginBottom: 16,
    backgroundColor: "#F4F6F9",
  },
  iconStyle:{
    height:24,
    overflow:'hidden',
  },
  CarWashItem: {
    marginTop: 8,
    marginBottom: 32,
  },
  logoImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  bellIcon: {
    color: '#fff',
    fontSize: 25,
   
  },
  button: {
    marginTop: 4,
    width: '100%',
    height: 48,
    backgroundColor: '#FFCC33',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal:16,
  },
  buttonText: {
    
    // color: '#969597',
    color: '#FFF',
    // color: '#033669',
    fontSize: 20,
    lineHeight:24,
    opacity:0.7,
    fontWeight: '700',
  },

  banner: {
    paddingVertical: 16,
    marginHorizontal: 20,
  },
  bannerImg: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8
  },
});

export default HomeScreen;
