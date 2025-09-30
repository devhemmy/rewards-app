/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRewards } from '../api/rewardsService';
import { RewardListItem } from '../components/RewardListItem';
import { collectReward } from '../store/slices/rewardsSlice';
import { RootState, AppDispatch } from '../store';
import { Reward } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

const AvailableRewardsScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const collectedRewards = useSelector(
    (state: RootState) => state.rewards.collectedRewards,
  );
  const collectedRewardIds = new Set(collectedRewards.map(r => r.id));

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const getRewards = useCallback(
    async (pageNum: number) => {
      if (!hasMore) return;

      const isLoadingFirstPage = pageNum === 1;
      if (isLoadingFirstPage) setLoading(true);
      else setLoadingMore(true);

      setError(null);

      try {
        const { data } = await fetchRewards({ page: pageNum });
        if (data.length > 0) {
          setRewards(prev => {
            const allRewards = pageNum === 1 ? data : [...prev, ...data];
            const uniqueRewards = Array.from(
              new Map(allRewards.map(item => [item.id, item])).values(),
            );
            return uniqueRewards;
          });
        } else {
          setHasMore(false);
        }
      } catch (e) {
        setError('Failed to fetch rewards.');
      } finally {
        if (isLoadingFirstPage) setLoading(false);
        else setLoadingMore(false);
      }
    },
    [hasMore],
  );

  useEffect(() => {
    getRewards(1);
  }, []); // intentionally leave getRewards out of the dependency array

  const handleCollect = (item: Reward) => {
    dispatch(collectReward(item));
  };

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    getRewards(nextPage);
  };

  const renderItem = ({ item }: { item: Reward }) => (
    <RewardListItem
      item={item}
      isCollected={collectedRewardIds.has(item.id)}
      onCollect={handleCollect}
    />
  );

  if (loading && page === 1) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={rewards}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
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

export default AvailableRewardsScreen;
