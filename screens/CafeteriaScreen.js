import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Button, Alert , Platform} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const menuItems = [
  { id: '1', name: 'Chicken Burger', price: 7.99, description: 'Crunchy Chicken burger' , image: require('../assets/chickenBurger.jpg') },
  { id: '2', name: 'Cheeseburger', price: 8.99, description: 'Juicy beef patty with cheese', image: require('../assets/cheeseburger.webp') },
  { id: '3', name: 'Caesar Salad', price: 6.99, description: 'Fresh romaine lettuce with dressing', image: require('../assets/caesarSalad.jpg') },
  { id: '4', name: 'Pizza', price: 7.89, description: 'Margarita Pizza with fresh cheese', image: require('../assets/pizza.jpg') },
  { id: '5', name: 'Pasta Bolognese', price: 10.49, description: 'Pasta with special bolognese sauce', image: require('../assets/pastaBolognese.jpg') },
  { id: '6', name: 'Pasta Frutti Di Mare', price: 13.79, description: 'Pasta with fresh sea fruits', image: require('../assets/pastaFrutti.jpg') },
  { id: '7', name: 'Hot Wings', price: 8.99, description: 'Chicken Wings with special hot sauce', image: require('../assets/hotWings.jpg') },
  { id: '8', name: 'Greek Souvlagi', price: 6.99, description: 'Souvlagi with Greek style', image: require('../assets/greekSouvlaki.jpg') },
  { id: '9', name: 'Coca-Cola', price: 2.99, description: 'Refreshing soda', image: require('../assets/cocacola.png') },
  { id: '10', name: 'Fanta', price: 2.99, description: 'Orange flavored soda', image: require('../assets/fanta.jpg') },
  { id: '11', name: 'Pepsi', price: 2.99, description: 'Classic cola taste', image: require('../assets/pepsi.jpg') },
  { id: '12', name: 'Orange Juice', price: 3.49, description: 'Fresh squeezed orange juice', image: require('../assets/orangejuice.jpg') },
];


    

function MenuItem({ item, onAddToCart }) {
  return (
    <View style={styles.menuItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart(item)}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

function MenuScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => <MenuItem item={item} onAddToCart={addToCart} />}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart', { cart })}>
        <Text style={styles.cartButtonText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
}

function CartScreen({ route, navigation }) {
  const [cart, setCart] = useState(route.params.cart);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (itemId, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n${message}`); // Simple browser alert
    } else {
      Alert.alert(title, message); // Mobile-friendly alert
    }
  };
  
  
  const handleCheckout = () => {
    showAlert('Order Submitted', 'Your order has been placed successfully!');
    setCart([]); // Clear cart after checkout
    navigation.navigate('Menu'); // Redirect back to menu
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, -1)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

export default function CafeteriaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 12,
    color: 'gray',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  addButton: {
    backgroundColor: '#ff6347',
    padding: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});