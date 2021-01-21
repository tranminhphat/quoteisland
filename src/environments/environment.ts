// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  whitelistedDomains: ['localhost:3000'],
  blacklistedRoutes: ['localhost:3000/api/auth'],
  bannerImageUrls: {
    registerPage: './assets/banners/register.jpeg',
    loginPage: './assets/banners/login.jpeg',
    searchPage: './assets/banners/search.jpeg',
    aboutPage: './assets/banners/about.jpeg',
    notFoundPage: './assets/banners/not-found.jpeg',
    adminPage: './assets/banners/admin.jpeg',
    quotesPage: './assets/banners/quotes.jpeg',
    quoteDetailPage: './assets/banners/quote-detail.jpeg',
    authorsPage: './assets/banners/authors.jpeg',
    categoriesPage: './assets/banners/categories.jpeg',
  },
  defaultUserPhotoUrl: './assets/users/default.png',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
