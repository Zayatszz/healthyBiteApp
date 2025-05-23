
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
import { fetchCarwashServiceList as fetchCarwashServiceListApi, filterCarwashes , fetchMealPlan,
   fetchFoodList as fetchFoodListApi, getUserById, getLoggedFoods, getLoggedWater, logWater, getWeeklyLoggedFoods } from '../api/user';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Modal } from 'react-native';
const logoImg = require('../../assets/logoo.png');
const cupImage = require('../../assets/cup.png');


const HomeScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width - 40;
  const [carwashList, setCarwashList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [foodList, setFoodList] = useState([]);
  const [loggedFood, setLoggedFood] = useState([]);
  const [cupSizeModalVisible, setCupSizeModalVisible] = useState(false);
const [selectedCupSize, setSelectedCupSize] = useState(250);
  const [nutrition, setNutrition] = useState({
    kcal: 0,
    fat: 0,
    protein: 0,
    carb: 0
  });
  
  const { token, logout, userInfo, setUserInfo } = useContext(AuthContext);

  const [healthData, setHealthData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.id) {
        fetchUserInfo();
        loadLoggedFoods(); 
        loadLoggedWaters();
        loadWeeklyLoggedFoods();
        // fetchFoodList();
      }
    }, [userInfo?.id])
  );

  
const fetchUserInfo = async () => {
  try {
    const fullUser = await getUserById(userInfo.id);
    // id-aar ni avah ym bndaa
    if (fullUser.healthInfo?.healthData) {
      setHealthData(fullUser.healthInfo.healthData);
    }
  } catch (error) {
    console.error("Хэрэглэгчийн health info авахад алдаа:", error);
  }
};

  // useEffect(() => {
  //   if (userInfo?.id) {
  //     fetchFoodList();
  //   }
  // }, [userInfo?.id]);
  
const [weeklyChartData, setWeeklyChartData] = useState({
  labels: [],
  datasets: [{ data: [] }]
});

const loadWeeklyLoggedFoods = async () => {
  try {
    const res = await getWeeklyLoggedFoods(userInfo.id);

    const labels = res.map(item => item.date.slice(5)); // 04-24
    const data = res.map(item => {
      const kcal = Number(item.totalKcal);
      return isFinite(kcal) && !isNaN(kcal) ? kcal : 0;
    });

    setWeeklyChartData({
      labels,
      datasets: [{ data }]
    });
  } catch (error) {
    console.error("Weekly food fetch error:", error);
  }
};


const cleanChartEntries = weeklyChartData.labels
  .map((label, i) => {
    const val = weeklyChartData.datasets[0].data[i];
    return (typeof label === 'string' && isFinite(val) && !isNaN(val))
      ? { label, value: val }
      : null;
  })
  .filter(item => item !== null);

