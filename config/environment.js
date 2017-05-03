/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'xitomatl',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
        FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
        },
        EXTEND_PROTOTYPES: {
            // Prevent Ember Data from overriding Date.parse.
            Date: false
        }
    },
    
    firebase: {
        apiKey: 'AIzaSyBUyvaBZIgtmcJSItDgalXimSZ9cUVtzJ0',
        authDomain: 'rambutan-f0b55.firebaseapp.com',
        databaseURL: 'https://rambutan-f0b55.firebaseio.com',
        storageBucket: 'rambutan-f0b55.appspot.com',
        messagingSenderId: '75924350978'
    },
    
    torii: {
        sessionServiceName: 'session'
    },
    
    // if using ember-cli-content-security-policy
    // contentSecurityPolicy: {
    //     'script-src': "'self' 'unsafe-eval' apis.google.com",
    //     'frame-src': "'self' https://*.firebaseapp.com",
    //     'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com"
    // },


    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if(environment === 'development') {
    ENV.APP.API_HOST = 'http://localhost:4200';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
      ENV.APP.API_HOST = 'https://api.myproject.com';
      ENV.APP.API_NAMESPACE = 'v2';

  }

  return ENV;
};
