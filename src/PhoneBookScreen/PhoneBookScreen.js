import React, {useState} from 'react';
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

const {width, height} = Dimensions.get('window');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const PhoneBookScreen = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rehberData, setRehberData] = useState([
    { id: '1', name: 'Ahmet', surname: 'Yılmaz', phone: '555-123-4567' },
    { id: '2', name: 'Ayşe', surname: 'Kara', phone: '555-234-5678' },
    { id: '3', name: 'Ali', surname: 'Güneş', phone: '555-345-6789' },
    { id: '4', name: 'Cemal', surname: 'Kaya', phone: '555-456-7890' },
    { id: '5', name: 'Deniz', surname: 'Çelik', phone: '555-567-8901' },
    { id: '6', name: 'Ebru', surname: 'Yıldız', phone: '555-678-9012' },
    { id: '7', name: 'Fatih', surname: 'Kılıç', phone: '555-789-0123' },
    { id: '8', name: 'Gül', surname: 'Doğan', phone: '555-890-1234' },
    { id: '9', name: 'Hakan', surname: 'Aydın', phone: '555-901-2345' },
    { id: '10', name: 'İpek', surname: 'Şahin', phone: '555-012-3456' },
    { id: '11', name: 'Jale', surname: 'Kurt', phone: '555-123-4567' },
    { id: '12', name: 'Kadir', surname: 'Erdoğan', phone: '555-234-5678' },
    { id: '13', name: 'Lale', surname: 'Duru', phone: '555-345-6789' },
    { id: '14', name: 'Mehmet', surname: 'Turan', phone: '555-456-7890' },
    { id: '15', name: 'Nevin', surname: 'Bakır', phone: '555-567-8901' },
    { id: '16', name: 'Ozan', surname: 'Taş', phone: '555-678-9012' },
    { id: '17', name: 'Pınar', surname: 'Köse', phone: '555-789-0123' },
    { id: '18', name: 'Rıdvan', surname: 'Kurtulmuş', phone: '555-890-1234' },
    { id: '19', name: 'Sibel', surname: 'Arslan', phone: '555-901-2345' },
    { id: '20', name: 'Tolga', surname: 'Can', phone: '555-012-3456' },
    { id: '21', name: 'Uğur', surname: 'Gül', phone: '555-123-4567' },
    { id: '22', name: 'Veli', surname: 'Toprak', phone: '555-234-5678' },
    { id: '23', name: 'Yüksel', surname: 'Akar', phone: '555-345-6789' },
    { id: '24', name: 'Zeynep', surname: 'Koç', phone: '555-456-7890' },

  ]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [searchText, setSearchText] = useState('');
  const handleAddUser = () => {
    if (!name || !surname || !phone) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    const newUser = {
      id: Math.random().toString(),
      name,
      surname,
      phone,
    };
    const newData = [...rehberData, newUser];

    newData.sort((a, b) => a.name.localeCompare(b.name));

    setRehberData(newData);

    setIsFormOpen(false);
    setName('');
    setSurname('');
    setPhone('');
    Alert.alert('Başarılı', 'Yeni kişi başarıyla eklendi.');
  };
  const handlePlusButtonPress = () => {
    setIsFormOpen(true);
  };
  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  const filteredData = rehberData.filter(item => {
    const fullName = item.name + ' ' + item.surname;
    return fullName.toLowerCase().includes(searchText.toLowerCase());
  });
  const handleAlphabetPress = letter => {
    const index = rehberData.findIndex(item => item.name.startsWith(letter));
    if (index !== -1) {
      flatListRef.current.scrollToIndex({index});
    }
  };
  const flatListRef = React.useRef();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteUser = () => {
    const newData = rehberData.filter(item => item.id !== modalData.id);
    setRehberData(newData);
    setModalVisible(false);
  };

  const [modalData, setModalData] = useState({});

  const handleSaveChanges = () => {
    const newData = rehberData.map(item => {
      if (item.id === modalData.id) {
        return modalData;
      }
      return item;
    });
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
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>{item.surname}</Text>
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
          placeholder="Search People..."
          value={searchText}
          onChangeText={handleSearchTextChange}
          style={styles.searchInput}
        />
        <TouchableOpacity
          onPress={() => setSearchText('')}
          style={{marginLeft: 10}}>
          <AntDesign name="close" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <Modal visible={isFormOpen} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalHeaderText}>Add New Contact</Text>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Surname"
              value={surname}
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
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No results found.</Text>}
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
              value={modalData.name}
              onChangeText={text => setModalData({...modalData, name: text})}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Surname"
              value={modalData.surname}
              onChangeText={text => setModalData({...modalData, surname: text})}
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
        <AntDesign name="plus" size={24} color="#fff" />
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
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: height * 0.01,
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
});
