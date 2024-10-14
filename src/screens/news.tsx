import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
  Share,
  SafeAreaView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Video, {OnProgressData, VideoRef} from 'react-native-video';
import SwiperFlatList from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';
import {videoArray} from './ArrayData';

const {height, width} = Dimensions.get('window');

export default function Reel() {
  const videoRef = useRef<VideoRef>(null);
  const swiperRef = useRef<any>(null);
  const [paused, setPaused] = useState<boolean>(false); // Controlled pause state
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speackerShow, setSpeackerShow] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Function to move to the next video
  const moveToNextVideo = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollToIndex({index: currentIndex + 1});
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing video!',
        url: 'https://example.com',
        title: 'Awesome Video',
      });
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const onLoad = (data: {duration: number}) => {
    setDuration(data.duration);
    setLoading(false); // Hide loader once the video is loaded
  };

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
  };

  const onEnd = () => {
    moveToNextVideo(); // Move to the next video on end
  };

  const onError = (error: any) => {
    console.log('Video error:', error);
    moveToNextVideo();
  };

  const onSlide = (value: number) => {
    const seekTime = Math.min(value, duration);
    setCurrentTime(seekTime);
  };

  // Seek video when user finishes sliding
  const onSlidingComplete = (value: number) => {
    if (videoRef.current && duration > 0) {
      videoRef.current.seek(value);
    }
  };

  const videoPlayer = (item: any, index: number) => {
    return (
      <SafeAreaView>
        <Pressable
          onPress={() => {
            setPaused(!paused); // Toggle play/pause on video tap
          }}
          style={{
            width: width,
            height: height,
          }}>
          <Video
            source={{uri: item.sources}}
            ref={videoRef}
            onBuffer={e => console.log('buffering...', e)}
            onError={onError}
            resizeMode="cover"
            paused={index !== currentIndex || paused} // Pause based on current index or user control
            onProgress={onProgress}
            muted={isMuted}
            onLoad={onLoad}
            onEnd={onEnd}
            style={styles.backgroundVideo}
            bufferConfig={{
              minBufferMs: 5000,
              maxBufferMs: 10000,
              bufferForPlaybackMs: 5000,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
            renderLoader={() => (
              <View style={styles.loaderContainer}>
                <Spinner
                  color={'white'}
                  isVisible={true}
                  size={30}
                  type="Circle"
                />
              </View>
            )}
          />

          {/* Controls for Like, Comment, and Share */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={onShare}>
              <Image
                style={styles.icon2}
                source={require('../../assets/paperplane.png')}
              />
            </TouchableOpacity>
          </View>

          {/* Slider positioned in the center */}
          <View style={styles.sliderContainer}>
            <LinearGradient
              colors={['#00000000', '#000000']}
              style={styles.controls}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onValueChange={onSlide} // Update current time while sliding
                onSlidingComplete={onSlidingComplete} // Seek video on sliding complete
                minimumTrackTintColor={'red'}
                maximumTrackTintColor={'gray'}
                thumbTintColor={'white'}
              />
            </LinearGradient>
          </View>

          {speackerShow && (
            <View style={styles.imagView}>
              {isMuted ? (
                <Image
                  style={styles.speacker}
                  source={require('../../assets/speackerOff.png')}
                />
              ) : (
                <Image
                  style={styles.speacker}
                  source={require('../../assets/speackerOn.png')}
                />
              )}
            </View>
          )}
        </Pressable>
      </SafeAreaView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SwiperFlatList
        ref={swiperRef}
        index={currentIndex}
        vertical
        data={videoArray}
        onChangeIndex={({index}) => {
          setCurrentIndex(index);
        }}
        renderItem={({item, index}) => videoPlayer(item, index)}
        snapToAlignment="start"
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    width: width,
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}],
    zIndex: 200,
  },
  icon2: {
    height: 26,
    width: 26,
    marginBottom: 25,
  },
  slider: {
    bottom: 90,
    width: '80%',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 220,
    right: 15,
    alignItems: 'center',
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  controls: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  speacker: {
    height: 50,
    width: 50,
  },
  imagView: {
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    top: 0,
  },
});
