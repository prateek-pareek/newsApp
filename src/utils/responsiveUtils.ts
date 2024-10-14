import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions for scaling
const guidelineBaseWidth = 375; // Reference width (iPhone 11)
const guidelineBaseHeight = 667; // Reference height (iPhone 11)

// Responsive width
export const responsiveWidth = (size: number) => (width / guidelineBaseWidth) * size;

// Responsive height
export const responsiveHeight = (size: number) => (height / guidelineBaseHeight) * size;

// Responsive font size
export const responsiveFont = (size: number) => (width / guidelineBaseWidth) * size;
