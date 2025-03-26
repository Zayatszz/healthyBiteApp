import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Header from '../components/Header';
import Button from '../components/Button';
import { SliderBox } from 'react-native-image-slider-box';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import PricingInfo from '../components/PricingInfo';
import { ScrollView } from 'react-native';
import Maps from '../components/Maps';


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
                <Text style={styles.ratingText}>{carwash.stars} (12 үнэлгээ)</Text>
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
            <Text style={styles.textName}>Бидний тухай</Text>
            <Text style={styles.text}>{carwash.description}</Text>
          </Animated.View>
      </View>
      <View style={styles.detailContainer}>

          <Animated.View entering={FadeInDown.delay(800)}>
           
            <View style={styles.flex}>
            <Text style={styles.textName}>Хаяг</Text>
            <Text style={styles.locationLink}>Газрын зураг дээр харах</Text>
            </View>
            <View style={styles.bottom} />

            <View style={styles.flexz}>
              <EvilIcons name='location' style={styles.locationIcon} />
              <Text style={styles.textLocation}>{carwash.location}</Text>
            </View>
            <Maps/>
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
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  ratingText:{
    color: '#8B8E95',
    fontSize: 12,
    fontWeight: '600',
  },
  textLocation: {
    fontSize: 12,
    color:'#8B8E95'
  },

  text: {
    color: '#323232',
    fontSize: 14,
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
    paddingBottom:10,
    // paddingVertical:10
    // padding: 5,
    // alignItems: 'center',
  },
  locationLink:{
    color:"#FE4B01"
  },
  bottom: {
    flex: 0.3,
    borderColor:"#E0E0E0",
    borderWidth: 0.5,
    marginVertical:10,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  locationIcon:{
    fontSize:20,
    color:"#FE4B01"
  }
});

export default CarwashDetailScreen;
