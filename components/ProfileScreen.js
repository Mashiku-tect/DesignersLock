import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Image, 
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, Feather, FontAwesome, Entypo } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  // User data state
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    username: '@alexjohnson',
    bio: 'Digital designer & photographer. Creating beautiful experiences through design.',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexjohnson.design',
    instagram: '@alexjohnson',
    twitter: '@alexjohnson',
    followers: 1243,
    following: 562,
    posts: 87,
    darkMode: false,
  });

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Handle image upload
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      // Simulate upload
      setTimeout(() => {
        setProfileImage(result.assets[0].uri);
        setLoading(false);
      }, 1500);
    }
  };

  // Take photo
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need camera permission to take photos');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      // Simulate upload
      setTimeout(() => {
        setProfileImage(result.assets[0].uri);
        setLoading(false);
        setModalVisible(false);
      }, 1500);
    }
  };

  // Start editing a field
  const startEditing = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setIsEditing(true);
  };

  // Save edited field
  const saveEdit = () => {
    setUser({ ...user, [editField]: editValue });
    setIsEditing(false);
    setEditField(null);
    setEditValue('');
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setUser({ ...user, darkMode: !user.darkMode });
  };

  return (
    <View style={[styles.container, user.darkMode && styles.darkContainer]}>
      {/* Header */}
      <View style={[styles.header, user.darkMode && styles.darkHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={user.darkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, user.darkMode && styles.darkText]}>Profile</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Ionicons 
            name={user.darkMode ? 'sunny' : 'moon'} 
            size={24} 
            color={user.darkMode ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image Section */}
        <View style={styles.profileImageContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#4a6bff" />
          ) : (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          )}
          <TouchableOpacity 
            style={styles.cameraButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Name and Username */}
        <View style={styles.nameContainer}>
          <Text style={[styles.name, user.darkMode && styles.darkText]}>{user.name}</Text>
          <Text style={[styles.username, user.darkMode && styles.darkSubtext]}>{user.username}</Text>
        </View>

        {/* Bio */}
        <TouchableOpacity 
          style={[styles.section, user.darkMode && styles.darkSection]}
          onPress={() => startEditing('bio', user.bio)}
        >
          <Text style={[styles.sectionTitle, user.darkMode && styles.darkText]}>Bio</Text>
          <Text style={[styles.bioText, user.darkMode && styles.darkText]}>{user.bio}</Text>
          <Feather name="edit-2" size={18} color={user.darkMode ? '#aaa' : '#888'} style={styles.editIcon} />
        </TouchableOpacity>

        {/* Stats */}
        <View style={[styles.statsContainer, user.darkMode && styles.darkSection]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, user.darkMode && styles.darkText]}>{user.posts}</Text>
            <Text style={[styles.statLabel, user.darkMode && styles.darkSubtext]}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, user.darkMode && styles.darkText]}>{user.followers}</Text>
            <Text style={[styles.statLabel, user.darkMode && styles.darkSubtext]}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, user.darkMode && styles.darkText]}>{user.following}</Text>
            <Text style={[styles.statLabel, user.darkMode && styles.darkSubtext]}>Following</Text>
          </View>
        </View>

        {/* Personal Info */}
        <View style={[styles.section, user.darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, user.darkMode && styles.darkText]}>Personal Information</Text>
          
          <InfoItem 
            icon="mail" 
            label="Email" 
            value={user.email} 
            darkMode={user.darkMode}
            onPress={() => startEditing('email', user.email)}
          />
          
          <InfoItem 
            icon="phone" 
            label="Phone" 
            value={user.phone} 
            darkMode={user.darkMode}
            onPress={() => startEditing('phone', user.phone)}
          />
          
          <InfoItem 
            icon="map-pin" 
            label="Location" 
            value={user.location} 
            darkMode={user.darkMode}
            onPress={() => startEditing('location', user.location)}
          />
        </View>

        {/* Social Links */}
        <View style={[styles.section, user.darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, user.darkMode && styles.darkText]}>Social Links</Text>
          
          <InfoItem 
            icon="globe" 
            label="Website" 
            value={user.website} 
            darkMode={user.darkMode}
            onPress={() => startEditing('website', user.website)}
          />
          
          <InfoItem 
            icon="instagram" 
            label="Instagram" 
            value={user.instagram} 
            darkMode={user.darkMode}
            onPress={() => startEditing('instagram', user.instagram)}
          />
          
          <InfoItem 
            icon="twitter" 
            label="Twitter" 
            value={user.twitter} 
            darkMode={user.darkMode}
            onPress={() => startEditing('twitter', user.twitter)}
          />
        </View>

        {/* Account Actions */}
        <View style={[styles.section, user.darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, user.darkMode && styles.darkText]}>Account</Text>
          
          <ActionButton 
            icon="settings" 
            label="Settings" 
            darkMode={user.darkMode}
            onPress={() => navigation.navigate('Settings')}
          />
          
          <ActionButton 
            icon="help-circle" 
            label="Help & Support" 
            darkMode={user.darkMode}
            onPress={() => navigation.navigate('Help')}
          />
          
          <ActionButton 
            icon="log-out" 
            label="Log Out" 
            darkMode={user.darkMode}
            onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?')}
            isLast
          />
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditing}
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, user.darkMode && styles.darkModalContainer]}>
            <Text style={[styles.modalTitle, user.darkMode && styles.darkText]}>Edit {editField}</Text>
            <TextInput
              style={[styles.modalInput, user.darkMode && styles.darkInput]}
              value={editValue}
              onChangeText={setEditValue}
              autoFocus
              multiline={editField === 'bio'}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={saveEdit}
              >
                <Text style={styles.modalButtonPrimaryText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.imageModalContainer, user.darkMode && styles.darkModalContainer]}>
            <Text style={[styles.modalTitle, user.darkMode && styles.darkText]}>Change Profile Photo</Text>
            
            <TouchableOpacity 
              style={styles.imageOption}
              onPress={pickImage}
            >
              <Ionicons name="image" size={24} color={user.darkMode ? '#fff' : '#000'} />
              <Text style={[styles.imageOptionText, user.darkMode && styles.darkText]}>Choose from Library</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.imageOption}
              onPress={takePhoto}
            >
              <Ionicons name="camera" size={24} color={user.darkMode ? '#fff' : '#000'} />
              <Text style={[styles.imageOptionText, user.darkMode && styles.darkText]}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.imageOption}
              onPress={() => {
                setProfileImage('https://randomuser.me/api/portraits/men/1.jpg');
                setModalVisible(false);
              }}
            >
              <MaterialIcons name="delete" size={24} color="#ff4444" />
              <Text style={styles.imageOptionTextDelete}>Remove Current Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.imageOption, styles.imageOptionCancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.imageOptionTextCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Reusable Info Item Component
