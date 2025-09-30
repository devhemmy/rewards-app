export interface Picture {
  id: number;
  url: string;
}

export interface Reward {
  id: string;
  name: string;
  needed_points: number;
  pictures: Picture[];
}

export interface ApiResponse {
  data: Reward[];
}
