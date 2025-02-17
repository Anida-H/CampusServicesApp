import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text, View , StyleSheet} from 'react-native';
import CafeteriaStack from './screens/CafeteriaScreen';
import FacilityScreen from './screens/FacilityScreen';
import MaintenanceScreen from './screens/MaintenanceScreen';




// Temporary screens

function CafeteriaScreen() { return <View><Text>Cafeteria</Text></View> }

function TransportScreen() { return <View><Text>Transport</Text></View> }

function TempFacilityScreen() { return <View><Text>Facilities</Text></View> }

function TempMaintenanceScreen() { return <View><Text>Maintenance</Text></View> }

const Tab = createBottomTabNavigator();


export default function App() {

  return (

    <NavigationContainer>

      <Tab.Navigator>

      <Tab.Screen name="Cafeteria" component={CafeteriaStack} />

        <Tab.Screen name="Transport" component={TransportScreen} />

        <Tab.Screen name="Facilities" component={FacilityScreen} />

        <Tab.Screen name="Maintenance" component={MaintenanceScreen} />

      </Tab.Navigator>

    </NavigationContainer>

  );

}
