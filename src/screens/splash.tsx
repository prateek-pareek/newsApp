import React, {useEffect} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const SplashScreen: React.FC = () => {
  const navigation: any = useNavigation()
  useEffect(() => {
    const timer = setTimeout(async () => {
      const firstLaunch = await AsyncStorage.getItem('isFirstLaunch')
      if (firstLaunch === null) {
        await AsyncStorage.setItem('isFirstLaunch', 'false')
        navigation.navigate('LanguageSelection', {fromSplashScreen: true})
      } else {
        navigation.replace('HomeTabs')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode='contain'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
  },
})

export default SplashScreen
