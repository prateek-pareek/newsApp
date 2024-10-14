// PrivacyScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Privacy Policy</Text>
        
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.sectionText}>
          This privacy policy outlines how we collect, use, and protect your information when you use our app.
        </Text>

        <Text style={styles.sectionTitle}>2. Information Collection</Text>
        <Text style={styles.sectionText}>
          We may collect the following information:
          {'\n'}- Personal identification information (Name, Email, etc.)
          {'\n'}- Usage data (App usage statistics)
          {'\n'}- Device information (Device type, OS version)
        </Text>

        <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
        <Text style={styles.sectionText}>
          We use the collected information for various purposes:
          {'\n'}- To provide and maintain our app
          {'\n'}- To notify you about changes to our app
          {'\n'}- To provide customer support
          {'\n'}- To gather analysis or valuable information so that we can improve our app
          {'\n'}- To monitor the usage of our app
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.sectionText}>
          We take the security of your data seriously. We use various security measures to protect your personal information.
        </Text>

        <Text style={styles.sectionTitle}>5. Changes to This Privacy Policy</Text>
        <Text style={styles.sectionText}>
          We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy in this section.
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.sectionText}>
          If you have any questions about this privacy policy, please contact us:
          {'\n'}- Email: support@example.com
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 12,
  },
});

export default PrivacyScreen;
