import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductScreen({ route, navigation }) {
  const { product, hasPaid = false } = route.params || {};
  const [isFullScreen, setIsFullScreen] = useState(false);

  const showMenu = () => {
    // Alert.alert('Menu', 'Add menu actions here', [{ text: 'OK' }]);
  };

  const WatermarkOverlay = ({ large = false }) => (
    <View style={[styles.watermarkContainer, large && styles.largeWatermark]}>
      <Text style={[styles.watermarkText, large && styles.largeWatermarkText]}>SAMPLE</Text>
      <Text style={[styles.watermarkText, large && styles.largeWatermarkText]}>UNPAID</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Design Preview</Text>
        <TouchableOpacity onPress={showMenu}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Full Screen Modal */}
      <Modal
        visible={isFullScreen}
        transparent={false}
        animationType="fade"
        onRequestClose={() => setIsFullScreen(false)}
      >
        <SafeAreaView style={styles.fullScreenContainer}>
          <TouchableOpacity
            style={styles.fullScreenBackButton}
            onPress={() => setIsFullScreen(false)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>

          {hasPaid ? (
            <Image
              source={product.image}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          ) : (
            <ImageBackground
              source={product.image}
              style={styles.fullScreenImage}
              resizeMode="contain"
            >
              <WatermarkOverlay large />
            </ImageBackground>
          )}
        </SafeAreaView>
      </Modal>

      {/* Product Image */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setIsFullScreen(true)}
        activeOpacity={0.9}
      >
        {hasPaid ? (
          <Image source={product.image} style={styles.productImage} />
        ) : (
          <ImageBackground source={product.image} style={styles.productImage}>
            <WatermarkOverlay />
          </ImageBackground>
        )}
      </TouchableOpacity>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>

        {!hasPaid && (
          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={() => navigation.navigate('Payment', { product })}
          >
            <Text style={styles.purchaseButtonText}>Pay to Remove Watermark</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  imageContainer: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenBackButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 20,
    left: 20,
    zIndex: 10,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  watermarkContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    borderRadius: 10,
    transform: [{ rotate: '-30deg' }],
  },
  largeWatermark: {
    padding: 40,
    transform: [{ rotate: '-30deg' }, { scale: 1.5 }],
  },
  watermarkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  largeWatermarkText: {
    fontSize: 48,
  },
  productInfo: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a6bff',
    marginBottom: 20,
  },
  purchaseButton: {
    backgroundColor: '#4a6bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
    marginLeft: -24,
  },
});
