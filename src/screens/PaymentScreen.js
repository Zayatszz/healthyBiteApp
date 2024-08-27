import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, Linking, ActivityIndicator, Pressable } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getBookingStatus as getBookingStatusApi } from '../api/user';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const PaymentScreen = ({ route, navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const { invoiceResponse, orderDetails, bookingId } = route.params;

  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [qrCode, setQRCode] = useState("");

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
          navigation.reset({
            index: 0,
            routes: [{ name: 'MyOrders' }],
          });
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
       <View style={[styles.flexHeader]}>
        <Pressable onPress={() => navigation.goBack()}>
            <FontAwesome name='chevron-left' style={styles.icon} />
        </Pressable>
        <Text style={styles.headerTitle}>Захиалга хийх</Text>
      </View>
      <Text style={styles.title}>Таны захиалгын мэдээлэл</Text>
      <View style={[styles.section, styles.orderInfo]}>
        <View style={styles.flex}>
          <Text style={[styles.paragraph, styles.flex1]} >Нэр </Text>
          <Text style={styles.paragraph}>{orderDetails?.name}k</Text>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.paragraph, styles.flex1]} >Байршил </Text>
          <Text style={styles.paragraph}>{orderDetails?.location}k</Text>
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
          <Text style={[styles.paragraph, styles.flex1]} >Захиалсан цаг </Text>
          <Text style={styles.paragraph}>{orderDetails.date} - {orderDetails.endTime}</Text>
        </View>
       
      </View>
      <View style={[styles.section, styles.orderInfo]}>
        <View style={styles.flex}>
          <Text style={[styles.paragraph, styles.flex1]} >Үнийн мэдээлэл </Text>
          <Text style={styles.paragraph}>{orderDetails?.name}k</Text>
        </View>
       
       
      </View>
  
      <View style={styles.section}>
        <Text style={styles.paragraph}>Банкны qpay үйлчилгээ ашиглан төлбөр төлөх холбоосууд харагдана.</Text>
        {qrCode ? (
          // <Image source={{ uri: qrCode }} style={styles.qrCode} />
          <FastImage source={{ uri: qrCode }} style={styles.qrCode} />
        ) : (
          <Text>Loading QR Code...</Text>
        )}
      </View>
      <View style={styles.containerUrls}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    backgroundColor: '#F4F6F9',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius:12
  },
  orderInfo:{
    borderWidth:1,
    borderColor:"#000",
    
  },
  title: {
    paddingHorizontal:20,
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    paddingBottom:10
  },
 
  paragraph: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000"
  },
  flex: {
    padding: 5,
    // paddingHorizontal: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: "",
    alignItems: 'center',

    
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
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemContainer: {
    width: '33%',
    alignItems: 'center',
    marginTop: 40,
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
    color: '#fff',
  },
});

export default PaymentScreen;
