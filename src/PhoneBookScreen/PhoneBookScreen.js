import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import PhoneCallSvg from '../../assets/Svg/phonecall.svg';
import UserSvg from '../../assets/Svg/user.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from 'axios';

const {width, height} = Dimensions.get('window');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const jwtToken =
  'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEyMzIxMzEiLCJmaXJzdE5hbWUiOiJ5YXNpbiIsImxhc3ROYW1lIjoiYWt5dXoiLCJfaWQiOiI2NDJjN2VlYzZhNDE3N2Y0YzkzM2M2ZjIiLCJpYXQiOjE2ODA2ODg2MDB9.z9OOlpCX_TQTPYgnTwOkTdH7SKtPKAGwTbrzSXpW6xE';

const PhoneBookScreen = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rehberData, setRehberData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.108:3000/contact', {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEyMzIxMzEiLCJmaXJzdE5hbWUiOiJ5YXNpbiIsImxhc3ROYW1lIjoiYWt5dXoiLCJfaWQiOiI2NDJjN2VlYzZhNDE3N2Y0YzkzM2M2ZjIiLCJpYXQiOjE2ODA2ODg2MDB9.z9OOlpCX_TQTPYgnTwOkTdH7SKtPKAGwTbrzSXpW6xE',
        },
      });
      setRehberData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const [firstName, setName] = useState('');
  const [lastName, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleAddUser = async () => {
    if (!firstName || !lastName || !phone) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };

    try {
      const response = await axios.post(
        'http://192.168.1.108:3000/contact/add',
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: jwtToken,
          },
        },
      );
      const {data} = response;
      console.log(data);
      const newData = [...rehberData, data];
      newData.sort((a, b) => a.firstName.localeCompare(b.firstName));
      setRehberData(newData);
      setIsFormOpen(false);
      setName('');
      setSurname('');
      setPhone('');
      Alert.alert('Success', 'New contact added successfully.');
    } catch (error) {
      console.log('3 :', error);
      Alert.alert('Error', 'Could not add contact. Please try again later.');
    }
  };

  const handlePlusButtonPress = () => {
    setIsFormOpen(true);
  };
  const handleSearchTextChange = text => {
    setSearchText(text);
  };

  const handleAlphabetPress = letter => {
    const index = rehberData.findIndex(item =>
      item.firstName.startsWith(letter),
    );
    if (index !== -1) {
      flatListRef.current.scrollToIndex({index});
    }
  };

  const flatListRef = React.useRef();
  const [modalVisible, setModalVisible] = useState(false);

  const sortedData = rehberData.sort((a, b) =>
    a.firstName.localeCompare(b.firstName),
  );

  const searchdData = sortedData.filter(item => {
    const itemData = `${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()}`;
    const textData = searchText.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });


  
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://192.168.1.108:3000/contact/delete?id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwtToken,
        },
      });
      const newData = rehberData.filter((item) => item.id !== id);
      setRehberData(newData);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  

  const [modalData, setModalData] = useState({});

  const handleSaveChanges = () => {
    const index = rehberData.findIndex(item => item.id === modalData.id);
    const newData = [...rehberData];
    newData[index] = modalData;
    setRehberData(newData);
    setModalVisible(false);
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          setModalData(item);
          setModalVisible(true);
        }}
        style={styles.itemLeft}>
        <UserSvg width={width * 0.14} height={height * 0.07} />
      </TouchableOpacity>

      <View style={styles.itemLeft}>
        <Text style={styles.itemText}>{item.firstName}</Text>
        <Text style={styles.itemText}>{item.lastName}</Text>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.itemText}>{item.phone}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel:${item.phone}`);
        }}>
        <PhoneCallSvg width={width * 0.12} height={height * 0.06} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={`Search People ${rehberData?.length}`}
          value={searchText}
          onChangeText={handleSearchTextChange}
          style={styles.searchInput}
        />
        <TouchableOpacity
          onPress={() => setSearchText('')}
          style={{marginLeft: 10}}>
          <AntDesign firstName="close" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <Modal visible={isFormOpen} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalHeaderText}>Add New Contact</Text>
            <TextInput
              placeholder="Name"
              value={firstName}
              onChangeText={setName}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Surname"
              value={lastName}
              onChangeText={setSurname}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
              style={styles.modalInput}
            />
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#0476D0'}]}
              onPress={handleAddUser}>
              <Text style={styles.buttonText}>Add User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'gray'}]}
              onPress={() => setIsFormOpen(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.alphabetContainer}>
        <FlatList
          ref={flatListRef}
          data={searchdData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.itemText}>No results found.</Text>
          }
        />
        <View style={styles.alphabetListContainer}>
          {alphabet.split('').map(letter => (
            <TouchableOpacity
              key={letter}
              onPress={() => handleAlphabetPress(letter)}>
              <Text style={styles.alphabetListText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalHeaderText}>Contact Information</Text>
            <TextInput
              placeholder="Name"
              value={modalData.firstName}
              onChangeText={text =>
                setModalData({...modalData, firstName: text})
              }
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Surname"
              value={modalData.lastName}
              onChangeText={text =>
                setModalData({...modalData, lastName: text})
              }
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Phone Number"
              value={modalData.phone}
              onChangeText={text => setModalData({...modalData, phone: text})}
              keyboardType="numeric"
              style={styles.modalInput}
            />

            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#DC143C'}]}
              onPress={handleDeleteUser}>
              <Text style={styles.buttonText}>Delete User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'green'}]}
              onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'gray'}]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={handlePlusButtonPress}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#D1D1D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInputContainer: {
    width: width * 0.9,
    height: height * 0.7,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },

  modalInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: height * 0.016,
    width: width * 0.8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  button: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    width: width * 0.7,
    height: height * 0.07,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  alphabetContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  alphabetListContainer: {
    width: width * 0.1,
    height: height * 0.82,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  alphabetListText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alphabetText: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
    height: height * 0.08,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: height * 0.016,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#000',
    width: width * 0.8,
    height: height * 0.06,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  plusButton: {
    position: 'absolute',
    bottom: height * 0.05,
    right: width * 0.08,
    width: width * 0.18,
    height: height * 0.09,
    backgroundColor: '#0074D9',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.85,
    height: height * 0.08,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: height * 0.008,
  },
  itemText: {
    fontSize: 18,
    textAlign: 'center',
  },
  itemLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  itemRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  plusButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});
