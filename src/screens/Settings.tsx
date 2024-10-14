import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Share,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [personalizeFeedEnabled, setPersonalizeFeedEnabled] = useState(false);
  const [hdImageEnabled, setHdImageEnabled] = useState(false);
  const [nightModeEnabled, setNightModeEnabled] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share This App With Your Friends',
        url: 'https://example.com',
        title: 'Awesome Video',
      });
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo at the top center */}
      <Image
        source={require('../../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain" 
      />

      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          navigation.navigate('Auth');
        }}>
        <View style={styles.iconTextContainer}>
          <Icon name='account' size={24} color='white' />
          <Text style={styles.text}>Login / Signup</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          navigation.navigate('LanguageSelection', { fromSettings: true });
        }}>
        <View style={styles.iconTextContainer}>
          <Icon name='format-font' size={24} color='white' />
          <Text style={styles.text}>Language</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          navigation.navigate('InterestSelection', { fromSettings: true });
        }}>
        <View style={styles.iconTextContainer}>
          <Icon name='star' size={24} color='white' />
          <Text style={styles.text}>Interest</Text>
        </View>
      </TouchableOpacity>

      {/* Night Mode */}
      {/* <View style={styles.row}>
        <View style={styles.iconTextContainer}>
          <Icon name='weather-night' size={24} color='white' />
          <View>
            <Text style={styles.text}>Night Mode</Text>
            <Text style={styles.subText}>For better readability at night</Text>
          </View>
        </View>
        <Switch value={nightModeEnabled} onValueChange={setNightModeEnabled} />
      </View> */}

      {/* Autoplay */}
      <View style={styles.row}>
        <View style={styles.iconTextContainer}>
          <Icon name='play-circle-outline' size={24} color='white' />
          <Text style={styles.text}>Autoplay</Text>
        </View>
        <Switch value={autoplayEnabled} onValueChange={setAutoplayEnabled} />
      </View>

      {/* Share App */}
      <TouchableOpacity style={styles.row} onPress={onShare}>
        <View style={styles.iconTextContainer}>
          <Icon name='share-outline' size={24} color='white' />
          <Text style={styles.text}>Share app</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row} onPress={() => {
          navigation.navigate('Privacy');
        }}>
        <View style={styles.iconTextContainer}>
          <Icon name='message-outline' size={24} color='white' />
          <Text style={styles.text}>Privacy</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row}>
        <View style={styles.iconTextContainer}>
          <Icon name='star-outline' size={24} color='white' />
          <Text style={styles.text}>Rate app</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  logo: {
    width: 300, // Set the desired width
    height: 150, // Set the desired height
    alignSelf: 'center', // Center the logo horizontally
    marginBottom: 10, // Space below the logo
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20, // Increased padding for more space between rows
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 16,
    backgroundColor: 'black',
    color: 'white',
  },
  subText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 16,
  },
  rightTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 16,
    marginRight: 8,
    color: 'white',
  },
});

export default SettingsScreen;
