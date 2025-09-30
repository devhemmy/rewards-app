import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AvailableRewardsScreen from '../screens/AvailableRewardsScreen';
import CollectedRewardsScreen from '../screens/CollectedRewardsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Available" component={AvailableRewardsScreen} />
        <Tab.Screen name="Collected" component={CollectedRewardsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
