import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { UserMarker } from '../../models/user-marker.model';
import { Restaurant } from '../../models/restaurant.model';
import { UserMarkerService } from '../user-marker/user-marker.service';

@Injectable({
  providedIn: 'root'
})
export class SearchRestaurantService {

  constructor(private mapsAPILoader: MapsAPILoader) { }

  getRestaurantsCoordinates(userMarker: UserMarker, radius: number): Promise<Restaurant[] | string> {
    return new Promise((resolve, reject) => {
      let errorMessage: string;
      if (UserMarkerService.check(userMarker) === true) {
        this.mapsAPILoader.load().then(() => {
          const places: any = new google.maps.places.PlacesService(document.createElement('div'));
          const location: any = new google.maps.LatLng(userMarker.latitude, userMarker.longitude);
          const request: any = {
            location: location,
            radius: radius,
            types: ['restaurant']
          };
          places.nearbySearch(request, (restaurantResults: any[], status: any) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              const restaurants: Restaurant[] = restaurantResults.map((restaurantResult: any) => ({
                id: restaurantResult.place_id,
                name: restaurantResult.name,
                latitude: restaurantResult.geometry.location.lat(),
                longitude: restaurantResult.geometry.location.lng(),
                address: restaurantResult.vicinity,
                isOpen: restaurantResult.opening_hours ?
                  restaurantResult.opening_hours.open_now ? restaurantResult.opening_hours.open_now : null : null,
                rating: restaurantResult.rating ? restaurantResult.rating : null,
                number_ratings: restaurantResult.user_ratings_total ? restaurantResult.user_ratings_total : null
              }));
              resolve(restaurants);
            } else {
              errorMessage = 'Google Places API returned an error!';
              reject(errorMessage);
            }
          });
        }).catch((error: any) => {
          errorMessage = 'Maps API Loader returned an error!';
          console.error('Error: ' + error);
          reject(errorMessage);
        });
      } else {
        errorMessage = 'userMarker object is not correct!';
        reject(errorMessage);
      }
    });
  }
}
