import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';

const facilities = [
  {
    id: '1',
    name: 'Basketball Court',
    type: 'Sports',
    capacity: 20,
    slots: [
      { time: '09:00 - 10:00', booked: false },
      { time: '10:00 - 11:00', booked: false },
      { time: '11:00 - 12:00', booked: true },
      { time: '14:00 - 15:00', booked: false },
    ],
  },
  {
    id: '2',
    name: 'Conference Room A',
    type: 'Meeting',
    capacity: 10,
    slots: [
      { time: '09:00 - 10:00', booked: false },
      { time: '10:00 - 11:00', booked: false },
      { time: '13:00 - 14:00', booked: false },
    ],
  },
  {
    id: '3',
    name: 'Swimming Pool',
    type: 'Sports',
    capacity: 15,
    slots: [
      { time: '08:00 - 09:00', booked: false },
      { time: '12:00 - 13:00', booked: true },
      { time: '15:00 - 16:00', booked: false },
    ],
  },
  {
    id: '4',
    name: 'Tennis Court',
    type: 'Sports',
    capacity: 4,
    slots: [
      { time: '09:00 - 10:00', booked: false },
      { time: '10:00 - 11:00', booked: false },
      { time: '16:00 - 17:00', booked: false },
    ],
  },
  {
    id: '5',
    name: 'Library Study Room',
    type: 'Study',
    capacity: 6,
    slots: [
      { time: '10:00 - 11:00', booked: false },
      { time: '14:00 - 15:00', booked: false },
      { time: '17:00 - 18:00', booked: true },
    ],
  },
];

function FacilityItem({ facility, onPress }) {
  const availableSlots = facility.slots.filter((slot) => !slot.booked).length;

  return (
    <TouchableOpacity style={styles.facilityItem} onPress={() => onPress(facility)}>
      <Text style={styles.facilityName}>{facility.name}</Text>
      <Text style={styles.facilityDetails}>Type: {facility.type}</Text>
      <Text style={styles.facilityDetails}>Capacity: {facility.capacity}</Text>
      <Text style={styles.availability}>
        Available slots: {availableSlots}/{facility.slots.length}
      </Text>
    </TouchableOpacity>
  );
}

function BookingModal({ visible, facility, onClose, onBook }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleBooking = () => {
    if (selectedSlot) {
      onBook(facility.id, selectedSlot);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Book {facility?.name}</Text>

          <FlatList
            data={facility?.slots}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.slotButton,
                  item.booked && styles.bookedSlot,
                  selectedSlot === item.time && styles.selectedSlot,
                ]}
                onPress={() => !item.booked && setSelectedSlot(item.time)}
                disabled={item.booked}
              >
                <Text style={styles.slotText}>{item.time}</Text>
                {item.booked && <Text style={styles.bookedText}>Booked</Text>}
              </TouchableOpacity>
            )}
          />

          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={onClose} color="#666" />
            <Button
              title="Confirm Booking"
              onPress={handleBooking}
              disabled={!selectedSlot}
              color="rgb(255, 99, 71)"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function FacilityScreen() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [facilityData, setFacilityData] = useState(facilities);

  const handleBookSlot = (facilityId, slotTime) => {
    setFacilityData((prev) =>
      prev.map((facility) => {
        if (facility.id === facilityId) {
          return {
            ...facility,
            slots: facility.slots.map((slot) =>
              slot.time === slotTime ? { ...slot, booked: true } : slot
            ),
          };
        }
        return facility;
      })
    );

    const facility = facilityData.find((f) => f.id === facilityId);
    setBookings((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        facility: facility.name,
        time: slotTime,
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Campus Facilities</Text>
      <FlatList
        data={facilityData}
        renderItem={({ item }) => (
          <FacilityItem
            facility={item}
            onPress={(facility) => {
              setSelectedFacility(facility);
              setModalVisible(true);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <BookingModal
        visible={modalVisible}
        facility={selectedFacility}
        onClose={() => setModalVisible(false)}
        onBook={handleBookSlot}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(255, 99, 71)',
    marginBottom: 20,
    textAlign: 'center',
  },
  facilityItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  facilityName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  facilityDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  availability: {
    marginTop: 10,
    color: 'rgb(255, 99, 71)',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '90%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'rgb(255, 99, 71)',
    textAlign: 'center',
  },
  slotButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  selectedSlot: {
    backgroundColor: 'rgba(255, 99, 71, 0.2)',
    borderColor: 'rgb(255, 99, 71)',
    borderWidth: 1,
  },
  bookedSlot: {
    backgroundColor: '#ffcccc',
  },
  slotText: {
    color: '#333',
    fontSize: 14,
  },
  bookedText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});