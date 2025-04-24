import React, { useState, useEffect,useCallback, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { fetchUserOrders as fetchUserOrdersApi } from '../api/user';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FlexHeader from '../components/FlexHeader';
import Switch from '../components/Switch';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; 
import RegisteredMeals from '../components/RegisteredMeals';
import { LineChart } from 'react-native-chart-kit';
import { getLoggedFoods, getLoggedWater } from '../api/user';
import { useFocusEffect } from '@react-navigation/native';
const StatisticsScreen = ({ navigation }) => {

    const screenWidth = Dimensions.get('window').width - 40;
  const { userInfo } = useContext(AuthContext);
  const [isSuccessful, setIsSuccessful] = useState(true);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  
  const [weeklyWaterData, setWeeklyWaterData] = useState([]);

  const [groupedMeals, setGroupedMeals] = useState([]);
const [weeklyCalories, setWeeklyCalories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      console.log("orj bnuda")
      if (userInfo?.id && startDate && endDate) {
        fetchGroupedMealsDirect();
        fetchWeeklyWater();
      }
    }, [startDate, endDate, userInfo?.id])
  );



const fetchGroupedMealsDirect = async (customStartDate, customEndDate) => {
  try {
    const start = moment(customStartDate || startDate).format('YYYY-MM-DD');
    const end = moment(customEndDate || endDate).format('YYYY-MM-DD');

    console.log("📅 Fetch range:", start, "to", end);

    const foods = await getLoggedFoods(userInfo.id, start, end);

    const grouped = {};
    const dailyKcal = {};

    foods.forEach(log => {
      const date = log.loggedDate.slice(0, 10);
      const type = log.mealType === 'BREAKFAST' ? 'Өглөө'
                  : log.mealType === 'LUNCH' ? 'Өдөр'
                  : 'Орой';

      if (!grouped[date]) grouped[date] = { Өглөө: [], Өдөр: [], Орой: [] };
      grouped[date][type].push({
        id: log.food.id,
        name: log.food.nameMn,
        kcal: log.food.calories,
        time: `${log.food.cookingTime} мин`,
        image: { uri: log.food.image }
      });

      dailyKcal[date] = (dailyKcal[date] || 0) + log.food.calories;
    });

    const result = Object.entries(grouped).map(([date, meals]) => ({ date, meals }));
    const calorieArray = Object.entries(dailyKcal).map(([date, kcal]) => ({ date, kcal }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setGroupedMeals(result);
    setWeeklyCalories(calorieArray);
  } catch (err) {
    console.error('fetchGroupedMeals error:', err);
  }
};

const fetchWeeklyWater = async (customStartDate, customEndDate) => {
  try {
    const start = moment(customStartDate || startDate).format('YYYY-MM-DD');
    const end = moment(customEndDate || endDate).format('YYYY-MM-DD');

    const res = await getLoggedWater(userInfo.id, start, end); // таны API-г ашиглана

    const dailyTotals = {};
    res.forEach(entry => {
      const date = entry.loggedDate.slice(0, 10);
      dailyTotals[date] = (dailyTotals[date] || 0) + entry.amount;
    });

    const sorted = Object.entries(dailyTotals)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setWeeklyWaterData(sorted);
  } catch (error) {
    console.error("Water filter error:", error);
  }
};


  const [routes] = useState([
    { key: 'successful', title: 'Амжилттай' },
    { key: 'unsuccessful', title: 'Амжилтгүй' },
  ]);
 
  
  const SuccessfulOrders = () => (
    <View style={styles.tabContainer}>
      {/* <FlatList
        data={orders.filter(order => order.status === 'paid')}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  );

  const UnsuccessfulOrders = () => (
    <View style={styles.tabContainer}>
      {/* <FlatList
        data={orders.filter(order => order.status !== 'paid')}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  );

  const renderScene = SceneMap({
    successful: SuccessfulOrders,
    unsuccessful: UnsuccessfulOrders,
  });

  const onStartChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      setStartDate(selectedDate); // ⬅️ Заавал шинэ Date болго
    }
    // fetchGroupedMealsDirect(selectedDate, endDate);
    // fetchWeeklyWater(selectedDate, endDate)
  };
  
  const onEndChange = (event, selectedDate) => {
    setShowEndPicker(false);
    console.log("startDate: ",selectedDate)
    if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      setEndDate(selectedDate); // ⬅️ Заавал шинэ Date болго
    }
  };
  
  
  

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
 <View style={styles.container}>
      <FlexHeader headerText={"Миний үзүүлэлтүүд"} navigation={navigation}/>
      <Switch isSuccessful={isSuccessful} setIsSuccessful={setIsSuccessful}/>
      <View style={styles.tabContainer}>
      <View style={styles.dateContainer}>
  <TouchableOpacity style={styles.dateBox} onPress={() => setShowStartPicker(true)}>
    <Text style={styles.dateText}>{moment(startDate).format('MM/DD/YYYY')}</Text>
  </TouchableOpacity>
  <Text style={styles.dash}>—</Text>
  <TouchableOpacity style={styles.dateBox} onPress={() => setShowEndPicker(true)}>
    <Text style={styles.dateText}>{moment(endDate).format('MM/DD/YYYY')}</Text>
  </TouchableOpacity>
</View>

{showStartPicker && (
  <DateTimePicker
    value={startDate}
    mode="date"
    display="default"
    onChange={onStartChange}
  />
)}
{showEndPicker && (
  <DateTimePicker
    value={endDate}
    mode="date"
    display="default"
    onChange={onEndChange}
  />
)}


      <>
      {isSuccessful && (
        <View>
 
         

       
              <Text style={styles.title}>Бүртгэгдсэн хоол</Text>
              
             <RegisteredMeals groupedMeals={groupedMeals} />

             <Text style={styles.title}>Хоолны калори</Text>

             <View style={[styles.card, ]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ color: '#000', fontSize:12, fontWeight:'bold' }}>2024/10/22-26</Text>
            {/* <Text style={{ fontWeight: 'bold', color: '#1B1C1E', fontSize:16 }}>7 Бүртгэл</Text> */}
          </View>
      
          {weeklyCalories && weeklyCalories.length > 0 ? (
  <LineChart
    data={{
      labels: weeklyCalories.map(item => moment(item.date).format('MM/DD')),
      datasets: [{ data: weeklyCalories.map(item => item.kcal) }]
    }}
    width={screenWidth - 40}
    height={200}
    chartConfig={{
      backgroundColor: '#fff',
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(65, 171, 248, ${opacity})`,
      labelColor: () => '#000',
      propsForDots: { r: '4', strokeWidth: '2', stroke: '#4BC0C0' },
    }}
    bezier
    style={{ borderRadius: 8 }}
  />
) : (
  <View style={{ padding: 20, alignItems: 'center' }}>
    <Text style={{ color: '#888', fontSize: 14 }}>Мэдээлэл олдсонгүй</Text>
  </View>
)}

          <View style={styles.chartFooter}>
  <Text style={styles.chartLabel}>Дундаж калори</Text>
  <Text style={styles.chartValue}>1800 ккал</Text>
</View>

        </View>
        <Text style={styles.title}>Жингийн үзүүлэлт</Text>

<View style={[styles.card, {marginBottom:120}]}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
    <Text style={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>2025/03/01 - 2025/03/07</Text>
    {/* <Text style={{ fontWeight: 'bold', color: '#1B1C1E', fontSize: 16 }}>7 Хэмжилт</Text> */}
  </View>

  <LineChart
    data={{
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [
        {
          data: [62.3, 62.1, 61.9, 62.0, 61.8, 61.7, 61.5], // kg
        },
      ],
    }}
    width={screenWidth - 40}
    height={200}
    chartConfig={{
      backgroundColor: '#fff',
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 1,
      color: (opacity = 1) => `rgba(106, 194, 158, ${opacity})`, // Greenish
      labelColor: () => '#000',
      propsForDots: {
        r: '4',
        strokeWidth: '2',
        stroke: '#6AC29E',
      },
    }}
    bezier
    style={{ borderRadius: 8 }}
  />

  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
    <Text style={{ fontSize: 14, color: '#6D7074' }}>Дундаж жин</Text>
    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>61.8 кг</Text>
  </View>
</View>

    
        </View>
        
  
)}
{!isSuccessful && (
  <View style={[{marginTop:20}]}>
    <Text style={styles.title}>Бүртгэгдсэн ус</Text>

    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>2025/03/01 - 2025/03/07</Text>
        {/* <Text style={{ fontWeight: 'bold', color: '#1B1C1E', fontSize: 16 }}>7 Өдөр</Text> */}
      </View>

      {/* <LineChart
        data={{
          labels: ['1', '2', '3', '4', '5', '6', '7'],
          datasets: [
            {
              data: [1200, 1000, 1350, 1100, 1250, 1400, 1300], // ус мл
            },
          ],
        }}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(77, 133, 255, ${opacity})`,
          labelColor: () => '#000',
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#4D85FF',
          },
        }}
        bezier
        style={{ borderRadius: 8 }}
      /> */}
      {weeklyWaterData.length > 0 ? (
        <LineChart
          data={{
            labels: weeklyWaterData.map(item => moment(item.date).format('MM/DD')),
            datasets: [{ data: weeklyWaterData.map(item => item.amount) }]
          }}
          width={screenWidth - 40}
          height={200}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(77, 133, 255, ${opacity})`,
            labelColor: () => '#000',
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#4D85FF',
            },
          }}
          bezier
          style={{ borderRadius: 8 }}
        />
      ) : (
        <Text style={{ textAlign: 'center', padding: 16 }}>Мэдээлэл олдсонгүй</Text>
      )}

      <View style={styles.chartFooter}>
        <Text style={styles.chartLabel}>Дундаж усны хэмжээ</Text>
        <Text style={styles.chartValue}>
          {weeklyWaterData.length > 0
            ? `${Math.round(weeklyWaterData.reduce((a, b) => a + b.amount, 0) / weeklyWaterData.length)} мл`
            : '---'}
        </Text>
      </View>
   
 
      {/* <View style={styles.chartFooter}>
        <Text style={styles.chartLabel}>Дундаж усны хэмжээ</Text>
        <Text style={styles.chartValue}>1230 мл</Text>
      </View> */}
    </View>
  </View>
)}


    </>
    </View>
    </View>
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#171532' },
 
  tabBar: {
    backgroundColor: '#ffffff',
    paddingVertical: 5,
  },
  indicator: {
    backgroundColor: '#FFD700',
    height: 5,
    borderRadius: 10,
  },
  labelStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabContainer: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingTop: 16,
  },
  orderContainer: {
    backgroundColor: '#F4F6F9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 4,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orderDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },

  dayContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    color: '#000',
  },
  mealTimeText: {
    fontSize: 13,
    color: '#6D7074',
    fontWeight: '600',
    marginVertical: 6,
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
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
  chartFooter: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  chartLabel: {
    fontSize: 14,
    color: '#6D7074',
    fontWeight: '500',
  },
  
  chartValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },
  foodName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  foodDetail: {
    fontSize: 12,
    color: '#6D7074',
  },


  dateContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F6F9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    padding: 12,
    // paddingHorizontal:16,
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
  },
  dateBox: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 36,
    borderRadius: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#6D7074',
    fontWeight: '500',
  },
  dash: {
    marginHorizontal: 12,
    fontSize: 24,
    color: '#999',
  }
  
});

export default StatisticsScreen;

