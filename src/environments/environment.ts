// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  test_restoration: {
    back_api_base_url: 'https://test-restoration-back.herokuapp.com',
    authentication_google_resource_path: '/authentication/google',
    opinion_list: '/review/list',
    opinion_add: '/review/add'
  },
  api_key: 'AIzaSyB8jOSKqZ5Bre5C5zHgVedJgV8LLz-6w24',
  client_id: '78163528702-v3nnjkp8dbr7k43i90pd5bb4e5uatv1h.apps.googleusercontent.com',
  google_geolocation_api_base_url_resource_path: 'https://www.googleapis.com/geolocation/v1/geolocate'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
