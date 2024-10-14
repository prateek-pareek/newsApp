import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Language {
  id: string;
  name: string;
}

const languages: Language[] = [
  { id: '1', name: 'English' },
  { id: '2', name: 'हिंदी' },
  { id: '3', name: 'తెలుగు' },
  { id: '4', name: 'বাংলা' },
  { id: '5', name: 'ગુજરાતી' },
  { id: '6', name: 'മലയാളം' },
  { id: '7', name: 'मराठी' },
  { id: '8', name: 'ಕನ್ನಡ' },
];

const ChooseLanguageScreen: React.FC = () => {

  const route = useRoute();
  const { fromSplashScreen, fromSettings }:any = route.params || {};
  const navigation :any= useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const loadSelectedLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem('selectedLanguage');
      if (language) {
        setSelectedLanguage(language);
        if (fromSplashScreen) {
          // If coming from splash screen and language is already set, redirect to ChooseInterestScreen
          navigation.replace('InterestSelection');
        }
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const saveSelectedLanguage = async (languageId: string) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', languageId);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const handleLanguagePress = (languageId: string) => {
    setSelectedLanguage(languageId);
    saveSelectedLanguage(languageId);
  };

  useEffect(() => {
    loadSelectedLanguage();
  }, []);

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.id && styles.selectedLanguage,
      ]}
      onPress={() => handleLanguagePress(item.id)}
    >
      <Text style={styles.languageText}>{item.name}</Text>
      {selectedLanguage === item.id && (
        <Icon name='check-circle' size={24} color='#d32f2f' />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Language</Text>
      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.languageList}
      />
      <Button
        mode='contained'
        onPress={() => {
          // Navigate to settings if coming from settings page
          if (fromSettings) {
            navigation.replace('Settings');
          } else {
            navigation.navigate('InterestSelection'); 
          }
        }}
        style={styles.doneButton}
        labelStyle={styles.doneButtonText}
        disabled={!selectedLanguage}
      >
        {fromSplashScreen ? 'Next' : 'Done'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: 'black',
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  languageList: {
    flexGrow: 0,
    marginBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    color: 'white',
    marginVertical: 8,
  },
  selectedLanguage: {
    backgroundColor: '#2c2c2c', // Optional: Highlight the selected language
  },
  languageText: {
    fontSize: 18,
    color: "white"
  },
  doneButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ChooseLanguageScreen;