const InfoItem = ({ icon, label, value, darkMode, onPress }) => (
  <TouchableOpacity style={styles.infoItem} onPress={onPress}>
    <View style={styles.infoIcon}>
      <Feather name={icon} size={20} color={darkMode ? '#aaa' : '#888'} />
    </View>
    <View style={styles.infoTextContainer}>
      <Text style={[styles.infoLabel, darkMode && styles.darkSubtext]}>{label}</Text>
      <Text style={[styles.infoValue, darkMode && styles.darkText]}>{value}</Text>
    </View>
    <Feather name="edit-2" size={18} color={darkMode ? '#aaa' : '#888'} />
  </TouchableOpacity>
);

// Reusable Action Button Component
const ActionButton = ({ icon, label, darkMode, onPress, isLast }) => (
  <TouchableOpacity 
    style={[
      styles.actionButton, 
      !isLast && styles.actionButtonBorder,
      darkMode && styles.darkActionButton,
      !isLast && darkMode && styles.darkActionButtonBorder
    ]} 
    onPress={onPress}
  >
    <Feather name={icon} size={20} color={darkMode ? '#aaa' : '#888'} />
    <Text style={[styles.actionButtonText, darkMode && styles.darkText]}>{label}</Text>
    <Entypo name="chevron-right" size={20} color={darkMode ? '#aaa' : '#888'} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkHeader: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  darkSubtext: {
    color: '#aaa',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    right: 100,
    bottom: 0,
    backgroundColor: '#4a6bff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#888',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  darkSection: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  bioText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  editIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIcon: {
    width: 40,
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  actionButtonBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkActionButton: {
    borderBottomColor: '#333',
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  darkModalContainer: {
    backgroundColor: '#1e1e1e',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  darkInput: {
    borderColor: '#333',
    color: '#fff',
    backgroundColor: '#2a2a2a',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  modalButtonPrimary: {
    backgroundColor: '#4a6bff',
    borderRadius: 6,
    marginLeft: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#888',
  },
  modalButtonPrimaryText: {
    fontSize: 16,
    color: 'white',
  },
  imageModalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 0,
    paddingBottom: 10,
  },
  imageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageOptionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  imageOptionTextDelete: {
    fontSize: 16,
    marginLeft: 15,
    color: '#ff4444',
  },
  imageOptionCancel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOptionTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a6bff',
  },
});

export default ProfileScreen;