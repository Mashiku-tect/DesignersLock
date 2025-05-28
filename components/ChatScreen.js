import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({ route, navigation }) => {
  const { designer } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef();

  // Mock initial messages
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Hi there! I saw your design portfolio and loved your work.',
        sender: 'designer',
        time: '10:30 AM'
      },
      {
        id: '2',
        text: 'Thank you! What kind of project do you have in mind?',
        sender: 'me',
        time: '10:32 AM'
      },
      {
        id: '3',
        text: 'I need a logo for my new coffee shop business.',
        sender: 'designer',
        time: '10:33 AM'
      }
    ]);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate designer reply after 1 second
    setTimeout(() => {
      const replyMsg = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll get back to you with some ideas soon.",
        sender: 'designer',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Image source={{ uri: designer.image }} style={styles.designerImage} />
          <View>
            <Text style={styles.designerName}>{designer.name}</Text>
            <Text style={styles.designerStatus}>Online</Text>
          </View>
        </View>
        
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'me' ? styles.myMessage : styles.theirMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachmentButton}>
          <Ionicons name="attach" size={24} color="#4a6bff" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.messageInput}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={newMessage.trim() === ''}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={newMessage.trim() === '' ? '#ccc' : '#4a6bff'} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 15,
  },
  designerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  designerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  designerStatus: {
    fontSize: 12,
    color: '#4CAF50',
  },
  messagesContainer: {
    padding: 15,
    paddingBottom: 80,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4a6bff',
    borderBottomRightRadius: 2,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  myMessageText: {
    color: 'white',
  },
  messageTime: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  attachmentButton: {
    padding: 8,
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    marginHorizontal: 10,
    fontSize: 16,
  },
  sendButton: {
    padding: 10,
  },
});

export default ChatScreen;