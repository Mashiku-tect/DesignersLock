import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

export default function NewOrderScreen({ navigation }) {
  const [formData, setFormData] = useState({
    clientName: '',
    designTitle: '',
    price: '',
    notes: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = () => {
    alert('Order created successfully!');
    navigation.goBack();
  };

  const handleUpload = async () => {
    try {
      if (Platform.OS === 'web') {
        const result = await DocumentPicker.getDocumentAsync({
          type: ['image/png', 'image/jpeg'],
          copyToCacheDirectory: false,
          multiple: true,
        });
        
        if (result.type === 'success') {
          if (result.assets) {
            const validFiles = result.assets.filter(file => 
              file.mimeType === 'image/png' || file.mimeType === 'image/jpeg'
            );
            setUploadedFiles([...uploadedFiles, ...validFiles]);
          }
        }
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          allowsMultipleSelection: true,
          quality: 1,
        });
        
        if (!result.canceled) {
          const validFiles = result.assets.filter(asset => 
            asset.uri.endsWith('.png') || asset.uri.endsWith('.jpg') || asset.uri.endsWith('.jpeg')
          );
          setUploadedFiles([...uploadedFiles, ...validFiles]);
        }
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    }
  };

  const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
    <Ionicons name="arrow-back" size={24} color="#333" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>New Designing Order</Text>
  <View style={styles.headerIcon} /> {/* Placeholder to balance layout */}
</View>


      <ScrollView 
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Client Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Client Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={formData.clientName}
              onChangeText={(text) => setFormData({...formData, clientName: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+255 123 456 789"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Design Details Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Design Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Design Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Business Card Design"
              placeholderTextColor="#999"
              value={formData.designTitle}
              onChangeText={(text) => setFormData({...formData, designTitle: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Price (TZS)</Text>
            <TextInput
              style={styles.input}
              placeholder="50,000"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(text) => setFormData({...formData, price: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Additional Notes</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Any special requirements..."
              placeholderTextColor="#999"
              multiline
              value={formData.notes}
              onChangeText={(text) => setFormData({...formData, notes: text})}
            />
          </View>
        </View>

        {/* Upload Section - Fixed */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Design Files</Text>
          
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={handleUpload}
          >
            <View style={styles.uploadButtonContent}>
              <Ionicons name="cloud-upload" size={28} color="#4a6bff" />
              <Text style={styles.uploadButtonText}>Upload Design Files</Text>
              <Text style={styles.uploadSubtext}>PNG or JPG only</Text>
            </View>
          </TouchableOpacity>

          {/* Display uploaded files */}
          {uploadedFiles.length > 0 && (
            <View style={styles.uploadedFilesContainer}>
              {uploadedFiles.map((file, index) => (
                <View key={index} style={styles.fileItem}>
                  <Ionicons name="document" size={20} color="#4a6bff" />
                  <Text 
                    style={styles.fileName}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {file.name || file.fileName || file.uri.split('/').pop()}
                  </Text>
                  <TouchableOpacity onPress={() => removeFile(index)}>
                    <Ionicons name="close-circle" size={20} color="#ff4a4a" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={!formData.clientName || !formData.designTitle || !formData.price}
        >
          <Text style={styles.submitButtonText}>Create Order</Text>
          <Ionicons name="checkmark-circle" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 16,
  backgroundColor: 'white',
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
headerTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: '#333',
  textAlign: 'center',
  marginTop:25
},
headerIcon: {
  width: 24,
  height: 24,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:25
},

  formContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: '#e1e1e1',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 30,
    width: '100%',
  },
  uploadButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: '#4a6bff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  uploadSubtext: {
    color: '#999',
    fontSize: 12,
  },
  uploadedFilesContainer: {
    marginTop: 15,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  fileName: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    color: '#555',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  submitButton: {
    backgroundColor: '#4a6bff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#4a6bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
});