import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, Linking, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getBookingStatus as getBookingStatusApi } from '../api/user';
import FastImage from 'react-native-fast-image';

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
      <View style={styles.section}>
        <Text style={styles.paragraph}>Угаалгын газрын нэр: {orderDetails?.name}</Text>
        <Text style={styles.paragraph}>Location: {orderDetails?.location}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraph}>Машины төрөл</Text>
        <Text style={styles.paragraph}>{orderDetails.carSize}</Text>
        <Text style={styles.paragraph}>Угаалгах төрөл</Text>
        <Text style={styles.paragraph}>{orderDetails.washType}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraph}>Угаалгах огноо</Text>
        <Text style={styles.paragraph}>{orderDetails.date}</Text>
        <Text style={styles.paragraph}>Цаг</Text>
        <Text style={styles.paragraph}>{orderDetails.date} - {orderDetails.endTime}</Text>
        <Text style={styles.paragraph}>Үнэ</Text>
        <Text style={styles.paragraph}>{orderDetails.price}</Text>
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
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#066BCF',
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default PaymentScreen;
