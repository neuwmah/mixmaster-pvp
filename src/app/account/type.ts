export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: string;
  status: string;
  last_connection: {
    time: string;
    ip: string;
  };
  characters: {
    id: number;
    name: string;
    class: string;
    status: string;
    level: number;
    map: string;
    exp: number;
    gold: number;
    attributes: {
      energy: number;
      agility: number;
      accuracy: number;
      luck: number;
    };
    free_points: number;
    created_at: string;
  }[];
  shop: {
    online_points: number;
  };
};
