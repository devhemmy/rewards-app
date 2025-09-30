import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Reward } from '../types';

interface Props {
  item: Reward;
  isCollected: boolean;
  onCollect: (item: Reward) => void;
}

const RewardListItemComponent: React.FC<Props> = ({
  item,
  isCollected,
  onCollect,
}) => {
  const handleCollect = () => {
    onCollect(item);
  };

  return (
    <View style={[styles.container, isCollected && styles.collected]}>
      <Image source={{ uri: item.pictures[0].url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.points}>{item.needed_points} Points</Text>
      </View>
      {!isCollected && (
        <TouchableOpacity style={styles.button} onPress={handleCollect}>
          <Text style={styles.buttonText}>Collect</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  collected: {
    opacity: 0.5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export const RewardListItem = React.memo(RewardListItemComponent);
