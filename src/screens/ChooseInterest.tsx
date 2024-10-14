import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

// Define the type for interest items
interface Interest {
  id: string;
  name: string;
}

const interests: Interest[] = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Health' },
  { id: '3', name: 'Education' },
  { id: '4', name: 'Travel' },
  { id: '5', name: 'Music' },
  { id: '6', name: 'Sports' },
  { id: '7', name: 'Movies' },
  { id: '8', name: 'Food' },
  // Add more interests if needed
];

const ChooseInterestScreen: React.FC= () => {
 
  const navigation: any = useNavigation();
  const route = useRoute();
  const { fromLanguage, fromSettings }:any = route.params || {}; 
  console.log("fixxx",fromLanguage, fromSettings );
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Load selected interests from AsyncStorage
  const loadSelectedInterests = async () => {
    try {
      const interests = await AsyncStorage.getItem('selectedInterests');
      if (interests) {
        setSelectedInterests(JSON.parse(interests));
      }
    } catch (error) {
      console.error('Error loading interests:', error);
    }
  };

  // Save selected interests to AsyncStorage
  const saveSelectedInterests = async (interests: string[]) => {
    try {
      await AsyncStorage.setItem('selectedInterests', JSON.stringify(interests));
    } catch (error) {
      console.error('Error saving interests:', error);
    }
  };

  // Handle interest selection and deselection
  const handleInterestPress = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      const updatedInterests = selectedInterests.filter(id => id !== interestId);
      setSelectedInterests(updatedInterests); // Deselect if already selected
      saveSelectedInterests(updatedInterests); // Save updated interests
    } else {
      const updatedInterests = [...selectedInterests, interestId];
      setSelectedInterests(updatedInterests); // Add to selected if not selected
      saveSelectedInterests(updatedInterests); // Save updated interests
    }
  };

  // Load the selected interests when the component mounts
  useEffect(() => {
    loadSelectedInterests();
  }, []);

  // Render each interest item
  const renderInterestItem = ({ item }: { item: Interest }) => (
    <TouchableOpacity
      style={[
        styles.interestItem,
        selectedInterests.includes(item.id) && styles.selectedInterest,
      ]}
      onPress={() => handleInterestPress(item.id)}
    >
      <Text style={styles.interestText}>{item.name}</Text>
      {selectedInterests.includes(item.id) && (
        <Icon name='check-circle' size={24} color='#d32f2f' />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Your Interests</Text>
      <FlatList
        data={interests}
        renderItem={renderInterestItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.interestList}
      />
      <Button
        mode='contained'
        onPress={() => {
          if (fromLanguage) {
            navigation.replace('HomeTabs'); // Redirect to home if coming from ChooseLanguageScreen
          } else if (fromSettings) {
            navigation.replace('Settings'); // Redirect to settings if coming from Settings
          } else {
            navigation.replace('HomeTabs'); // Default redirect
          }
        }}
        style={styles.doneButton}
        labelStyle={styles.doneButtonText}
        disabled={selectedInterests.length === 0}
      >
        Done
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
  interestList: {
    flexGrow: 0,
    marginBottom: 16,
  },
  interestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: 'black', // Set background color
  },
  selectedInterest: {
    backgroundColor: '#2c2c2c', // Optional: Highlight the selected interest
  },
  interestText: {
    fontSize: 18,
    color: 'white',
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

export default ChooseInterestScreen;
