export interface Restaurant {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  picture?: string;
  isOpen?: boolean;
  rating?: number;
  number_ratings?: number;
}
