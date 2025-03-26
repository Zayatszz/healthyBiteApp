import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, Linking, ActivityIndicator, Pressable } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getBookingStatus as getBookingStatusApi } from '../api/user';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FlexHeader from '../components/FlexHeader';
import { format } from 'date-fns';
import { fetchCarwashService } from '../api/user';
import Feather from 'react-native-vector-icons/Feather';
const PaymentScreen = ({ route, navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const { invoiceResponse, orderDetails, bookingId } = route.params;

  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [qrCode, setQRCode] = useState("");
  const [carwashService, setCarwashService] = useState({});

  useEffect(() => {
    fetchcarwashService();
  }, [orderDetails]);

  const fetchcarwashService = async () => {
    try {
      const data = await fetchCarwashService(orderDetails.CarWashService);
      setCarwashService(data);
    } catch (error) {
      console.error('Failed to fetch carwashService:', error);
    }
  };
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        console.log("Checking booking status for booking ID:", bookingId);
        const bookingStatus = await getBookingStatusApi(bookingId);
        console.log("Booking status:", bookingStatus);
        if (bookingStatus === "paid") {
          Alert.alert("Төлбөр амжилттай төлөгдлөө.");
          setPaymentStatus("paid");
          clearInterval(interval);
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'MyOrders' }],
          // });
        }
      } catch (error) {
        console.error("Error checking booking status:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [bookingId]);

  useEffect(() => {
    if (invoiceResponse && invoiceResponse.qrCode) {
      try {
        const qrDataUrl = `data:image/png;base64,${invoiceResponse.qrCode.qr_image}`;
        setQRCode(qrDataUrl);
      } catch (error) {
        console.error("Error decoding QR code:", error);
      }
    }
    setLoading(false); // Set loading to false after the QR code is set
  }, [invoiceResponse]);

  return (
    <ScrollView style={styles.container}>
      <FlexHeader headerText={'Төлбөр төлөх'} navigation={navigation}/>
      <Text style={styles.title}>Таны захиалгын мэдээлэл</Text>

      <View style={[styles.section, styles.orderInfo]}>
        <View style={styles.flex}>
          <Text style={[styles.paragraph, styles.flex1]} >Нэр </Text>
          <Text style={styles.paragraph}>{carwashService.name}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.paragraph, styles.flex1]} >Байршил </Text>
          <Text style={styles.paragraph}>{carwashService.location}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.paragraph, styles.flex1]} >Угаалгах машин </Text>
          <Text style={styles.paragraph}>{orderDetails?.carSize}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.paragraph, styles.flex1]} >Угаалгах төрөл </Text>
          <Text style={styles.paragraph}>{orderDetails?.washType}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.paragraph, styles.flex1]} >Захиалсан өдөр </Text>
          <Text style={styles.paragraph}>{format(new Date(orderDetails.scheduledTime), 'yyyy-MM-dd')}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.paragraph, styles.flex1]} >Захиалсан цаг </Text>
          <Text style={styles.paragraph}>{new Date(orderDetails.scheduledTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(orderDetails.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
        </View>
        <View>
          <Text style={styles.priceInfo}>{orderDetails.price}₮</Text>
        </View>
      </View>
      <View style={[styles.warningSection]}>
        <View style={styles.flex}>
          <Feather name="alert-circle" style={[styles.icon ]}/>
          <Text style={[styles.warningText]} >Та төлбөрөө зөвхөн Qpay ашиглан төлнө үү.</Text>
       
        </View>
        <View style={styles.flex}>
           <Feather name="alert-circle" style={[styles.icon ]}/>
          <Text style={[styles.warningText]} >Захиалга цуцлах боломжгүй тул сонголтоо зөв хийнэ үү. </Text>
        </View>
       
      
      </View>
    
      <View style={styles.containerUrls}>
      <Text style={styles.titleSub}>Банкны qpay үйлчилгээ ашиглан төлбөр төлөх холбоосууд</Text>
     
     
        {invoiceResponse.qrCode && invoiceResponse.qrCode.urls && invoiceResponse.qrCode.urls.map((url, index) => (
          <View key={index} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => Linking.openURL(url.link)}>
              <Image source={{ uri: url.logo }} style={styles.image} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {loading && (
        <ActivityIndicator size="large" color="#FFF" style={styles.loadingIndicator} />
      )}
       <View>
      {qrCode ? (
          <Image source={{ uri: qrCode }} style={styles.qrCode} />
        ) : (
          <Text>Loading QR Code...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  section: {
    backgroundColor: '#F4F6F9',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    paddingTop:16,
    borderRadius:12
  },
  warningSection:{
    backgroundColor: '#F4F6F9',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    paddingTop:16,
    borderRadius:12
  },
  orderInfo:{

    backgroundColor:"#fff",
 
     shadowColor: '#C5C5C5',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.8,
     shadowRadius: 3.84,
     elevation: 5,
    // borderWidth:1,
    // borderColor:"#000",
    
  },
  title: {
    paddingHorizontal:20,
    paddingTop:24,
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    
  },
  titleSub:{
    paddingHorizontal:24,
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign:'center'
  }
 ,
  paragraph: {
    fontSize: 16,
    lineHeight:30,
    color: "#000",
    fontWeight:'450'
  },
  warningText:{
    fontSize: 14,
    lineHeight:20,
    color: "#D90000",
    paddingLeft:8,
   
  },
  priceInfo:{
    fontSize:16,
    color:"#000",
    fontWeight:"500",
     textAlign:'center',
     paddingTop:24
  },
  flex: {
    padding: 5,
    // paddingHorizontal: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: "",
    // alignItems: 'center',
  },

  flex1:{
    width:"50%"
  },
  
  qrCode: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  containerUrls: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemContainer: {
    width: '33%',
    alignItems: 'center',
    marginTop: 24,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 9,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  flexHeader: {
    padding: 15,
    // paddingBottom:15,
    paddingHorizontal:30,
    paddingRight:20,
    backgroundColor: '#033669',
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:20
  
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft:20,
    color: '#fff',
  },
  icon: {
    fontSize: 20,
    borderRadius: 50,
    color:"#D90000",
    // paddingTop:4
   
  },
});

export default PaymentScreen;
