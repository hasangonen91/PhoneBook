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

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const validationSchema = yup.object().shape({
    phone: yup
      .string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleLogin = values => {
    navigation.navigate('PhoneBookScreen', values);
    console.log('Values:', values);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.helloHeader}>
          <Text style={styles.welcomeText}>Phone Book!</Text>
          <ContactSvg width={width * 0.15} height={height * 0.1} />
        </View>

        <Formik
          initialValues={{
            email: '',
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
                    <Text style={styles.buttonText}>Login</Text>
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

export default LoginScreen;

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
    height: height * 0.35,
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
