import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Header from '../components/Header';
import Button from '../components/Button';
import { SliderBox } from 'react-native-image-slider-box';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PricingInfo from '../components/PricingInfo';
import { ScrollView } from 'react-native';

const images = [
  require('../../assets/carwashApp2.jpg'),
  require('../../assets/carwashApp3.jpg'),
  require('../../assets/carwashApp2.jpg'),
  require('../../assets/carwashApp3.jpg'),
];

const CarwashDetailScreen = ({ route, navigation }) => {
  const { carwash } = route.params;
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const handleOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Order', { carwash, navigation });
    }, 1000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Header navigation={navigation} />
      <View>
        <View style={styles.imgContainer}>
          <Animated.View style={styles.carwashImgContainer} sharedTransitionTag={carwash.id.toString()}>
            <SliderBox
              images={images}
              sliderBoxHeight={400}
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              paginationBoxVerticalPadding={20}
              resizeMethod={'resize'}
              resizeMode={'cover'}
              ImageComponentStyle={styles.sliderBoxImage}
            />
          </Animated.View>
        </View>

        {/* <View style={styles.detailContainer}> */}
          <Animated.View entering={FadeIn.delay(600)} style={styles.textContainer}>
            <View style={styles.flex}>
              <Text style={styles.textName}>{carwash.name}</Text>
              <View style={styles.flexz}>
                <FontAwesome name='star' style={{ color: '#FFCC33', fontSize: 16, paddingHorizontal: 4 }} />
                <Text style={styles.paragraph}>{carwash.stars} (12 үнэлгээ)</Text>
              </View>
            </View>
            <Text style={styles.textLocation}>{carwash.location}</Text>
          </Animated.View>

      
        {/* </View> */}
      </View>
      <View  style={styles.priceInfo}>

        <PricingInfo carWashTypes={carwash.carWashTypes} />
      </View>
      <View style={styles.detailContainer}>

          <Animated.View entering={FadeInDown.delay(800)}>
            <Text style={styles.textDescription}>Бидний тухай</Text>
            <Text style={styles.text}>{carwash.description}</Text>
          </Animated.View>
      </View>
      <View style={styles.detailContainer}>

          <Animated.View entering={FadeInDown.delay(800)}>
           
            <View style={styles.flex}>
            <Text style={styles.textDescription}>Хаяг</Text>
            <Text style={styles.locationLink}>Газрын зураг дээр харах</Text>
            </View>
          </Animated.View>
      </View>
      
      <View style={styles.btnContainer}>
        <Button carwash={carwash} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    justifyContent: 'space-between',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  carwashImgContainer: {
    height: 280,
    overflow: 'hidden',
  },
  imgContainer: {
    alignItems: 'center',
  },
  detailContainer: {
    // marginLeft: 20,
    marginHorizontal:20,
    marginBottom:20
  },
  textContainer: {
    marginHorizontal:20,
    marginTop:20,
    // paddingTop: 16,
    borderRadius: 20,
  },
  priceInfo:{
    marginTop:20,
    marginHorizontal:20
  },
  textName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textLocation: {
    fontSize: 14,
  },
  textDescription: {
    color: '#323232',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#323232',
    fontSize: 16,
    textAlign: 'justify',
  },
  sliderBoxImage: {
    width: '100%',
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
  flex: {
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
  locationLink:{
    color:"#FE4B01"
  }
});

export default CarwashDetailScreen;
