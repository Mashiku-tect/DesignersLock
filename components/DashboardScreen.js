import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample product data
const products = [
  { id: '1001', image: require('../assets/product1.jpg'), title: 'Abstract Art #1', price: '$49.99' },
  { id: '1002', image: require('../assets/product2.jpg'), title: 'Nature Landscape', price: '$39.99' },
  { id: '1003', image: require('../assets/product3.jpg'), title: 'City Skyline', price: '$59.99' },
  { id: '1004', image: require('../assets/product4.jpg'), title: 'Portrait Study', price: '$29.99' },
  { id: '1005', image: require('../assets/product5.jpg'), title: 'Minimalist Design', price: '$45.99' },
];

export default function DashboardScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const results = products.filter(product => 
      product.id.includes(searchQuery) || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const recentOrders = [
    { id: 1, client: 'Sarah Johnson', date: 'Today, 10:30 AM', status: 'In Progress', amount: '$245.00' },
    { id: 2, client: 'Michael Chen', date: 'Yesterday, 2:15 PM', status: 'Completed', amount: '$180.50' },
    { id: 3, client: 'Emily Wilson', date: 'Yesterday, 11:45 AM', status: 'Completed', amount: '$320.75' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.username}>Allen!</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
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
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <View style={styles.searchResultsContainer}>
          <Text style={styles.sectionTitle}>Search Results</Text>
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
          />
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

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('NewOrder')}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.primaryButtonText}>New Order</Text>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="calendar" size={20} color="#4a6bff" />
            <Text style={styles.secondaryButtonText}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="notifications" size={20} color="#4a6bff" />
            <Text style={styles.secondaryButtonText}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('DesignersScreen')}
          >
            <Ionicons name="people" size={20} color="#4a6bff" />
            <Text style={styles.secondaryButtonText}>Designers</Text>
          </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 18,
    color: '#666',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
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
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  searchButton: {
    backgroundColor: '#4a6bff',
    borderRadius: 10,
    padding: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultsContainer: {
    marginBottom: 20,
  },
  searchResultsList: {
    paddingVertical: 10,
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
  actionsContainer: {
    marginBottom: 25,
  },
  primaryButton: {
    backgroundColor: '#4a6bff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#4a6bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  secondaryButton: {
    width: '32%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: '#4a6bff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  ordersContainer: {
    flex: 1,
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
});