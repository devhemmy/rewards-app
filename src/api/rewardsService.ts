import { Reward, ApiResponse } from '../types';

const API_URL = 'https://staging.helloagain.at/api/v1/clients/5189/bounties';

interface FetchRewardsParams {
  page: number;
  limit?: number;
}

interface PaginatedResponse {
  results: Reward[];
}

export const fetchRewards = async ({
  page,
  limit = 10,
}: FetchRewardsParams): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}?limit=${limit}&page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseJson: PaginatedResponse = await response.json();
    const rewardsArray = responseJson.results;

    if (!Array.isArray(rewardsArray)) {
      throw new Error('API did not return a results array');
    }

    const filteredData = rewardsArray.filter(
      reward => reward.pictures && reward.pictures.length > 0,
    );

    return { data: filteredData };
  } catch (error) {
    console.error('Failed to fetch rewards:', error);
    throw error;
  }
};
