"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('motoshare-client/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTAdapter.extend({
    host: 'https://motoshare-v1.appspot.com',
    namespace: 'api'
  });
});
define('motoshare-client/app', ['exports', 'ember', 'motoshare-client/resolver', 'ember-load-initializers', 'motoshare-client/config/environment'], function (exports, _ember, _motoshareClientResolver, _emberLoadInitializers, _motoshareClientConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _motoshareClientConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _motoshareClientConfigEnvironment['default'].podModulePrefix,
    Resolver: _motoshareClientResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _motoshareClientConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('motoshare-client/breakpoints', ['exports'], function (exports) {
  exports['default'] = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 991px)',
    desktop: '(min-width: 992px) and (max-width: 1200px)'
  };
});
define("motoshare-client/components/-lf-get-outlet-state", ["exports", "liquid-fire/components/-lf-get-outlet-state"], function (exports, _liquidFireComponentsLfGetOutletState) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLfGetOutletState["default"];
    }
  });
});
define('motoshare-client/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'motoshare-client/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _motoshareClientConfigEnvironment) {

  var name = _motoshareClientConfigEnvironment['default'].APP.name;
  var version = _motoshareClientConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('motoshare-client/components/cycle-map', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        store: _ember['default'].inject.service(),
        displayCycles: function displayCycles() {
            var self = this;
            var cycles = this.get('store').findAll('motorcycle').then(function (motorcycle) {
                motorcycle.forEach(function (cycle) {
                    var make = cycle.get('make');
                    var lat = cycle.get('lat');
                    var lng = cycle.get('long');
                    var latlng = { lat: lat, lng: lng };
                    var model = cycle.get('model');
                    var thumb = cycle.get('media')[0];
                    self.createMarker(latlng, make, model, thumb);
                });
            });
        },
        createMarker: function createMarker(latlng, make, model, thumb) {
            var map = window.map;
            var icon = "https://storage.googleapis.com/motoshare-v1.appspot.com/general_gfx/icon_pin.png";
            var marker = new google.maps.Marker({
                position: latlng,
                icon: icon,
                animation: google.maps.Animation.DROP
            });

            var infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click', function () {
                var infoContent = '<h3>' + make + ' ' + model + '</h3>' + '<img src="' + thumb + '" width="200px"/><p>See More Details</p>';
                console.log(infoContent);
                infoWindow.setContent(infoContent);
                infoWindow.open(map, marker);
            });
            marker.setMap(map);
        },
        insertMap: (function () {
            var container = _ember['default'].$('.map-canvas')[0];
            var options = {
                center: new window.google.maps.LatLng(this.get('latitude'), this.get('longitude')),
                zoom: 15
            };

            window.map = new window.google.maps.Map(container, options);
            this.displayCycles();

            google.maps.event.addListener(map, 'click', function () {
                infoWindow.close();
            });
        }).on('didInsertElement')

    });
});
define('motoshare-client/components/cycle-pin', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({});
});
define("motoshare-client/components/illiquid-model", ["exports", "liquid-fire/components/illiquid-model"], function (exports, _liquidFireComponentsIlliquidModel) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsIlliquidModel["default"];
    }
  });
});
define("motoshare-client/components/liquid-bind", ["exports", "liquid-fire/components/liquid-bind"], function (exports, _liquidFireComponentsLiquidBind) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidBind["default"];
    }
  });
});
define("motoshare-client/components/liquid-child", ["exports", "liquid-fire/components/liquid-child"], function (exports, _liquidFireComponentsLiquidChild) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidChild["default"];
    }
  });
});
define("motoshare-client/components/liquid-container", ["exports", "liquid-fire/components/liquid-container"], function (exports, _liquidFireComponentsLiquidContainer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidContainer["default"];
    }
  });
});
define("motoshare-client/components/liquid-if", ["exports", "liquid-fire/components/liquid-if"], function (exports, _liquidFireComponentsLiquidIf) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidIf["default"];
    }
  });
});
define("motoshare-client/components/liquid-measured", ["exports", "liquid-fire/components/liquid-measured"], function (exports, _liquidFireComponentsLiquidMeasured) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured["default"];
    }
  });
  Object.defineProperty(exports, "measure", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured.measure;
    }
  });
});
define("motoshare-client/components/liquid-outlet", ["exports", "liquid-fire/components/liquid-outlet"], function (exports, _liquidFireComponentsLiquidOutlet) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidOutlet["default"];
    }
  });
});
define("motoshare-client/components/liquid-spacer", ["exports", "liquid-fire/components/liquid-spacer"], function (exports, _liquidFireComponentsLiquidSpacer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSpacer["default"];
    }
  });
});
define('motoshare-client/components/liquid-sync', ['exports', 'liquid-fire/components/liquid-sync'], function (exports, _liquidFireComponentsLiquidSync) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSync['default'];
    }
  });
});
define("motoshare-client/components/liquid-unless", ["exports", "liquid-fire/components/liquid-unless"], function (exports, _liquidFireComponentsLiquidUnless) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidUnless["default"];
    }
  });
});
define("motoshare-client/components/liquid-versions", ["exports", "liquid-fire/components/liquid-versions"], function (exports, _liquidFireComponentsLiquidVersions) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidVersions["default"];
    }
  });
});
define('motoshare-client/components/nav-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('motoshare-client/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
// app/controllers/application.js
define('motoshare-client/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service(),
    actions: {
      authenticate: function authenticate() {
        var _this = this;
        var credentials = this.getProperties('identification', 'password'),
            authenticator = 'authenticator:jwt';

        this.get('session').authenticate(authenticator, credentials).then(function () {
          _this.transitionToRoute('profile');
        }, function () {
          _this.set('errors', 'Oops, there was an error. Please check your email and password.');
        });
      }
    }
  });
});
define('motoshare-client/controllers/motorcycles', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('motoshare-client/controllers/passwordreset', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {
			passwordreset: function passwordreset() {
				var _this = this;
				var email = this.get('resetemail');
				_ember['default'].$.ajax('https://motoshare-v1.appspot.com/api/passwordreset', {
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					dataType: 'json',
					data: JSON.stringify({ email: email }),
					error: function error(response) {
						_this.set('errors', response.responseText);
					}
				});
			}
		}
	});
});
define('motoshare-client/controllers/profile', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service(),
    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
});
define('motoshare-client/controllers/register', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		confirmSame: (function () {
			var password = this.get('newpassword');
			var match = this.get('repeatpassword');
			if (password === match) {
				return true;
			} else {
				return false;
			}
		}).property('newpassword', 'repeatpassword'),

		actions: {
			register: function register() {
				var _this = this;
				var firstName = this.get('firstName');
				var lastName = this.get('lastName');
				var email = this.get('newEmail');
				var password = this.get('newpassword');
				_ember['default'].$.ajax('https://motoshare-v1.appspot.com/api/register', {
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					dataType: 'json',
					data: JSON.stringify({ fname: firstName, lname: lastName, email: email, password: password }),
					error: function error(response) {
						_this.set('errors', response.responseText);
					}
				}).then(function (message) {
					var notice = _ember['default'].get(message, 'message');
					_this.transitionToRoute('login').then(function (newRoute) {
						newRoute.controller.set('notice', notice);
					});
				});
			}
		}
	});
});
define('motoshare-client/helpers/errors-text', ['exports', 'ember'], function (exports, _ember) {
  exports.errorsText = errorsText;

  function errorsText(params) {
    return params[0].replace(/"|{|}|:|message/g, '');
  }

  exports['default'] = _ember['default'].Helper.helper(errorsText);
});
define('motoshare-client/helpers/lf-lock-model', ['exports', 'liquid-fire/helpers/lf-lock-model'], function (exports, _liquidFireHelpersLfLockModel) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel['default'];
    }
  });
  Object.defineProperty(exports, 'lfLockModel', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel.lfLockModel;
    }
  });
});
define('motoshare-client/helpers/lf-or', ['exports', 'liquid-fire/helpers/lf-or'], function (exports, _liquidFireHelpersLfOr) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr['default'];
    }
  });
  Object.defineProperty(exports, 'lfOr', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr.lfOr;
    }
  });
});
define('motoshare-client/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('motoshare-client/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('motoshare-client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'motoshare-client/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _motoshareClientConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_motoshareClientConfigEnvironment['default'].APP.name, _motoshareClientConfigEnvironment['default'].APP.version)
  };
});
define('motoshare-client/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('motoshare-client/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('motoshare-client/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('motoshare-client/initializers/ember-simple-auth', ['exports', 'ember', 'motoshare-client/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _motoshareClientConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _motoshareClientConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _motoshareClientConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('motoshare-client/initializers/export-application-global', ['exports', 'ember', 'motoshare-client/config/environment'], function (exports, _ember, _motoshareClientConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_motoshareClientConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _motoshareClientConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_motoshareClientConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('motoshare-client/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("motoshare-client/initializers/liquid-fire", ["exports", "liquid-fire/ember-internals"], function (exports, _liquidFireEmberInternals) {

  (0, _liquidFireEmberInternals.initialize)();

  exports["default"] = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };
});
define('motoshare-client/initializers/responsive', ['exports', 'ember-responsive/initializers/responsive'], function (exports, _emberResponsiveInitializersResponsive) {

  /**
   * Ember responsive initializer
   *
   * Supports auto injecting media service app-wide.
   *
   * Generated by the ember-responsive addon. Customize initialize to change
   * injection.
   */

  exports['default'] = {
    name: 'responsive',
    initialize: _emberResponsiveInitializersResponsive.initialize
  };
});
define('motoshare-client/initializers/simple-auth-token', ['exports', 'ember-simple-auth-token/authenticators/token', 'ember-simple-auth-token/authenticators/jwt', 'ember-simple-auth-token/authorizers/token', 'ember-simple-auth-token/configuration', 'motoshare-client/config/environment'], function (exports, _emberSimpleAuthTokenAuthenticatorsToken, _emberSimpleAuthTokenAuthenticatorsJwt, _emberSimpleAuthTokenAuthorizersToken, _emberSimpleAuthTokenConfiguration, _motoshareClientConfigEnvironment) {

  /**
    Ember Simple Auth Token's Initializer.
    By default load both the Token and JWT (with refresh) Authenticators.
  */
  exports['default'] = {
    name: 'ember-simple-auth-token',
    before: 'ember-simple-auth',
    initialize: function initialize(container) {
      _emberSimpleAuthTokenConfiguration['default'].load(container, _motoshareClientConfigEnvironment['default']['ember-simple-auth-token'] || {});
      container.register('authorizer:token', _emberSimpleAuthTokenAuthorizersToken['default']);
      container.register('authenticator:token', _emberSimpleAuthTokenAuthenticatorsToken['default']);
      container.register('authenticator:jwt', _emberSimpleAuthTokenAuthenticatorsJwt['default']);
    }
  };
});
define('motoshare-client/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('motoshare-client/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("motoshare-client/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('motoshare-client/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('motoshare-client/models/motorcycle', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		LIC: _emberData['default'].attr('string'),
		VIN: _emberData['default'].attr('string'),
		category: _emberData['default'].attr('string'),
		color: _emberData['default'].attr('string'),
		isCompleted: _emberData['default'].attr('boolean'),
		lat: _emberData['default'].attr(),
		long: _emberData['default'].attr(),
		make: _emberData['default'].attr('string'),
		media: _emberData['default'].attr(),
		mileage: _emberData['default'].attr('number'),
		model: _emberData['default'].attr('string'),
		year: _emberData['default'].attr('number')
	});
});
define('motoshare-client/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('motoshare-client/router', ['exports', 'ember', 'motoshare-client/config/environment'], function (exports, _ember, _motoshareClientConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _motoshareClientConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('login');
    this.route('register');
    this.route('profile');
    this.route('motorcycles');
    this.route('passwordreset');
  });

  exports['default'] = Router;
});
define('motoshare-client/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default']);
});
define('motoshare-client/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('motoshare-client/routes/motorcycles', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('motorcycle');
    }
  });
});
define('motoshare-client/routes/passwordreset', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('motoshare-client/routes/profile', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {});
});
define('motoshare-client/routes/register', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('motoshare-client/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("motoshare-client/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _liquidFireTransitionMap) {
  exports["default"] = _liquidFireTransitionMap["default"];
});
define('motoshare-client/services/media', ['exports', 'ember-responsive/media'], function (exports, _emberResponsiveMedia) {
  exports['default'] = _emberResponsiveMedia['default'];
});
define('motoshare-client/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('motoshare-client/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("motoshare-client/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "WwsINBN5", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"liquid-outlet\"]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"liquid-outlet\"],[\"login\"],null],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"liquid-outlet\"],[\"register\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/application.hbs" } });
});
define("motoshare-client/templates/components/cycle-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fOV23r15", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"map-canvas\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/components/cycle-map.hbs" } });
});
define("motoshare-client/templates/components/cycle-pin", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pHpYOafA", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/components/cycle-pin.hbs" } });
});
define("motoshare-client/templates/components/nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "sU76rmKy", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"comment\",\" Brand and toggle get grouped for better mobile display \"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle collapsed\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#bs-example-navbar-collapse-1\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"navbar-brand\"],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/navbar_logo.png\"],[\"static-attr\",\"height\",\"50px\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"comment\",\" Collect the nav links, forms, and other content for toggling \"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"bs-example-navbar-collapse-1\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"active\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Map \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"(current)\"],[\"close-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"List\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"navbar-form navbar-left\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"text\"],[\"static-attr\",\"class\",\"form-control\"],[\"static-attr\",\"placeholder\",\"Enter Zip Code\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"flush-element\"],[\"text\",\"Search\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Messages\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"dropdown-toggle\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"role\",\"button\"],[\"static-attr\",\"aria-haspopup\",\"true\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"text\",\"Account \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"caret\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"dropdown-menu\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"My Motorcycles\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Rental History\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Account Info\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"role\",\"separator\"],[\"static-attr\",\"class\",\"divider\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Log Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"comment\",\" /.navbar-collapse \"],[\"text\",\"\\n  \"],[\"close-element\"],[\"comment\",\" /.container-fluid \"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/components/nav-bar.hbs" } });
});
define("motoshare-client/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3mujR5Ja", "block": "{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site registerBG\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logo.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"static-attr\",\"style\",\"padding-bottom:20px; padding-left:50px;\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"login\"],null,1],[\"block\",[\"link-to\"],[\"register\"],null,0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-lg btn-white-outline\"],[\"flush-element\"],[\"text\",\"Register\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-lg btn-white-outline buttonspacer\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/index.hbs" } });
});
define("motoshare-client/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EMrSeUE8", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"media\",\"isMobile\"]]],null,9,4]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Forgot Password?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Need to register?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site loginBG\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,3],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,2],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"authenticate\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"identification\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"identification\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"type\",\"placeholder\",\"value\",\"required\"],[\"password\",\"form-control input-lg\",\"password\",\"Password\",[\"get\",[\"password\"]],true]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"register\"],[[\"class\"],[\"pull-left\"]],1],[\"block\",[\"link-to\"],[\"passwordreset\"],[[\"class\"],[\"pull-right\"]],0],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Forgot Password?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Need to register?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site mobileloginBG\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form-mobile\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,8],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,7],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"authenticate\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"identification\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"identification\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"type\",\"placeholder\",\"value\",\"required\"],[\"password\",\"form-control input-lg\",\"password\",\"Password\",[\"get\",[\"password\"]],true]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"register\"],[[\"class\"],[\"pull-left\"]],6],[\"block\",[\"link-to\"],[\"passwordreset\"],[[\"class\"],[\"pull-right\"]],5],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/login.hbs" } });
});
define("motoshare-client/templates/motorcycles", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "CY6XUDOS", "block": "{\"statements\":[[\"open-element\",\"body\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"nav-bar\"]],false],[\"text\",\"\\n\"],[\"block\",[\"cycle-map\"],null,[[\"latitude\",\"longitude\"],[\"37.4652743\",\"-122.4378986\"]],1],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[],\"locals\":[\"motorcycle\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/motorcycles.hbs" } });
});
define("motoshare-client/templates/passwordreset", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YnGiu+DT", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"media\",\"isMobile\"]]],null,11,5]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Log In.\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Need to register?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Please enter the email address you used to register:\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"passwordreset\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"resetemail\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"resetemail\"]],true]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Reset Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"text-success\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site resetBG\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,4],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,3,2],[\"block\",[\"link-to\"],[\"register\"],[[\"class\"],[\"pull-left\"]],1],[\"block\",[\"link-to\"],[\"login\"],[[\"class\"],[\"pull-right\"]],0],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Log In.\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Need to register?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Please enter the email address you used to register:\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"passwordreset\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"resetemail\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"resetemail\"]],true]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Reset Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"text-success\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site mobileloginBG\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form-mobile\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,10],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,9,8],[\"block\",[\"link-to\"],[\"register\"],[[\"class\"],[\"pull-left\"]],7],[\"block\",[\"link-to\"],[\"login\"],[[\"class\"],[\"pull-right\"]],6],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/passwordreset.hbs" } });
});
define("motoshare-client/templates/profile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "zMC9lA5d", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Profile Page!\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"menu\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,2,1],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Login\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"block\",[\"link-to\"],[\"login\"],null,0],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"a\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"invalidateSession\"]],[\"flush-element\"],[\"text\",\"Logout\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/profile.hbs" } });
});
define("motoshare-client/templates/register", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "45YZBVdB", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"media\",\"isMobile\"]]],null,11,5]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Already have an account?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"text\",\"Passwords do not match.\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h2\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site indexBG\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,4],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,3],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"register\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"firstName\",\"form-control input-lg\",\"First Name\",[\"get\",[\"firstName\"]],true]]],false],[\"text\",\"\\n\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"lastName\",\"form-control input-lg\",\"Last Name\",[\"get\",[\"lastName\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"newEmail\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"newEmail\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"type\",\"placeholder\",\"value\",\"required\"],[\"newpassword\",\"form-control input-lg\",\"password\",\"Password\",[\"get\",[\"newpassword\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"type\",\"placeholder\",\"value\",\"required\"],[\"repeatpassword\",\"form-control input-lg\",\"password\",\"Repeat Password\",[\"get\",[\"repeatpassword\"]],true]]],false],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"confirmSame\"]]],null,2,1],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Register\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"login\"],[[\"class\"],[\"pull-left\"]],0],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Already have an account?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"text\",\"Passwords do not match.\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h2\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site mobileloginBG\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form-mobile\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,10],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,9],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"register\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"firstName\",\"form-control input-lg\",\"First Name\",[\"get\",[\"firstName\"]],true]]],false],[\"text\",\"\\n\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"lastName\",\"form-control input-lg\",\"Last Name\",[\"get\",[\"lastName\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"newEmail\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"newEmail\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"type\",\"placeholder\",\"value\",\"required\"],[\"newpassword\",\"form-control input-lg\",\"password\",\"Password\",[\"get\",[\"newpassword\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"type\",\"placeholder\",\"value\",\"required\"],[\"repeatpassword\",\"form-control input-lg\",\"password\",\"Repeat Password\",[\"get\",[\"repeatpassword\"]],true]]],false],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"confirmSame\"]]],null,8,7],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Register\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"login\"],[[\"class\"],[\"pull-left\"]],6],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/register.hbs" } });
});
define('motoshare-client/transitions', ['exports'], function (exports) {
  exports['default'] = function () {
    this.transition(this.fromRoute('index'), this.toRoute('login'), this.use('toUp'), this.reverse('toDown'));
    this.transition(this.fromRoute('index'), this.toRoute('register'), this.use('toUp'), this.reverse('toDown'));
    this.transition(this.fromRoute('login'), this.toRoute('register'), this.use('toUp'), this.reverse('toDown'));
    this.transition(this.fromRoute('login'), this.toRoute('passwordreset'), this.use('toUp'), this.reverse('toDown'));
  };
});
define('motoshare-client/transitions/cross-fade', ['exports', 'liquid-fire/transitions/cross-fade'], function (exports, _liquidFireTransitionsCrossFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsCrossFade['default'];
    }
  });
});
define('motoshare-client/transitions/default', ['exports', 'liquid-fire/transitions/default'], function (exports, _liquidFireTransitionsDefault) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsDefault['default'];
    }
  });
});
define('motoshare-client/transitions/explode', ['exports', 'liquid-fire/transitions/explode'], function (exports, _liquidFireTransitionsExplode) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsExplode['default'];
    }
  });
});
define('motoshare-client/transitions/fade', ['exports', 'liquid-fire/transitions/fade'], function (exports, _liquidFireTransitionsFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFade['default'];
    }
  });
});
define('motoshare-client/transitions/flex-grow', ['exports', 'liquid-fire/transitions/flex-grow'], function (exports, _liquidFireTransitionsFlexGrow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlexGrow['default'];
    }
  });
});
define('motoshare-client/transitions/fly-to', ['exports', 'liquid-fire/transitions/fly-to'], function (exports, _liquidFireTransitionsFlyTo) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlyTo['default'];
    }
  });
});
define('motoshare-client/transitions/move-over', ['exports', 'liquid-fire/transitions/move-over'], function (exports, _liquidFireTransitionsMoveOver) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsMoveOver['default'];
    }
  });
});
define('motoshare-client/transitions/scale', ['exports', 'liquid-fire/transitions/scale'], function (exports, _liquidFireTransitionsScale) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScale['default'];
    }
  });
});
define('motoshare-client/transitions/scroll-then', ['exports', 'liquid-fire/transitions/scroll-then'], function (exports, _liquidFireTransitionsScrollThen) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScrollThen['default'];
    }
  });
});
define('motoshare-client/transitions/to-down', ['exports', 'liquid-fire/transitions/to-down'], function (exports, _liquidFireTransitionsToDown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToDown['default'];
    }
  });
});
define('motoshare-client/transitions/to-left', ['exports', 'liquid-fire/transitions/to-left'], function (exports, _liquidFireTransitionsToLeft) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToLeft['default'];
    }
  });
});
define('motoshare-client/transitions/to-right', ['exports', 'liquid-fire/transitions/to-right'], function (exports, _liquidFireTransitionsToRight) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToRight['default'];
    }
  });
});
define('motoshare-client/transitions/to-up', ['exports', 'liquid-fire/transitions/to-up'], function (exports, _liquidFireTransitionsToUp) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToUp['default'];
    }
  });
});
define('motoshare-client/transitions/wait', ['exports', 'liquid-fire/transitions/wait'], function (exports, _liquidFireTransitionsWait) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsWait['default'];
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('motoshare-client/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"motoshare-client","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"motoshare-client","version":"0.0.0+a4320123"},"ember-simple-auth-token":{"serverTokenEndpoint":"https://motoshare-v1.appspot.com/api/login/","identificationField":"email","passwordField":"password","tokenPropertyName":"access_token","timeFactor":1000,"authorizationPrefix":"Bearer ","authorizationHeaderName":"Authorization","headers":{}},"contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com","font-src":"'self' fonts.gstatic.com","connect-src":"'self' maps.gstatic.com","img-src":"'self' *.googleapis.com maps.gstatic.com csi.gstatic.com","style-src":"'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"},"exportApplicationGlobal":true}};
});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("motoshare-client/app")["default"].create({"name":"motoshare-client","version":"0.0.0+a4320123"});
}

/* jshint ignore:end */
//# sourceMappingURL=motoshare-client.map
