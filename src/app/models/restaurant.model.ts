export interface Restaurant {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  isOpen?: boolean;
  photo?: string;
  rating?: number;
  number_ratings?: number;
}
