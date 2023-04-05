import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
import ContactSvg from '../../assets/Svg/contacts.svg';

import axios from 'axios';

const {width, height} = Dimensions.get('window');

const RegisterScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup
      .string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleLogin = async values => {
    try {
      const response = await axios.post('http://192.168.1.108:3000/auth/register', {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        password: values.password,
      });
      console.log('Response:', response.data);
      navigation.navigate('PhoneBookScreen');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.helloHeader}>
          <Text style={styles.welcomeText}>Join Phone Book!</Text>
          <ContactSvg width={width * 0.15} height={height * 0.1} />
        </View>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phone: '',
            password: '',
          }}
          onSubmit={handleLogin}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  autoCapitalize="words"
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.error}>{errors.firstName}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  autoCapitalize="words"
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.error}>{errors.lastName}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eye}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      name={showPassword ? 'md-eye-off' : 'md-eye'}
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: height * 0.05,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: height * 0.45,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: height * 0.016,
    width: width * 0.8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  error: {
    color: '#FF0000',
    marginBottom: height * 0.016,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    width: width * 0.8,
    height: height * 0.08,
    borderRadius: 30,
    backgroundColor: '#0074D9',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    width: width * 0.8,
    borderRadius: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputPassword: {
    padding: height * 0.016,
    width: width * 0.65,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  eye: {
    position: 'absolute',
    right: width * 0.05,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  helloHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: width * 0.9,
  },
});
