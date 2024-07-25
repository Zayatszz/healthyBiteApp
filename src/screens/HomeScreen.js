import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CarWashItem from '../components/CarWashItem';
import { fetchCarwashServiceList as fetchCarwashServiceListApi } from '../api/user';
import { filterCarwashes as filterCarwashesApi } from '../api/user';
import { Dropdown } from 'react-native-element-dropdown';

const logoImg = require('../../assets/logoo.png');

const HomeScreen = ({ navigation }) => {
  const [carwashList, setCarwashList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [selectedWashType, setSelectedWashType] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districts, setDistricts] = useState([]);

  const carTypes = [
    { label: "Том оврын жийп", value: "Том оврын жийп", },
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
    { label: "Энгийн гадна угаалга", value: "Энгийн гадна угаалга", },
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

    setLoading(true);
    try {
      let filteredList = await filterCarwashesApi(filters);
      console.log(filteredList.length);
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
      <View style={styles.flexHeader}>
        <Image style={styles.logoImg} source={logoImg} />
        <Text>
          <Feather name='bell' style={styles.bellIcon} />
        </Text>
      </View>
      <View style={styles.section1}>
        <Text style={styles.sectionTitle}>Бага хай. Илүү амьдар.</Text>
      </View>
      <View style={styles.searchSection}>
        <Dropdown
          style={styles.dropdown}
          data={carTypes}
          labelField="label"
          valueField="value"
          placeholder="Машины хэмжээ"
          value={selectedCarType}
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
          onChange={item => {
            setSelectedDistrict(item.value);
          }}
          disabled={!selectedProvince}
        />
        <TouchableOpacity style={[styles.button, styles.flexz]} onPress={handleSearch}>
          <Feather name='search' style={{ color: '#FFF', fontSize: 25 }} />
          <Text style={styles.buttonText}>Угаалгын газар хайх</Text>
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
          <ActivityIndicator size="large" color="#0000ff" />
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
  section1: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  parText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  flexHeader: {
    padding: 10,
    backgroundColor: '#E0E0E0',
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
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 15,
  },
  CarWashItem: {
    paddingTop: 15,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logoImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  bellIcon: {
    color: 'black',
    fontSize: 25,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#268AE6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    paddingLeft: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addText: {
    color: '#8B8E95',
    fontSize: 16,
  },
});

export default HomeScreen;