const safeLabels = cleanChartEntries.map(item => item.label);
const safeData = cleanChartEntries.map(item => item.value);
console.log("Labels:", weeklyChartData.labels);
console.log("Raw data:", weeklyChartData.datasets[0].data);
console.log("Safe Labels:", safeLabels);
console.log("Safe Data:", safeData);


  const [loggedWaters, setLoggedWaters] = useState([]);
  const [totalWater, setTotalWater] = useState(0);
  
  // tuhain udurt burtgesen usnii hemjeeg avna.
  const loadLoggedWaters = async () => {
    try {
      const startDate = new Date().toISOString().split("T")[0];
      const res = await getLoggedWater(userInfo.id, startDate, startDate);
      setLoggedWaters(res);
  
      const total = res.reduce((sum, item) => sum + item.amount, 0);
      setTotalWater(total);
    } catch (error) {
      console.error("Water fetch error:", error);
    }
  };

  // tuhain udurt burtgesen usiig nemeh hasah zergeer update hiine
  const addWaterLog = async () => {
    try {
      await logWater(userInfo.id, selectedCupSize); // API call
      loadLoggedWaters(); // Refresh
    } catch (error) {
      console.error("Add water error:", error);
    }
  };
  
  const removeWaterLog = async () => {
    if (!userInfo?.id || totalWater === 0) return;
  
    try {
      await logWater(userInfo.id, -selectedCupSize); // сөрөг утгаар
      loadLoggedWaters(); // Refresh data
    } catch (error) {
      console.error("Remove water error:", error);
    }
  };
  

  const loadLoggedFoods = async () => {
    try {
      const startDate = new Date().toISOString().split("T")[0];
      console.log("startDate: "+startDate)
      console.log("id: "+userInfo.id )
      const res = await getLoggedFoods(userInfo.id, startDate, startDate);
      console.log("unuudur burtgegdsen hoolnuud: ", res)
      setLoggedFood(res); // set state to use in JSX

      // Тэжээлийн тооцоолол энд хийж болно
      const kcal = res.reduce((sum, f) => sum + f.food.calories, 0);
      const fat = res.reduce((sum, f) => sum + f.food.fat, 0);
      const protein = res.reduce((sum, f) => sum + f.food.protein, 0);
      const carb = res.reduce((sum, f) => sum + f.food.carb, 0);

      setNutrition({ kcal, fat, protein, carb });
    } catch (e) {
      console.error('Logged food fetch error:', e);
    }
  };
  
  useFocusEffect(
    useCallback(() => {

       
      loadLoggedFoods();
        if (userInfo?.id) {
          loadLoggedFoods();
        }
     
      
    }, [userInfo?.id])
  );

 

  // const handleViewAll = () => {
  //   fetchFoodList()
  //   navigation.navigate('MealPlan', { filteredList: foodList });
  // };
  const handleViewAll = (mealType) => {
    console.log("check mealType: ", mealType)
    // fetchFoodList(mealType);
    // navigation.navigate('MealPlan', { filteredList: foodList, mealType });
    navigation.navigate('MealPlan', {  mealType: mealType });
  };
  
  const getMealCalories = (mealType) => {
    const totalMap = {
      BREAKFAST: healthData?.dailyBreakfastCal ?? 0,
      LUNCH: healthData?.dailyLunchCal ?? 0,
      DINNER: healthData?.dailyDinnerCal ?? 0
    };
  
    const loggedMap = {
      BREAKFAST: loggedFood
        .filter(f => f.mealType === 'BREAKFAST')
        .reduce((sum, f) => sum + f.food.calories, 0),
      LUNCH: loggedFood
        .filter(f => f.mealType === 'LUNCH')
        .reduce((sum, f) => sum + f.food.calories, 0),
      DINNER: loggedFood
        .filter(f => f.mealType === 'DINNER')
        .reduce((sum, f) => sum + f.food.calories, 0),
    };
  
    return `${loggedMap[mealType]}/${totalMap[mealType]} ккал`;
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
            <Text style={styles.greeting}>Сайн уу, {userInfo.userName}!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
              <Ionicons name='notifications' style={styles.bellIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>Өнөөдөр</Text>

        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricValueGreen}>{nutrition.kcal ?? 0} ккал</Text>
              <Text style={styles.metricLabel}>Идсэн</Text>
            </View>

            <View style={styles.circularProgressContainer}>
            <AnimatedCircularProgress
              size={130}
              width={10}
              fill={
                healthData?.dailyCalories && healthData.dailyCalories > 0
                  ? (nutrition.kcal / healthData.dailyCalories) * 100
                  : 0
              }
              tintColor="#F4C92F"
              backgroundColor="#F0F0F0"
              lineCap="round"
            >
              {() => (
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.centerValue}>
                  {healthData?.dailyCalories - nutrition.kcal} 
                  </Text>
                  <Text style={styles.metricLabel}>ккал үлдсэн</Text>
                </View>
              )}
            </AnimatedCircularProgress>

            </View>

            <View style={styles.metricBlock}>
              <Text style={styles.metricValueGreen}>1 л</Text>
              {/* <Text style={styles.metricValueGreen}>
                {healthData?.dailyWaterIntake
                  ? `${(healthData.dailyWaterIntake / 1000).toFixed(1)} л`
                  : '...'}
              </Text> */}
              <Text style={styles.metricLabel}>Ус уусан</Text>
            </View>
          </View>

          <View style={styles.nutrientsRowHorizontal}>
            <View style={styles.nutrientBlockHorizontal}>
              <Text style={styles.nutrientLabelBold}>Өөх тос</Text>
              {/* <ProgressBar progress={0.43} color="#50B86C" style={styles.progressBar} />
              <Text style={styles.nutrientValue}>{nutrition.fat}/{fatGoal}</Text> */}
              <ProgressBar progress={
                healthData?.dailyFat
                  ? (nutrition.fat ?? 0) / healthData.dailyFat
                  : 0
              } color="#50B86C" style={styles.progressBar} />
              <Text style={styles.nutrientValue}>  {(nutrition.fat ?? 0).toFixed(1)}/{(healthData?.dailyFat ?? 0).toFixed(1)} г</Text>
            </View>
            <View style={styles.nutrientBlockHorizontal}>
              <Text style={styles.nutrientLabelBold}>Уураг</Text>
              {/* <ProgressBar progress={0.76} color="#50B86C" style={styles.progressBar} />
              <Text style={styles.nutrientValue}>200/264 г</Text> */}
              <ProgressBar progress={healthData?.dailyProtein?(nutrition.protein??0 )/ healthData.dailyProtein:0} color="#50B86C" style={styles.progressBar} />
              <Text style={styles.nutrientValue}>{(nutrition.protein ?? 0).toFixed(1)}/{(healthData?.dailyProtein??0).toFixed(1)} г</Text>
            </View>
            <View style={styles.nutrientBlockHorizontal}>
              <Text style={styles.nutrientLabelBold}>Нүүрс ус</Text>
              {/* <ProgressBar progress={0.83} color="#50B86C" style={styles.progressBar} />
              <Text style={styles.nutrientValue}>250/300 г</Text> */}
              <ProgressBar progress={healthData?.dailyCarb?(nutrition.carb ??0)/ healthData.dailyCarb:0} color="#50B86C" style={styles.progressBar} />
              <Text style={styles.nutrientValue}>{(nutrition.carb ?? 0).toFixed(1)}/{(healthData?.dailyCarb??0).toFixed(1)} г</Text>
            </View>
          </View>
        </View>

        <View style={styles.foodSection}>
        <Text style={styles.title}>Бүртгэгдсэн хоол</Text>

        {[
  {
    title: 'Өглөөний цай',
    icon: require('../../assets/breakfast.png'),
    mealType: 'BREAKFAST'
  },
  {
    title: 'Өдрийн хоол',
    icon: require('../../assets/lunch.png'),
    mealType: 'LUNCH'
  },
  {
    title: 'Оройн хоол',
    icon: require('../../assets/dinner.png'),
    mealType: 'DINNER'
  }
].map((item, index) => (
  <View key={index} style={styles.foodCard}>
    <View style={styles.foodLeft}>
      <Image source={item.icon} style={styles.foodIcon} />
      <View>
        <Text style={styles.foodTitle}>{item.title}</Text>
        <Text style={styles.foodKcal}>
          {getMealCalories(item.mealType)}
        </Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => handleViewAll(item.mealType)}>
      <Text style={styles.addIcon}>+</Text>
    </TouchableOpacity>
  </View>
))}



        </View>

        
        <Text style={styles.title}>Уусан ус</Text>
