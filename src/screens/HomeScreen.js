
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { fetchCarwashServiceList as fetchCarwashServiceListApi, filterCarwashes , fetchFoodList as fetchFoodListApi } from '../api/user';
import { AuthContext } from '../context/AuthContext';
const logoImg = require('../../assets/logoo.png');
  

const HomeScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width - 40;
  const [carwashList, setCarwashList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [selectedWashType, setSelectedWashType] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [foodList, setFoodList] = useState([]);
  const { token, logout, userInfo, setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo?.id) {
      fetchFoodList();
    }
  }, [userInfo?.id]);
  



  const fetchFoodList = async () => {
    setLoading(true);
    try {
      const data = await fetchFoodListApi(userInfo.id);
      // console.log("zaa check2", data)
      setFoodList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleViewAll = () => {
    navigation.navigate('AllCarwash', { filteredList: foodList });
  };


  return (
    <View style={{ backgroundColor: '#FFF', flex: 1 }}>

  <StatusBar backgroundColor="#fff" barStyle="dark-content" />
  <ScrollView contentContainerStyle={styles.contentContainer}>
  <LinearGradient
    colors={['rgba(80, 184, 108, 0.2)', '#FFFFFF']}
    locations={[0, 0.42]}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={styles.gradientOverlay}
  />
  <View style={styles.headerSection}>
          <View style={styles.profileRow}>
            <View style={styles.profileIcon} >
            <Feather name='user' style={styles.userIcon} />

              </View>
            <Text style={styles.greeting}>Сайн уу, Заяа!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
              <Ionicons name='notifications' style={styles.bellIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>Өнөөдөр</Text>

        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricValueGreen}>186 ккал</Text>
              <Text style={styles.metricLabel}>Идсэн</Text>
            </View>

            <View style={styles.circularProgressContainer}>
              <AnimatedCircularProgress
                size={130}
                width={10}
                fill={50}
                tintColor="#F4C92F"
                backgroundColor="#F0F0F0"
                lineCap="round"
              >
                {() => (
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.centerValue}>2000</Text>
                    <Text style={styles.metricLabel}>ккал үлдсэн</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>

            <View style={styles.metricBlock}>
              <Text style={styles.metricValueGreen}>1 л</Text>
              <Text style={styles.metricLabel}>Ус уусан</Text>
            </View>
          </View>

          <View style={styles.nutrientsRowHorizontal}>
            <View style={styles.nutrientBlockHorizontal}>
              <Text style={styles.nutrientLabelBold}>Өөх тос</Text>
              <ProgressBar progress={0.43} color="#50B86C" style={styles.progressBar} />
              <Text style={styles.nutrientValue}>28/64 г</Text>
            </View>
            <View style={styles.nutrientBlockHorizontal}>
              <Text style={styles.nutrientLabelBold}>Уураг</Text>
              <ProgressBar progress={0.76} color="#50B86C" style={styles.progressBar} />
              <Text style={styles.nutrientValue}>200/264 г</Text>
            </View>
            <View style={styles.nutrientBlockHorizontal}>
              <Text style={styles.nutrientLabelBold}>Нүүрс ус</Text>
              <ProgressBar progress={0.83} color="#50B86C" style={styles.progressBar} />
              <Text style={styles.nutrientValue}>250/300 г</Text>
            </View>
          </View>
        </View>

        <View style={styles.foodSection}>
        <Text style={styles.title}>Бүртгэгдсэн хоол</Text>

{[{
  title: 'Өглөөний цай',
  value: '384/384 ккал',
  icon: require('../../assets/breakfast.png')
}, {
  title: 'Өдрийн хоол',
  value: '100/513 ккал',
  icon: require('../../assets/lunch.png')
}, {
  title: 'Оройн хоол',
  value: '0/320 ккал',
  icon: require('../../assets/dinner.png')
}].map((item, index) => (
  <View key={index} style={styles.foodCard}>
    <View style={styles.foodLeft}>
      <Image source={item.icon} style={styles.foodIcon} />
      <View>
        <Text style={styles.foodTitle}>{item.title}</Text>
        <Text style={styles.foodKcal}>{item.value}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={handleViewAll}>
      <Text style={styles.addIcon}>+</Text>
    </TouchableOpacity>
  </View>
))}

        </View>

        
        <Text style={styles.title}>Уусан ус</Text>
        <View style={styles.card}>
          
          <View style={styles.waterRow}>
            <View>
            <Text style={styles.boldText}>1500 мл</Text>
            <Text style={styles.foodKcal}>Сүүлийнх 12:41</Text>
            <View style={styles.waterRow }>
            <TouchableOpacity style={styles.waterBtn}><Text style={styles.waterBtnText}>-</Text></TouchableOpacity>
            <Text style={styles.waterAmount}>6</Text>
            <TouchableOpacity style={styles.waterBtn}><Text style={styles.waterBtnText}>+</Text></TouchableOpacity>
            
            </View>
            <Text style={styles.foodKcal}>2 аяга ус үлдсэн</Text>
            
            </View>
            
           
            <View style={styles.waterGlass}>
              <View style={styles.waterFill}><Text style={styles.waterPercent}>80%</Text></View>
            </View>
          </View>
          
          <View style={styles.waterRow}>
            <TouchableOpacity><Text style={styles.linkText}>Аяганы хэмжээ тохируулах</Text></TouchableOpacity>
           
            {/* <Text style={styles.addIcon}>+</Text> */}
            <View style={styles.waterRow }>
            <TouchableOpacity style={styles.waterMeasureBtn}>
              <Text style={styles.waterMeasureBtnText}>-</Text>
              </TouchableOpacity>
            <Text style={styles.waterMeasure}>250 мл</Text>
            <TouchableOpacity style={styles.waterMeasureBtn}><Text style={styles.waterMeasureBtnText}>+</Text></TouchableOpacity>
            
            </View>
            
          </View>
        </View>

        <Text style={styles.title}>Таны 7 хоногийн үзүүлэлт</Text>
        <View style={[styles.card, { marginBottom: 100 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ color: '#000', fontSize:12, fontWeight:'bold' }}>2024/10/22-26</Text>
            <Text style={{ fontWeight: 'bold', color: '#1B1C1E', fontSize:16 }}>7 Бүртгэл</Text>
          </View>
          <LineChart
            data={{
              labels: ['1', '2', '3', '4', '5', '6', '7'],
              datasets: [
                {
                  data: [200, 450, 300, 800, 1200, 600, 1100],
                },
              ],
            }}
            width={screenWidth-40}
            height={200}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(65, 171, 248, ${opacity})`,
              labelColor: () => '#000',
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#4BC0C0',
              },
            }}
            bezier
            style={{ borderRadius: 8 }}
          />
        </View>
        
  </ScrollView>
</View>

  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    fontFamily: 'Inter'
  },
  gradientOverlay: {
    position: 'absolute',
    top: 300, // “Өнөөдөр” картны доорх байрлалд тааруулна
    left: 0,
    right: 0,
    height: 800, // эсвэл дэлгэцийн үлдсэн өндөр
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    zIndex: -1,
  },
  

  
  contentContainer: { paddingHorizontal: 25, paddingTop:20, paddingBottom: 40 },
  headerSection: { marginBottom: 28 },
  profileRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  profileIcon: { 
    width: 60, height: 60,
     borderRadius: 50, 
     backgroundColor: '#50B86C',
     justifyContent: 'center', alignItems: 'center'
     },
  bellIcon: { color: '#50B86C', fontSize: 26 },
  userIcon:{
    color:"#fff",
    fontSize: 25 ,
   
  },
  greeting: { 
    fontFamily: 'Inter-Regular',
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#000', 
    flex: 1, 
    marginLeft: 12
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#171532' },
  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 28, 
    borderWidth:1,
   borderColor: '#DADADA',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.01, 
    elevation: 1  

  },
  
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  metricBlock: { alignItems: 'center', justifyContent: 'center', flex: 1},
  circularProgressContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1, 
    marginHorizontal:20 
  },
  centerValue: { fontSize: 32, fontWeight: '600', color: '#000', textAlign: '0center' },
  metricLabel: { fontSize: 12,fontWeight: '600', color: '#000', textAlign: 'center', marginTop: 2 },
  metricValueGreen: { color: '#50B86C', fontWeight: 'bold', fontSize: 16 },
  nutrientsRowHorizontal: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  nutrientBlockHorizontal: { flex: 1, marginHorizontal: 4 },
  nutrientLabelBold: { fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 6, textAlign: 'center' },
  progressBar: { height: 9, borderRadius: 16,  backgroundColor: '#C7C9D9' },
  nutrientValue: { fontSize: 12, fontWeight: 'bold', color: '#50B86C', marginTop: 8, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#000' },
  foodSection:{
    marginBottom: 12
  },
  foodCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 16, 
    borderWidth:1,
   borderColor: '#DADADA',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.01, 
    elevation: 1  ,
    flexDirection: 'row', 
    justifyContent: 
    'space-between', 
    alignItems: 'center' 
  },
  foodLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  foodIcon: { width: 42, height: 42, marginRight: 12 },
  foodTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  foodKcal: { fontSize: 14, color: '#6D7074' },
  addIcon: { fontSize: 32, color: '#F4C92F' },
  boldText: { fontSize: 20, fontWeight: 'bold', marginBottom: 6, color: '#000' },
  subText: { fontSize: 13, color: '#666', marginBottom: 12 },
  waterRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 12, 
    // paddingHorizontal:8
  },
  
  waterBtn: { 
    width: 45, 
    height: 45, 
    marginTop:24,
    borderRadius: 50, 
    // backgroundColor: '#F0F0F0', 
    borderWidth:1,
    borderColor:'#DADADA',
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 4,
    // shadowColor: '#000000',
    // shadowOpacity: 0.01, 
    // elevation: 1  ,
    justifyContent: 'center', 
    alignItems: 'center' },
  waterBtnText: { 
    fontSize: 32,  
    color: '#000'
   },
  waterAmount: { 
    marginTop:24,
    fontSize: 24, 
    fontWeight: '600',
    color: '#000', 
    marginHorizontal:16
  },
  waterGlass: { 
    width: 90, 
    height: 150, 
    backgroundColor: '#DFF1FE', 
    
    borderRadius: 16, 
    justifyContent: 'flex-end',
     alignItems: 'center', 
     overflow: 'hidden' },
  waterFill: { 
    width: '100%',
     height: '80%', 
     backgroundColor: '#41ABF8', 
     justifyContent: 'center', 
     alignItems: 'center' },
  waterPercent: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  waterAdjustRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 12 },
  linkText: { fontSize: 12, color: '#41ABF8' },
  waterMeasure: { 
    marginTop:16,
    marginHorizontal:16,
    fontSize: 16, 
    color: '#000', 
    fontWeight:'bold' },
  waterMeasureBtn:{
    width: 28, 
    height: 28, 
    marginTop:16,
    borderRadius: 50, 
    // backgroundColor: '#F0F0F0', 
    borderWidth:1,
    borderColor:'#DADADA',

    justifyContent: 'center', 
    alignItems: 'center'

  },
  waterMeasureBtnText:{
    
 fontSize: 18,  
    color: '#000',
     
  }
});

export default HomeScreen;
