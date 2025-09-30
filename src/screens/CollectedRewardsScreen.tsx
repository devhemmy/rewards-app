import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { RewardListItem } from '../components/RewardListItem';
import { Reward } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

const CollectedRewardsScreen = () => {
  const collectedRewards = useSelector(
    (state: RootState) => state.rewards.collectedRewards,
  );

  const renderItem = ({ item }: { item: Reward }) => (
    <RewardListItem
      item={item}
      isCollected={true}
      onCollect={() => {}} // No action needed here
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {collectedRewards.length === 0 ? (
        <View style={styles.center}>
          <Text>No rewards collected yet.</Text>
        </View>
      ) : (
        <FlatList
          data={collectedRewards}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CollectedRewardsScreen;
