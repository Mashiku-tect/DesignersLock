import React, { useState,useEffect } from 'react';
import axios from 'axios';
//import { useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Image, TextInput, FlatList, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [loading, setLoading] = useState(false);

const currentHour = new Date().getHours();
 let greeting;
  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  const handleSearch = async (text) => {
  setSearchQuery(text);

  if (text.trim() === '') {
    setSearchResults([]);
    return;
  }

  try {
    setLoading(true);
    const res = await axios.get(`https://90a7-197-186-16-248.ngrok-free.app/api/search?q=${text}`);
    const formatted = res.data.map(product => ({
      id: product.product_id,
      title: product.designtitle,
      price: "Tsh:"+product.price,
      image: { uri: `https://90a7-197-186-16-248.ngrok-free.app/${product.productimagepath.replace(/\\/g, '/')}` }
    }));
    setSearchResults(formatted);
  } catch (error) {
    console.error('Search error:', error);
  } finally {
    setLoading(false);
  }
};

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const recentOrders = [
    { id: 1, client: 'Sarah Johnson', date: 'Today, 10:30 AM', status: 'In Progress', amount: '$245.00' },
    { id: 2, client: 'Michael Chen', date: 'Yesterday, 2:15 PM', status: 'Completed', amount: '$180.50' },
    { id: 3, client: 'Emily Wilson', date: 'Yesterday, 11:45 AM', status: 'Completed', amount: '$320.75' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.username}>Allen,Welcome Back</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Image 
              source={require('../assets/profile-placeholder.png')} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products by ID or name"
            placeholderTextColor="#4a6bff"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color="#aaa" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Results */}
        {searchQuery.trim() !== '' && (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.sectionTitle}>Search Results</Text>

            {searchResults.length > 0 ? (
              <FlatList
                horizontal
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.productCard}
                    onPress={() => navigation.navigate('Product', { product: item })}
                  >
                    <Image source={item.image} style={styles.productImage} />
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.searchResultsList}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <Text style={styles.noResultsText}>No results found.</Text>
            )}
          </View>
        )}

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#4a6bff' }]}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Active Orders</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#6c5ce7' }]}>
            <Text style={styles.statValue}>$3,245</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
        </View>

        {/* Recent Orders */}
        <ScrollView style={styles.ordersContainer}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>

          {recentOrders.map(order => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}
            >
              <View style={styles.orderInfo}>
                <Text style={styles.orderClient}>{order.client}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.orderMeta}>
                <Text style={[
                  styles.orderStatus,
                  { color: order.status === 'Completed' ? '#2ecc71' : '#f39c12' }
                ]}>
                  {order.status}
                </Text>
                <Text style={styles.orderAmount}>{order.amount}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

     {/* Bottom Menu */}
<View style={styles.bottomMenu}>
  <TouchableOpacity 
    style={styles.menuItem}
    onPress={() => navigation.navigate('NewOrder')}
  >
    <Ionicons name="add-circle" size={20} color="#4a6bff" />
    <Text style={styles.menuText}>New Order</Text>
  </TouchableOpacity>
  
  <TouchableOpacity 
    style={styles.menuItem}
    onPress={() => navigation.navigate('DesignersScreen')}
  >
    <Ionicons name="people" size={20} color="#4a6bff" />
    <Text style={styles.menuText}>Designers</Text>
  </TouchableOpacity>
</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
 container: {
  flex: 1,
  backgroundColor: '#f8f9fa',
  paddingHorizontal: 20,
  paddingTop: 20,
  paddingBottom: 70, // Matches the menu height
},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:20,
    marginBottom: 25,
  },
  greeting: {
    fontSize: 18,
    color: '#666',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
     color: '#4a6bff',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginHorizontal: 6,
  },
  searchButton: {
    backgroundColor: '#4a6bff',
    borderRadius: 8,
    padding: 10,
  },
  searchResultsContainer: {
    marginBottom: 20,
  },
  searchResultsList: {
    paddingVertical: 10,
  },
  noResultsText: {
    paddingVertical: 10,
    fontStyle: 'italic',
    color: '#999',
  },
  productCard: {
    width: 150,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#4a6bff',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    width: '48%',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  ordersContainer: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  orderInfo: {
    flex: 1,
  },
  orderClient: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: '#999',
  },
  orderMeta: {
    alignItems: 'flex-end',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomMenu: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: 'white',
  borderTopWidth: 1,
  borderTopColor: '#e1e1e1',
  paddingVertical: 10,
  paddingHorizontal: 5, // Added horizontal padding
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 70, // Fixed height to ensure enough space
},
menuItem: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 15, // Increased horizontal padding
  paddingVertical: 8,
  flex: 1, // Make items share space equally
},
  menuText: {
  fontSize: 6, // Slightly smaller font size
  color: '#4a6bff',
  marginTop: 5,
  marginLeft:0,
   // Ensure text is centered
},
});