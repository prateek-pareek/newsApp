import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native'


const Auth: React.FC = () => {
  const navigation: any = useNavigation()
  return (
    <View style={styles.container}>
    
      <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Illustration Image */}
      <Image 
        source={require('../../assets/avatar.png')}
        style={styles.image}
      />


      <Text style={styles.title}>Personalize your News Feed</Text>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        <View style={styles.activeDot} />
        <View style={styles.inactiveDot} />
        <View style={styles.inactiveDot} />
      </View>

      {/* Social Buttons */}
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={() => navigation.navigate('HomeTabs')}>
          <Icon name="google" size={20} color="#000" />
          {'  '}Continue with Google
        </Button>

        <Button mode="outlined" onPress={() => navigation.navigate('HomeTabs')} style={styles.socialButton}>
          <Icon name="facebook" size={20} color="#1877F2" />
          {'  '}Continue with Facebook
        </Button>

        <Button mode="outlined" onPress={() => navigation.navigate('HomeTabs')} style={styles.socialButton}>
          <Icon name="apple" size={20} color="#000" />
          {'  '}Continue with Apple Id
        </Button>
      </View>

      {/* Privacy Policy Link */}
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.privacyText}>Accept Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 16,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginTop: 16,
  },
  privacyText: {
    color: '#666',
    textDecorationLine: 'underline',
    marginTop: 24,
    fontSize: 14,
  },
});

export default Auth;