import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

const initialRequests = [
  {
    id: '1',
    category: 'Plumbing',
    description: 'Leaky faucet in bathroom',
    status: 'Completed',
    date: '2024-03-15',
    urgency: 'Medium',
  },
  {
    id: '2',
    category: 'Electrical',
    description: 'Flickering lights in classroom',
    status: 'In Progress',
    date: '2024-03-16',
    urgency: 'High',
  },
];

export default function MaintenanceScreen() {
  const [requests, setRequests] = useState(initialRequests);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Medium');
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    if (!category || !description) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const newRequest = {
      id: Date.now().toString(),
      category,
      description,
      status: 'Submitted',
      date: new Date().toLocaleDateString(),
      urgency,
      image,
    };

    setRequests([newRequest, ...requests]);
    setCategory('');
    setDescription('');
    setUrgency('Medium');
    setImage(null);
    Alert.alert('Success', 'Request submitted successfully!');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.requestItem, styles[item.status.replace(/\s+/g, '')]]}>
      <Text style={styles.requestCategory}>{item.category}</Text>
      <Text style={styles.requestDescription}>{item.description}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.requestImage} />}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Status: {item.status}</Text>
        <Text style={styles.urgencyText}>Urgency: {item.urgency}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>New Maintenance Request</Text>

        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Plumbing" value="Plumbing" />
          <Picker.Item label="Electrical" value="Electrical" />
          <Picker.Item label="HVAC" value="HVAC" />
          <Picker.Item label="Structural" value="Structural" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Description of the problem"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.urgencyContainer}>
          <Text style={styles.urgencyLabel}>Urgency:</Text>
          {['Low', 'Medium', 'High'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.urgencyButton,
                urgency === level && styles.selectedUrgency,
                styles[`urgency${level}`],
              ]}
              onPress={() => setUrgency(level)}
            >
              <Text style={styles.urgencyButtonText}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Text style={styles.photoButtonText}>Attach Photo</Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.previewImage} />}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Previous Requests</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'rgb(255, 99, 71)',
  },
  picker: {
    backgroundColor: '#fff',
    marginVertical: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    minHeight: 80,
    fontSize: 14,
  },
  urgencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  urgencyLabel: {
    marginRight: 10,
    color: '#666',
    fontSize: 14,
  },
  urgencyButton: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  selectedUrgency: {
    borderColor: 'rgb(255, 99, 71)',
  },
  urgencyLow: {
    backgroundColor: '#c8e6c9',
  },
  urgencyMedium: {
    backgroundColor: '#fff3e0',
  },
  urgencyHigh: {
    backgroundColor: '#ffcdd2',
  },
  urgencyButtonText: {
    color: '#333',
    fontSize: 14,
  },
  photoButton: {
    backgroundColor: 'rgb(255, 99, 71)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: 'rgb(255, 99, 71)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  Submitted: {
    borderLeftColor: '#3498db',
  },
  InProgress: {
    borderLeftColor: '#f1c40f',
  },
  Completed: {
    borderLeftColor: '#2ecc71',
  },
  requestCategory: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  requestDescription: {
    color: '#666',
    marginVertical: 5,
    fontSize: 14,
  },
  requestImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusText: {
    color: '#666',
    fontSize: 14,
  },
  urgencyText: {
    color: '#666',
    fontSize: 14,
  },
  dateText: {
    color: '#666',
    fontSize: 14,
  },
});