<View style={styles.card}>
  <View style={styles.waterRow}>
    <View>
      <Text style={styles.boldText}>
        {totalWater} мл / {healthData?.dailyWaterIntake ?? '...'} мл
      </Text>
      <Text style={styles.foodKcal}>
        Сүүлийнх: {loggedWaters.at(-1)?.loggedDate?.slice(11, 16) ?? '--:--'}
      </Text>
      <View style={styles.waterRow}>
        <TouchableOpacity style={styles.waterBtn} onPress={removeWaterLog}>
          <Text style={styles.waterBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.waterAmount}>{loggedWaters.length}</Text>
        <TouchableOpacity style={styles.waterBtn} onPress={addWaterLog}>
          <Text style={styles.waterBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.foodKcal}>
        {healthData?.dailyWaterIntake
          ? `${Math.max(0, Math.ceil((healthData.dailyWaterIntake - totalWater) / selectedCupSize))} аяга ус үлдсэн`
          : '...'}
      </Text>
    </View>

    <View style={styles.waterGlass}>
      <View style={[styles.waterFill, { height: `${Math.min((totalWater / (healthData?.dailyWaterIntake ?? 1)) * 100, 100)}%` }]}>
        <Text style={styles.waterPercent}>
          {Math.min((totalWater / (healthData?.dailyWaterIntake ?? 1)) * 100, 100).toFixed(0)}%
        </Text>
      </View>
    </View>
  </View>

  <View style={styles.waterRow}>
    <Text>Aяганы хэмжээ: {selectedCupSize} мл</Text>
    <TouchableOpacity onPress={() => setCupSizeModalVisible(true)}>
      <Text style={styles.linkText}>Аяганы хэмжээ тохируулах</Text>
    </TouchableOpacity>
  </View>

  <Modal
    visible={cupSizeModalVisible}
    transparent={true}
    animationType="fade"
    onRequestClose={() => setCupSizeModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Аяганы хэмжээ</Text>
        <View style={styles.cupOptions}>
          {[50, 100, 250, 400, 500, 1000].map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.cupButton,
                selectedCupSize === size && styles.selectedCupButton
              ]}
              onPress={() => {
                setSelectedCupSize(size);
                setCupSizeModalVisible(false);
              }}
            >
              <Image source={cupImage} style={styles.cupImage} />
              <Text style={styles.cupText}>{size} мл</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  </Modal>
</View>


<Text style={styles.title}>Таны 7 хоногийн үзүүлэлт</Text>
<View style={[styles.card, { marginBottom: 100 }]}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
    <Text style={{ color: '#000', fontSize:12, fontWeight:'bold' }}>
      {weeklyChartData.labels[0]} - {weeklyChartData.labels.at(-1)}
    </Text>
    <Text style={{ fontWeight: 'bold', color: '#1B1C1E', fontSize:16 }}>
      {weeklyChartData.datasets[0].data.filter(k => k > 0).length} өдөр бүртгэлтэй
    </Text>
  </View>
  {safeLabels.length === safeData.length && safeLabels.length > 0 ? (
  <LineChart
    data={{
      labels: safeLabels,
      datasets: [{ data: safeData }]
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
) : (
  <Text style={{ textAlign: 'center', padding: 16 }}>Өгөгдөл ачаалж байна...</Text>
)}


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
     
  },

  // Modal style
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center'
  },
  modalTitle: {
    color: '#000', 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  cupOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  cupImage: {
    width: 30,
    height: 40,
    marginBottom: 6,
  },
  cupButton: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    // backgroundColor: '#F9F9F9',
  },
  selectedCupButton: {
    backgroundColor: '#E0F3FF',
    borderColor: '#41ABF8',
  },
  cupText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000'
  }
  
  
});

export default HomeScreen;
