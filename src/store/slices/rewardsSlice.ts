import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reward } from '../../types';

interface RewardsState {
  collectedRewards: Reward[];
}

const initialState: RewardsState = {
  collectedRewards: [],
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    collectReward: (state, action: PayloadAction<Reward>) => {
      const exists = state.collectedRewards.find(
        r => r.id === action.payload.id,
      );
      if (!exists) {
        state.collectedRewards.push(action.payload);
      }
    },
  },
});

export const { collectReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;
