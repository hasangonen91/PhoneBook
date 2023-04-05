import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import ContactSvg from '../../assets/Svg/contacts.svg';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        animated={true}
        backgroundColor="#0074D9"
        translucent={true}
      />
      <View style={styles.logoContainer}>
        <ContactSvg width={width * 0.5} height={height * 0.5} />
      </View>
      <View style={{height: height * 0.05}} />
      <View style={styles.paragraphContainer}>
        <Text style={styles.text}>Phone Book </Text>
        <Text style={styles.paragraph}>
          A simple phone book app that allows you to store your contacts and
          their details.
        </Text>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // navigation.navigate("PhoneBookScreen");
              navigation.navigate('RegisterScreen');

              console.log('LoginScreen');
            }}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        <View style={{flexDirection:"row",marginTop:height*0.02}}>
          <Text style={{color: '#0074D9', fontSize: 16, fontWeight: 'bold'}}>
              Do you have a account?{'\t'}
            </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginScreen');
              console.log('PhoneBookScreen');
            }}>
          
            <Text style={{color: '#0074D9', fontSize: 16, fontWeight: 'bold'}}>
              Login
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.41,
    height: height * 0.205,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderRadius: 150,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: height * 0.05,
    marginTop: height * 0.05,
  },
  text: {
    fontSize: 30,
    fontWeight: '900',
    color: '#0074D9',
  },

  paragraphContainer: {
    width: width * 0.95,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },

  bodyContainer: {
    width: width * 0.95,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width * 0.8,
    height: height * 0.1,
    borderRadius: 30,
    backgroundColor: '#0074D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
