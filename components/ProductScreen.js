import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductScreen({ route, navigation }) {
  const { product, hasPaid = false } = route.params || {};
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Watermark component
  const WatermarkOverlay = ({ large = false }) => (
    <View style={[styles.watermarkContainer, large && styles.largeWatermark]}>
      <Text style={[styles.watermarkText, large && styles.largeWatermarkText]}>SAMPLE</Text>
      <Text style={[styles.watermarkText, large && styles.largeWatermarkText]}>UNPAID</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Full Screen Modal */}
      <Modal
        visible={isFullScreen}
        transparent={false}
        animationType="fade"
        onRequestClose={() => setIsFullScreen(false)}
      >
        <View style={styles.fullScreenContainer}>
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
        </View>
      </Modal>

      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#4a6bff" />
      </TouchableOpacity>

      {/* Clickable Image with Watermark */}
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

      {/* Product info */}
      <View style={styles.productInfo}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
        {!hasPaid && (
          <TouchableOpacity 
            style={styles.purchaseButton}
            onPress={() => navigation.navigate('Payment', { product })}
          >
            <Text style={styles.purchaseButtonText}>Purchase to Remove Watermark</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  imageContainer: {
    marginTop: 60,
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
    top: 40,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
});