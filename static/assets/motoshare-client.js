"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('motoshare-client/adapters/application', ['exports', 'ember-data', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _emberSimpleAuthMixinsDataAdapterMixin) {
  exports['default'] = _emberData['default'].RESTAdapter.extend({
    //host: 'http://localhost:8080',
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
define('motoshare-client/components/active-link', ['exports', 'ember-cli-active-link-wrapper/components/active-link'], function (exports, _emberCliActiveLinkWrapperComponentsActiveLink) {
  exports['default'] = _emberCliActiveLinkWrapperComponentsActiveLink['default'];
});
define('motoshare-client/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'motoshare-client/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _motoshareClientConfigEnvironment) {

  var name = _motoshareClientConfigEnvironment['default'].APP.name;
  var version = _motoshareClientConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('motoshare-client/components/bm-menu-item', ['exports', 'ember-burger-menu/components/bm-menu-item'], function (exports, _emberBurgerMenuComponentsBmMenuItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBurgerMenuComponentsBmMenuItem['default'];
    }
  });
});
define('motoshare-client/components/bm-menu', ['exports', 'ember-burger-menu/components/bm-menu'], function (exports, _emberBurgerMenuComponentsBmMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBurgerMenuComponentsBmMenu['default'];
    }
  });
});
define('motoshare-client/components/bm-outlet', ['exports', 'ember-burger-menu/components/bm-outlet'], function (exports, _emberBurgerMenuComponentsBmOutlet) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBurgerMenuComponentsBmOutlet['default'];
    }
  });
});
define('motoshare-client/components/burger-menu', ['exports', 'ember-burger-menu/components/burger-menu'], function (exports, _emberBurgerMenuComponentsBurgerMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBurgerMenuComponentsBurgerMenu['default'];
    }
  });
});
define('motoshare-client/components/cycle-map', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        messageBus: _ember['default'].inject.service('message-bus'),
        store: _ember['default'].inject.service(),
        popup: _ember['default'].inject.service,
        geolocation: _ember['default'].inject.service(),
        currentLocation: '',
        init: function init() {
            this._super.apply(this, arguments);
            var _this = this;
            this.get('messageBus').subscribe('setCoords', this, this.setCoords);
            // this.get('geolocation').getLocation().then(function(geoObject) {
            //         console.log(geoObject);
            //         var lat = geoObject.coords.latitude;
            //         var lng = geoObject.coords.longitude;
            //         _this.setCoords(lat, lng);
            //     });
        },
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
                    var id = cycle.get('id');
                    self.createMarker(latlng, make, model, thumb, id);
                });
            });
        },
        createMarker: function createMarker(latlng, make, model, thumb, id) {
            var map = window.map;
            var icon = "https://storage.googleapis.com/motoshare-v1.appspot.com/general_gfx/icon_pin.png";
            var marker = new google.maps.Marker({
                position: latlng,
                icon: icon,
                animation: google.maps.Animation.DROP
            });

            var infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click', function () {
                var infoContent = '<div class="iw-container"><h3 class="iw-title">' + make + ' ' + model + '</h3>' + '<img src="' + thumb + '" width="200px"/></div><a href="/motorcycle/' + id + '"><p>See More Info</p></a>';
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
                zoom: 10
            };

            window.map = new window.google.maps.Map(container, options);
            this.displayCycles();

            google.maps.event.addListener(map, 'click', function () {
                infoWindow.close();
            });
        }).on('didInsertElement'),

        setCoords: function setCoords(lat, lng) {
            this.set('latitude', lat);
            this.set('longitude', lng);
            this.insertMap();
        },

        actions: {}
    });
});
define('motoshare-client/components/cycle-pin', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({});
});
define('motoshare-client/components/ember-remodal', ['exports', 'ember-remodal/components/ember-remodal'], function (exports, _emberRemodalComponentsEmberRemodal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRemodalComponentsEmberRemodal['default'];
    }
  });
});
define('motoshare-client/components/ember-remodal/er-button', ['exports', 'ember-remodal/components/er-button'], function (exports, _emberRemodalComponentsErButton) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRemodalComponentsErButton['default'];
    }
  });
});
define('motoshare-client/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('motoshare-client/components/file-field', ['exports', 'ember-uploader/components/file-field'], function (exports, _emberUploaderComponentsFileField) {
  exports['default'] = _emberUploaderComponentsFileField['default'];
});
define('motoshare-client/components/file-upload', ['exports', 'ember-uploader'], function (exports, _emberUploader) {
  exports['default'] = _emberUploader['default'].FileField.extend({
    url: '',
    init: function init() {
      this._super.apply(this, arguments);
      this.errors = [];
      var _this = this;
      var getUrl = $.getJSON("https://motoshare-v1.appspot.com/api/photo/upload").then(function (message) {
        var uploadUri = Ember.get(message, 'message');
        console.log(uploadUri);
        _this.setProperties({ url: uploadUri });
      });
    },

    filesDidChange: function filesDidChange(files) {
      var _this = this;
      var url = this.get('url');
      var motorcycleid = this.get('uid');
      var uploader = _emberUploader['default'].Uploader.create({
        url: this.get('url'),
        motorcycleid: this.get('motorcycleid')
      });

      if (!Ember.isEmpty(files)) {
        // this second argument is optional and can to be sent as extra data with the upload
        uploader.upload(files, { motorcycleid: motorcycleid });
      }
      uploader.on('progress', function (e) {
        _this.sendAction('onProgress', e);
      });
      uploader.on('didUpload', function (e) {
        _this.sendAction('onComplete', e);
      });
    }
  });
});
define('motoshare-client/components/from-elsewhere', ['exports', 'ember-elsewhere/components/from-elsewhere'], function (exports, _emberElsewhereComponentsFromElsewhere) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberElsewhereComponentsFromElsewhere['default'];
    }
  });
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
	exports['default'] = _ember['default'].Component.extend({
		messageBus: _ember['default'].inject.service('message-bus'),
		session: _ember['default'].inject.service(),
		init: function init() {
			this._super.apply(this, arguments);
		},
		actions: {
			invalidateSession: function invalidateSession() {
				this.get('session').invalidate();
			},
			listView: function listView() {
				this.get('messageBus').publish('listView');
			},
			mapView: function mapView() {
				this.get('messageBus').publish('mapView');
			},
			focused: function focused() {
				this.set('errors', null);
			},
			searchZip: function searchZip() {
				this.set('errors', null);
				var _this = this;
				var zip = this.get('zip');
				var url = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + zip + '&sensor=false';
				console.log(zip);
				$.ajax({
					url: url,
					type: 'GET'
				}).then(function (response) {
					console.log(response);
					if (response.status === "ZERO_RESULTS") {
						_this.set('errors', '    Make sure to enter a valid zip code.');
					}
					var lat = response.results[0].geometry.location.lat;
					var lng = response.results[0].geometry.location.lng;
					_this.get('messageBus').publish('setCoords', lat, lng);
				});
			}
		}
	});
});
define('motoshare-client/components/pikaday-input', ['exports', 'ember', 'ember-pikaday/components/pikaday-input'], function (exports, _ember, _emberPikadayComponentsPikadayInput) {
  exports['default'] = _emberPikadayComponentsPikadayInput['default'];
});
define('motoshare-client/components/pikaday-inputless', ['exports', 'ember-pikaday/components/pikaday-inputless'], function (exports, _emberPikadayComponentsPikadayInputless) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPikadayComponentsPikadayInputless['default'];
    }
  });
});
define('motoshare-client/components/swiper-container', ['exports', 'ember-cli-swiper/components/swiper-container'], function (exports, _emberCliSwiperComponentsSwiperContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSwiperComponentsSwiperContainer['default'];
    }
  });
});
define('motoshare-client/components/swiper-slide', ['exports', 'ember-cli-swiper/components/swiper-slide'], function (exports, _emberCliSwiperComponentsSwiperSlide) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSwiperComponentsSwiperSlide['default'];
    }
  });
});
define('motoshare-client/components/to-elsewhere', ['exports', 'ember-elsewhere/components/to-elsewhere'], function (exports, _emberElsewhereComponentsToElsewhere) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberElsewhereComponentsToElsewhere['default'];
    }
  });
});
define('motoshare-client/controllers/app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service(),
    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
});
define('motoshare-client/controllers/app/addmotorcycle', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		session: _ember['default'].inject.service(),
		messageBus: _ember['default'].inject.service('message-bus'),
		latitude: '',
		longitude: '',
		init: function init() {
			this._super.apply(this, arguments);
			this.get('messageBus').subscribe('bikeCoords', this, this.setCoords);
		},
		getCoords: function getCoords(street, city, state) {
			var _this = this;
			var coords = street + city + state;
			var url = 'https://maps.google.com/maps/api/geocode/json?address=' + coords;
			return _ember['default'].$.ajax({
				url: url,
				type: 'GET',
				success: function success(response) {
					var lat = response.results[0].geometry.location.lat;
					var lng = response.results[0].geometry.location.lng;
					_this.get('messageBus').publish('bikeCoords', lat, lng);
				}
			});
		},
		setCoords: function setCoords(lat, lng) {
			this.set('latitude', lat);
			this.set('longitude', lng);
			//this.insertMap();
		},
		actions: {
			setStart: function setStart(value) {
				this.set('setStart', value);
			},
			setEnd: function setEnd(value) {
				this.set('setEnd', value);
			},
			addmotorcycle: function addmotorcycle() {
				var _this, year, make, model, cc, category, startDate, endDate, availableDates, street, isCompleted, uid, price, authToken, city, state, coords, latitude, longitude;

				return regeneratorRuntime.async(function addmotorcycle$(context$1$0) {
					while (1) switch (context$1$0.prev = context$1$0.next) {
						case 0:
							_this = this;
							year = parseInt(this.get('year'));
							make = this.get('make');
							model = this.get('model');
							cc = this.get('cc');
							category = document.getElementById('category').value;
							startDate = this.get('setStart');
							endDate = this.get('setEnd');
							availableDates = { startDate: startDate, endDate: endDate };
							street = this.get('street');

							if (street) {
								street = street.replace(/\s+/g, '');
							}
							isCompleted = this.get('isCompleted');
							uid = this.get('session.data.authenticated.uid');
							price = parseInt(this.get('price'));
							authToken = this.get('session.data.authenticated.access_token');
							city = this.get('city');
							state = this.get('state');
							context$1$0.next = 19;
							return regeneratorRuntime.awrap(this.get('getCoords').call(this, street, city, state));

						case 19:
							coords = context$1$0.sent;
							latitude = this.get('latitude');
							longitude = this.get('longitude');

							_ember['default'].$.ajax( /*'http://localhost:8080/api/addmotorcycle'*/'https://motoshare-v1.appspot.com/api/addmotorcycle', {
								type: 'POST',
								contentType: 'application/json; charset=utf-8',
								dataType: 'json',
								data: JSON.stringify({ year: year, make: make, model: model, cc: cc, category: category,
									availableDates: availableDates, isCompleted: isCompleted, uid: uid,
									latitude: latitude, longitude: longitude, price: price }),
								beforeSend: function beforeSend(xhr) {
									xhr.setRequestHeader("Authorization", "Bearer " + authToken);
								},
								error: function error(response) {
									_this.set('errors', response.responseText);
								}
							}).then(function (message) {
								var route = message.next;
								console.log(route);
								debugger;
								_this.transitionToRoute('motorcycle', route);
							});

						case 23:
						case 'end':
							return context$1$0.stop();
					}
				}, null, this);
			}
		}
	});
});

//var VIN = this.get('vin');
//var license = this.get('license');

//var color = this.get('color');
//var description = this.get('description');
define('motoshare-client/controllers/app/profile', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('motoshare-client/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service(),
    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
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
          _this.transitionToRoute('app.profile');
        }, function () {
          _this.set('errors', 'Oops, there was an error. Please check your email and password.');
        });
      }
    }
  });
});
define('motoshare-client/controllers/motorcycle', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service(),
    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
});
define('motoshare-client/controllers/motorcycle/index', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		remodal: _ember['default'].inject.service(),
		session: _ember['default'].inject.service(),
		closeModal: function closeModal() {
			this.get('remodal').close();
		},

		actions: {
			fileUploadProgress: function fileUploadProgress(e) {
				this.set('uploadPercentage', e.percent.toFixed(2));
			},
			fileUploadComplete: function fileUploadComplete(e) {
				this.set('uploadPercentage', 0);
				this.closeModal();
			}
		}
	});
});
define('motoshare-client/controllers/motorcycles', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        messageBus: _ember['default'].inject.service('message-bus'),
        session: _ember['default'].inject.service(),
        map: true,
        init: function init() {
            this._super.apply(this, arguments);
            this.get('messageBus').subscribe('mapView', this, this.setMap);
            this.get('messageBus').subscribe('listView', this, this.setList);
        },

        isUser: (function () {
            return true;
        }).property('model.uid'),

        setMap: function setMap() {
            this.set('map', true);
        },
        setList: function setList() {
            this.set('map', false);
        },
        actions: {
            invalidateSession: function invalidateSession() {
                this.get('session').invalidate();
            },
            listView: function listView() {
                this.get('messageBus').publish('listView');
            },
            mapView: function mapView() {
                this.get('messageBus').publish('mapView');
            },
            focused: function focused() {
                this.set('errors', null);
            },
            searchZip: function searchZip() {
                this.set('errors', null);
                var _this = this;
                var zip = this.get('zip');
                var url = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + zip + '&sensor=false';
                console.log(zip);
                $.ajax({
                    url: url,
                    type: 'GET'
                }).then(function (response) {
                    console.log(response);
                    if (response.status === "ZERO_RESULTS") {
                        _this.set('errors', '    Make sure to enter a valid zip code.');
                    }
                    var lat = response.results[0].geometry.location.lat;
                    var lng = response.results[0].geometry.location.lng;
                    _this.get('messageBus').publish('setCoords', lat, lng);
                });
            }
        }
    });
});
define('motoshare-client/controllers/passwordreset', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {
			passwordreset: function passwordreset() {
				var _this = this;
				var email = this.get('resetemail');
				_ember['default'].$.ajax( /*'http://localhost:8080/api/passwordreset' */'https://motoshare-v1.appspot.com/api/passwordreset', {
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
				_ember['default'].$.ajax( /*'http://localhost:8080/api/register'*/'https://motoshare-v1.appspot.com/api/register', {
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
define('motoshare-client/mixins/active-link', ['exports', 'ember-cli-active-link-wrapper/mixins/active-link'], function (exports, _emberCliActiveLinkWrapperMixinsActiveLink) {
  exports['default'] = _emberCliActiveLinkWrapperMixinsActiveLink['default'];
});
define('motoshare-client/models/motorcycle', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		LIC: _emberData['default'].attr('string'),
		VIN: _emberData['default'].attr('string'),
		availabledates: _emberData['default'].attr(),
		description: _emberData['default'].attr(),
		price: _emberData['default'].attr(),
		category: _emberData['default'].attr('string'),
		color: _emberData['default'].attr('string'),
		isCompleted: _emberData['default'].attr('boolean'),
		lat: _emberData['default'].attr(),
		long: _emberData['default'].attr(),
		make: _emberData['default'].attr('string'),
		media: _emberData['default'].attr(),
		mileage: _emberData['default'].attr('number'),
		model: _emberData['default'].attr('string'),
		year: _emberData['default'].attr('number'),
		uid: _emberData['default'].attr('number')
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
    this.route('motorcycles');
    this.route('motorcycle', { path: '/motorcycle/:motorcycle_id' }, function () {
      this.route('edit');
      this.route('rental');
    });
    this.route('passwordreset');
    this.route('app', function () {
      this.route('mymotorcycles');
      this.route('profile');
      this.route('addmotorcycle');
    });
    this.route('not-found', { path: '/*path' });
  });

  exports['default'] = Router;
});
define('motoshare-client/routes/app', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {});
});
define('motoshare-client/routes/app/addmotorcycle', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {});
});
define('motoshare-client/routes/app/mymotorcycles', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		session: _ember['default'].inject.service(),
		model: function model() {
			var uid = this.get('session.data.authenticated.uid');
			console.log(uid);
			return this.store.findAll('motorcycle').then(function (results) {
				return results.filter(function (motorcycle) {
					return motorcycle.get('uid') === uid;
				});
			});
		}
	});
});
define('motoshare-client/routes/app/profile', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {});
});
define('motoshare-client/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default']);
});
define('motoshare-client/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('motoshare-client/routes/motorcycle', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		session: _ember['default'].inject.service('session'),
		model: function model(params) {
			return this.get('store').findRecord('motorcycle', params.motorcycle_id);
		}
	});
});
define('motoshare-client/routes/motorcycle/edit', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {});
});
define('motoshare-client/routes/motorcycle/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('motoshare-client/routes/motorcycle/rental', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('motoshare-client/routes/motorcycles', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    geolocation: _ember['default'].inject.service(),
    lat: null,
    model: function model() {
      var _this = this;
      return _ember['default'].RSVP.hash({
        motorcycles: this.store.findAll('motorcycle')
      });
    },

    // coords: this.get('geolocation').getLocation().then(function(geoObject) {
    //     	var lat = geoObject.coords.latitude;
    //    		var lng = geoObject.coords.longitude;
    //    		_this.set('lat', lat);
    //    		_this.set('lng', lng);
    //    	}),
    setupController: function setupController(controller, models) {
      controller.set('motorcycle', models.motorcycles);
      controller.set('lat', 37.7749 /*this.get('lat')*/);
      controller.set('lng', -122.4194 /*this.get('lng')*/);
    }
  });
});
define('motoshare-client/routes/not-found', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('motoshare-client/routes/passwordreset', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
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
define('motoshare-client/services/burger-menu', ['exports', 'ember-burger-menu/services/burger-menu'], function (exports, _emberBurgerMenuServicesBurgerMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBurgerMenuServicesBurgerMenu['default'];
    }
  });
});
define('motoshare-client/services/ember-elsewhere', ['exports', 'ember-elsewhere/services/ember-elsewhere'], function (exports, _emberElsewhereServicesEmberElsewhere) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberElsewhereServicesEmberElsewhere['default'];
    }
  });
});
define('motoshare-client/services/geolocation', ['exports', 'ember-cli-geo/services/geolocation'], function (exports, _emberCliGeoServicesGeolocation) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliGeoServicesGeolocation['default'];
    }
  });
});
define("motoshare-client/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _liquidFireTransitionMap) {
  exports["default"] = _liquidFireTransitionMap["default"];
});
define('motoshare-client/services/media', ['exports', 'ember-responsive/media'], function (exports, _emberResponsiveMedia) {
  exports['default'] = _emberResponsiveMedia['default'];
});
define('motoshare-client/services/message-bus', ['exports', 'ember-message-bus/services/message-bus'], function (exports, _emberMessageBusServicesMessageBus) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMessageBusServicesMessageBus['default'];
    }
  });
});
define('motoshare-client/services/popup', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		openBikePanel: function openBikePanel(id) {
			jQuery(window).on('ready', _ember['default'].run.bind(this, this.openBikePanel));
			console.log('Bike ID: ' + id);
		}
	});
});
define('motoshare-client/services/remodal', ['exports', 'ember-remodal/services/remodal'], function (exports, _emberRemodalServicesRemodal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRemodalServicesRemodal['default'];
    }
  });
});
define('motoshare-client/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('motoshare-client/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("motoshare-client/templates/app", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ejbd16ym", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"media\",\"isMobile\"]]],null,19,9]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default navbar-fixed-top\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle collapsed\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navbar\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"static-attr\",\"aria-controls\",\"navbar\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"navbar-brand\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"toggle\"]]]],[\"flush-element\"],[\"text\",\"\\n    \\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-bars\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"\"],[\"flush-element\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/navbar_logo.png\"],[\"static-attr\",\"height\",\"50px\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"navbar\"],[\"static-attr\",\"class\",\"navbar-collapse collapse\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"dropdown-toggle\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"role\",\"button\"],[\"static-attr\",\"aria-haspopup\",\"true\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-user\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"dropdown-menu\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"invalidateSession\"]],[\"flush-element\"],[\"text\",\"Log Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"comment\",\"/.nav-collapse \"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Account Info\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.profile\"],null,1],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"My Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.mymotorcycles\"],null,3],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Find Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"motorcycles\"],null,5],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"pull-right globalpadding\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"close\"]]]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-lg fa-times\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/icon.png\"],[\"static-attr\",\"height\",\"96px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Motoshare\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"menu\",\"item\"],null,null,6],[\"block\",[\"menu\",\"item\"],null,null,4],[\"block\",[\"menu\",\"item\"],null,null,2],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"menu\"]},{\"statements\":[[\"block\",[\"burger\",\"menu\"],null,[[\"dismissOnItemClick\",\"open\",\"itemTagName\"],[\"True\",false,\"li\"]],7],[\"text\",\"\\n\"],[\"block\",[\"burger\",\"outlet\"],null,null,0]],\"locals\":[\"burger\"]},{\"statements\":[[\"block\",[\"burger-menu\"],null,null,8]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebar\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebaritem\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"toggle\"]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-bars\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebaritem\"],[\"flush-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/navbar_logo.png\"],[\"static-attr\",\"height\",\"50px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebaritem\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-mobilebar dropdown-toggle\"],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-user\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"dropdown-menu dropdown-menu-right\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"invalidateSession\"]],[\"flush-element\"],[\"text\",\"Log Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Account Info\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.profile\"],null,11],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"My Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.mymotorcycles\"],null,13],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Find Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"motorcycles\"],null,15],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"pull-right globalpadding\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"close\"]]]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-lg fa-times\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/icon.png\"],[\"static-attr\",\"height\",\"96px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Motoshare\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"menu\",\"item\"],null,null,16],[\"block\",[\"menu\",\"item\"],null,null,14],[\"block\",[\"menu\",\"item\"],null,null,12],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"menu\"]},{\"statements\":[[\"block\",[\"burger\",\"menu\"],null,[[\"dismissOnItemClick\",\"itemTagName\"],[\"True\",\"li\"]],17],[\"text\",\"\\n\"],[\"block\",[\"burger\",\"outlet\"],null,null,10]],\"locals\":[\"burger\"]},{\"statements\":[[\"block\",[\"burger-menu\"],null,null,18]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/app.hbs" } });
});
define("motoshare-client/templates/app/addmotorcycle", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YL4xXrN8", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"appBody\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Add Motorcycle\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row bumpdown\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"col-sm-offset-1 col-sm-10\"],[\"flush-element\"],[\"text\",\"Please input the details of your motorcycle. You can save and return at anytime. Once saved you can upload photos.\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-horizontal bumpdown\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addmotorcycle\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"year\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Year\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-6\"],[\"flush-element\"],[\"text\",\"\\n\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"text\",\"form-control\",\"year\",\"Year\",[\"get\",[\"year\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"make\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Make\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-6\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"text\",\"form-control\",\"make\",\"Make\",[\"get\",[\"make\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"model\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Model\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-6\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"text\",\"form-control\",\"model\",\"Model\",[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"cc\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"CC's\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-6\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"text\",\"form-control\",\"cc\",\"CC's\",[\"get\",[\"cc\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"license\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Category\"],[\"close-element\"],[\"text\",\"\\n\\t  \\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-6\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t  \"],[\"open-element\",\"select\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"static-attr\",\"id\",\"category\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t  \"],[\"open-element\",\"option\",[]],[\"flush-element\"],[\"text\",\"Cruiser\"],[\"close-element\"],[\"text\",\"\\n\\t\\t  \"],[\"open-element\",\"option\",[]],[\"flush-element\"],[\"text\",\"Sport\"],[\"close-element\"],[\"text\",\"\\n\\t\\t  \"],[\"open-element\",\"option\",[]],[\"flush-element\"],[\"text\",\"Standard\"],[\"close-element\"],[\"text\",\"\\n\\t\\t  \"],[\"open-element\",\"option\",[]],[\"flush-element\"],[\"text\",\"Touring\"],[\"close-element\"],[\"text\",\"\\n\\t\\t  \"],[\"open-element\",\"option\",[]],[\"flush-element\"],[\"text\",\"Dual Sport\"],[\"close-element\"],[\"text\",\"\\n\\t\\t  \"],[\"open-element\",\"option\",[]],[\"flush-element\"],[\"text\",\"Scooter\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"price\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Price Per Day\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-6\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"name\",\"id\",\"placeholder\",\"value\"],[\"number\",\"form-control\",\"price\",\"price\",\"105\",[\"get\",[\"price\"]]]]],false],[\"text\",\"\\n\"],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\t  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n\\t  \\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"avail\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Available Dates\"],[\"close-element\"],[\"text\",\"\\n\\t  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-inline col-sm-offset-2 col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n\\n\\t\\t  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"startdate\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t  Start date:\\n\\t\\t  \"],[\"append\",[\"helper\",[\"pikaday-input\"],null,[[\"format\",\"onSelection\"],[\"MM/DD/YYYY\",[\"helper\",[\"action\"],[[\"get\",[null]],\"setStart\"],null]]]],false],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"enddate\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t  End date:\\n\\t\\t  \"],[\"append\",[\"helper\",[\"pikaday-input\"],null,[[\"format\",\"onSelection\"],[\"MM/DD/YYYY\",[\"helper\",[\"action\"],[[\"get\",[null]],\"setEnd\"],null]]]],false],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"address\"],[\"static-attr\",\"class\",\"col-sm-2 control-label\"],[\"flush-element\"],[\"text\",\"Address\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-inline col-sm-offset-2 col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"street\"],[\"flush-element\"],[\"text\",\"Street\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"name\",\"id\",\"placeholder\",\"value\"],[\"text\",\"street\",\"street\",\"\",[\"get\",[\"street\"]]]]],false],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"city\"],[\"flush-element\"],[\"text\",\"City\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"name\",\"id\",\"placeholder\",\"value\"],[\"text\",\"city\",\"city\",\"\",[\"get\",[\"city\"]]]]],false],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"state\"],[\"flush-element\"],[\"text\",\"State\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"name\",\"id\",\"placeholder\",\"value\"],[\"text\",\"state\",\"state\",\"\",[\"get\",[\"state\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-offset-2 col-sm-10\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"checkbox\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n        \\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"name\",\"checked\"],[\"checkbox\",\"isCompleted\",[\"get\",[\"isCompleted\"]]]]],false],[\"text\",\"\\n\\t\\t\\tMake available to rent.\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-inline\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-offset-2 col-sm-6\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-success pull-right\"],[\"flush-element\"],[\"text\",\"Save  \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-floppy-o\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/app/addmotorcycle.hbs" } });
});
define("motoshare-client/templates/app/mymotorcycles", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "wgfuGAPE", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"appBody\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"My Motorcycles\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"static-attr\",\"class\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,3],[\"text\",\"       \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"pull-right add-bike\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"app.addmotorcycle\"],null,0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-warning\"],[\"flush-element\"],[\"text\",\"Add Motorcycle\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"btn btn-default btn-xs pull-right\"],[\"static-attr\",\"role\",\"button\"],[\"flush-element\"],[\"text\",\"\\n                    \\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-edit\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Edit\"],[\"close-element\"],[\"text\",\"  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                     \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"text-yellow\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"motorcycle\",\"year\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"motorcycle\",\"make\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"motorcycle\",\"model\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"thumbnail\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"http://placehold.it/358x200/EEE\"],[\"static-attr\",\"class\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"caption\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"motorcycle\",[\"get\",[\"motorcycle\"]]],null,2],[\"text\",\"                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"motorcycle\",\"description\"]],false],[\"close-element\"],[\"text\",\" \\n\"],[\"block\",[\"link-to\"],[\"motorcycle.edit\",[\"get\",[\"motorcycle\"]]],null,1],[\"text\",\"                    \\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"btn btn-default btn-xs\"],[\"static-attr\",\"role\",\"button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addPhotos\",[\"get\",[\"motorcycle\"]]]],[\"flush-element\"],[\"text\",\"Add Photos\"],[\"close-element\"],[\"text\",\"\\n\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"motorcycle\"]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/app/mymotorcycles.hbs" } });
});
define("motoshare-client/templates/app/profile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "4287ta+J", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"appBody\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Account Info\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/app/profile.hbs" } });
});
define("motoshare-client/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "WwsINBN5", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"liquid-outlet\"]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"liquid-outlet\"],[\"login\"],null],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"liquid-outlet\"],[\"register\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/application.hbs" } });
});
define("motoshare-client/templates/components/cycle-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5eJk9nlz", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"map-canvas\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/components/cycle-map.hbs" } });
});
define("motoshare-client/templates/components/cycle-pin", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pHpYOafA", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/components/cycle-pin.hbs" } });
});
define("motoshare-client/templates/components/file-upload", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "RAh/FVIb", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/components/file-upload.hbs" } });
});
define("motoshare-client/templates/components/nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fvezqYGw", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"comment\",\" Brand and toggle get grouped for better mobile display \"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle collapsed\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#bs-example-navbar-collapse-1\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"navbar-brand\"],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/navbar_logo.png\"],[\"static-attr\",\"height\",\"50px\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"comment\",\" Collect the nav links, forms, and other content for toggling \"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"bs-example-navbar-collapse-1\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[\"isActive\",[\"get\",[\"active\"]]],null],null],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"mapView\"]],[\"flush-element\"],[\"text\",\"Map\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[\"isActive\",[\"get\",[\"active\"]]],null],null],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"listView\"]],[\"flush-element\"],[\"text\",\"List\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"navbar-form navbar-left\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n         \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\",\"focus-in\"],[\"text\",\"form-control\",[\"get\",[\"zip\"]],\"Enter Zip Code\",\"focused\"]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"searchZip\"]],[\"flush-element\"],[\"text\",\"Search\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,2],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"dropdown-toggle\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"role\",\"button\"],[\"static-attr\",\"aria-haspopup\",\"true\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-lg fa-user\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"dropdown-menu\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1,0],[\"text\",\"          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"comment\",\" /.navbar-collapse \"],[\"text\",\"\\n  \"],[\"close-element\"],[\"comment\",\" /.container-fluid \"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/login\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"invalidateSession\"]],[\"flush-element\"],[\"text\",\"Log Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"h5\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/components/nav-bar.hbs" } });
});
define("motoshare-client/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3mujR5Ja", "block": "{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site registerBG\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logo.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"static-attr\",\"style\",\"padding-bottom:20px; padding-left:50px;\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"login\"],null,1],[\"block\",[\"link-to\"],[\"register\"],null,0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-lg btn-white-outline\"],[\"flush-element\"],[\"text\",\"Register\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-lg btn-white-outline buttonspacer\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/index.hbs" } });
});
define("motoshare-client/templates/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "VzIahUDd", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"span4\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"span4\"],[\"flush-element\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"splash center-block\"],[\"static-attr\",\"src\",\"assets/images/loading.gif\"],[\"static-attr\",\"height\",\"250px\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"span4\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/loading.hbs" } });
});
define("motoshare-client/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EMrSeUE8", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"media\",\"isMobile\"]]],null,9,4]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Forgot Password?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Need to register?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site loginBG\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,3],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,2],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"authenticate\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"identification\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"identification\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"type\",\"placeholder\",\"value\",\"required\"],[\"password\",\"form-control input-lg\",\"password\",\"Password\",[\"get\",[\"password\"]],true]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"register\"],[[\"class\"],[\"pull-left\"]],1],[\"block\",[\"link-to\"],[\"passwordreset\"],[[\"class\"],[\"pull-right\"]],0],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Forgot Password?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Need to register?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site mobileloginBG\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form-mobile\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,8],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,7],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"authenticate\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"identification\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"identification\"]],true]]],false],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"type\",\"placeholder\",\"value\",\"required\"],[\"password\",\"form-control input-lg\",\"password\",\"Password\",[\"get\",[\"password\"]],true]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"register\"],[[\"class\"],[\"pull-left\"]],6],[\"block\",[\"link-to\"],[\"passwordreset\"],[[\"class\"],[\"pull-right\"]],5],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/login.hbs" } });
});
define("motoshare-client/templates/motorcycle", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "LxVGzHjX", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"media\",\"isMobile\"]]],null,22,10]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"navbar\"],[\"static-attr\",\"class\",\"navbar-collapse collapse\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"dropdown-toggle\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"role\",\"button\"],[\"static-attr\",\"aria-haspopup\",\"true\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-user\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"dropdown-menu\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"invalidateSession\"]],[\"flush-element\"],[\"text\",\"Log Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"comment\",\"/.nav-collapse \"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default navbar-fixed-top\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle collapsed\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navbar\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"static-attr\",\"aria-controls\",\"navbar\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"navbar-brand\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"toggle\"]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-bars\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"\"],[\"flush-element\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/navbar_logo.png\"],[\"static-attr\",\"height\",\"50px\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Account Info\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.profile\"],null,2],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"My Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.mymotorcycles\"],null,4],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Find Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"motorcycles\"],null,6],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"pull-right globalpadding\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"close\"]]]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-lg fa-times\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/icon.png\"],[\"static-attr\",\"height\",\"96px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Motoshare\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"menu\",\"item\"],null,null,7],[\"block\",[\"menu\",\"item\"],null,null,5],[\"block\",[\"menu\",\"item\"],null,null,3],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"menu\"]},{\"statements\":[[\"block\",[\"burger\",\"menu\"],null,[[\"open\",\"dismissOnItemClick\",\"itemTagName\"],[false,\"True\",\"li\"]],8],[\"text\",\"\\n\"],[\"block\",[\"burger\",\"outlet\"],null,null,1]],\"locals\":[\"burger\"]},{\"statements\":[[\"block\",[\"burger-menu\"],null,null,9],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/login\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"invalidateSession\"]],[\"flush-element\"],[\"text\",\"Log Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebar\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebaritem\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"toggle\"]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-bars\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebaritem\"],[\"flush-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/navbar_logo.png\"],[\"static-attr\",\"height\",\"50px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebaritem\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-mobilebar dropdown-toggle\"],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-user\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"dropdown-menu dropdown-menu-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,12,11],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Account Info\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.profile\"],null,14],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"My Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.mymotorcycles\"],null,16],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Find Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"motorcycles\"],null,18],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"pull-right globalpadding\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"close\"]]]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-lg fa-times\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/icon.png\"],[\"static-attr\",\"height\",\"96px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Motoshare\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"menu\",\"item\"],null,null,19],[\"block\",[\"menu\",\"item\"],null,null,17],[\"block\",[\"menu\",\"item\"],null,null,15],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"menu\"]},{\"statements\":[[\"block\",[\"burger\",\"menu\"],null,[[\"dismissOnItemClick\",\"itemTagName\"],[\"True\",\"li\"]],20],[\"text\",\"\\n\"],[\"block\",[\"burger\",\"outlet\"],null,null,13]],\"locals\":[\"burger\"]},{\"statements\":[[\"block\",[\"burger-menu\"],null,null,21]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/motorcycle.hbs" } });
});
define("motoshare-client/templates/motorcycle/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3dN97bnt", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"appBody\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Edit Motorcycle\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"static-attr\",\"class\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/motorcycle/edit.hbs" } });
});
define("motoshare-client/templates/motorcycle/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vke1zb6F", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"appBody\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"year\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"model\",\"make\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"model\",\"model\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default col-md-8\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"swiper-container\"],null,[[\"pagination\",\"loop\",\"prevButton\",\"nextButton\"],[true,true,\".swiper-prev\",\".swiper-next\"]],7],[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"bumpdown\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default swiper-prev\"],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-lg fa-arrow-circle-o-left\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default swiper-next pull-right\"],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-lg fa-arrow-circle-o-right\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Description:\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Color:\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"color\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Category:\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"category\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Available Dates:\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"availabledates\",\"startDate\"]],false],[\"text\",\" – \"],[\"append\",[\"unknown\",[\"model\",\"availabledates\",\"endDate\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,4],[\"block\",[\"link-to\"],[\"motorcycle.rental\",[\"get\",[\"model\"]]],null,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"btn btn-warning\"],[\"flush-element\"],[\"text\",\"Rent This Motorcycle\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-danger\"],[\"flush-element\"],[\"text\",\"Cancel\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-warning pull-right\"],[\"flush-element\"],[\"text\",\"Add Photos   \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-camera\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"m\",\"open\"],null,null,2],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"hide\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"id\"]],false],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"photo\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n      \\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"file-input-wrapper\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-warning\"],[\"flush-element\"],[\"text\",\"Select Photo\"],[\"close-element\"],[\"text\",\"\\n      \\t\"],[\"append\",[\"helper\",[\"file-upload\"],null,[[\"url\",\"onProgress\",\"onComplete\",\"class\",\"uid\"],[\"\",\"fileUploadProgress\",\"fileUploadComplete\",\"upload\",[\"get\",[\"model\",\"id\"]]]]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"progress\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"progress-bar progress-bar-success progress-bar-striped active\"],[\"static-attr\",\"role\",\"progressbar\"],[\"static-attr\",\"aria-valuenow\",\"40\"],[\"static-attr\",\"aria-valuemin\",\"0\"],[\"static-attr\",\"aria-valuemax\",\"100\"],[\"dynamic-attr\",\"style\",[\"concat\",[\"width:\",[\"unknown\",[\"uploadPercentage\"]],\"%\"]]],[\"flush-element\"],[\"text\",\"\\n    \\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\" \\n\\n\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"actions\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"m\",\"cancel\"],null,null,1],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"m\"]},{\"statements\":[[\"block\",[\"ember-remodal\"],null,[[\"forService\",\"title\"],[true,\"Photo Upload\"]],3]],\"locals\":[]},{\"statements\":[[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"concat\",[[\"get\",[\"photo\"]]]]],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"swiper-slide\"],null,null,5],[\"text\",\"\\n\"]],\"locals\":[\"photo\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\",\"media\"]]],null,6]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/motorcycle/index.hbs" } });
});
define("motoshare-client/templates/motorcycle/rental", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2yaTYwHA", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"appBody\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Rent Motorcycle\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"static-attr\",\"class\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"action\",\"https://motoshare-v1.appspot.com/api/payment/4573968371548160\"],[\"static-attr\",\"method\",\"POST\"],[\"flush-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"script\",[]],[\"static-attr\",\"src\",\"https://checkout.stripe.com/checkout.js\"],[\"static-attr\",\"class\",\"stripe-button\"],[\"static-attr\",\"data-key\",\"pk_test_yAKS9rAZxDhELLpoXQNcudQz\"],[\"static-attr\",\"data-amount\",\"19500\"],[\"static-attr\",\"data-name\",\"Motoshare\"],[\"static-attr\",\"data-description\",\"Bike Checkout\"],[\"static-attr\",\"data-image\",\"https://motoshare-v1.appspot.com/assets/images/icon.png\"],[\"static-attr\",\"data-locale\",\"auto\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/motorcycle/rental.hbs" } });
});
define("motoshare-client/templates/motorcycles", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Ju8a9glp", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"media\",\"isMobile\"]]],null,31,16]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"List View\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[\"motorcycle\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,1]],\"locals\":[]},{\"statements\":[[\"block\",[\"cycle-map\"],null,[[\"latitude\",\"longitude\"],[[\"get\",[\"lat\"]],[\"get\",[\"lng\"]]]],2]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/login\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"invalidateSession\"]],[\"flush-element\"],[\"text\",\"Log Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"h5\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default navbar-fixed-top\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle collapsed\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navbar\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"static-attr\",\"aria-controls\",\"navbar\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"navbar-brand\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"toggle\"]]]],[\"flush-element\"],[\"text\",\"\\n    \\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-bars\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"\"],[\"flush-element\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/navbar_logo.png\"],[\"static-attr\",\"height\",\"50px\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"bs-example-navbar-collapse-1\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[\"isActive\",[\"get\",[\"active\"]]],null],null],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"mapView\"]],[\"flush-element\"],[\"text\",\"Map\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[\"isActive\",[\"get\",[\"active\"]]],null],null],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"listView\"]],[\"flush-element\"],[\"text\",\"List\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"navbar-form navbar-left\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n         \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\",\"focus-in\"],[\"text\",\"form-control\",[\"get\",[\"zip\"]],\"Enter Zip Code\",\"focused\"]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"searchZip\"]],[\"flush-element\"],[\"text\",\"Search\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,6],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"dropdown-toggle\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"role\",\"button\"],[\"static-attr\",\"aria-haspopup\",\"true\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-2x fa-user\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"dropdown-menu\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,5,4],[\"text\",\"              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"comment\",\"/.nav-collapse \"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"map\"]]],null,3,0],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Account Info\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.profile\"],null,8],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"My Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.mymotorcycles\"],null,10],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Find Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"motorcycles\"],null,12],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"pull-right globalpadding\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"close\"]]]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-lg fa-times\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/icon.png\"],[\"static-attr\",\"height\",\"96px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Motoshare\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"menu\",\"item\"],null,null,13],[\"block\",[\"menu\",\"item\"],null,null,11],[\"block\",[\"menu\",\"item\"],null,null,9],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"menu\"]},{\"statements\":[[\"block\",[\"burger\",\"menu\"],null,[[\"dismissOnItemClick\",\"itemTagName\"],[\"True\",\"li\"]],14],[\"text\",\"\\n\"],[\"block\",[\"burger\",\"outlet\"],null,null,7]],\"locals\":[\"burger\"]},{\"statements\":[[\"block\",[\"burger-menu\"],null,null,15]],\"locals\":[]},{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"List View\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[\"motorcycle\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,18]],\"locals\":[]},{\"statements\":[[\"block\",[\"cycle-map\"],null,[[\"latitude\",\"longitude\"],[[\"get\",[\"lat\"]],[\"get\",[\"lng\"]]]],19]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebaritem\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"h5\",[]],[\"static-attr\",\"class\",\"text-danger\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebar\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"icon\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"toggle\"]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/icon.png\"],[\"static-attr\",\"height\",\"50px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebaritem\"],[\"flush-element\"],[\"text\",\"\\n         \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\",\"focus-in\"],[\"text\",\"form-control\",[\"get\",[\"zip\"]],\"Enter Zip Code\",\"focused\"]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mobilebaritem\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"searchZip\"]],[\"flush-element\"],[\"text\",\"Search\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,21],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"map\"]]],null,20,17],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Account Info\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.profile\"],null,23],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"My Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"app.mymotorcycles\"],null,25],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Find Motorcycles\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"motorcycles\"],null,27],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"pull-right globalpadding\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"burger\",\"state\",\"actions\",\"close\"]]]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-lg fa-times\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/icon.png\"],[\"static-attr\",\"height\",\"96px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Motoshare\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"menu\",\"item\"],null,null,28],[\"block\",[\"menu\",\"item\"],null,null,26],[\"block\",[\"menu\",\"item\"],null,null,24],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"menu\"]},{\"statements\":[[\"block\",[\"burger\",\"menu\"],null,[[\"dismissOnItemClick\",\"itemTagName\"],[\"True\",\"li\"]],29],[\"text\",\"\\n\"],[\"block\",[\"burger\",\"outlet\"],null,null,22]],\"locals\":[\"burger\"]},{\"statements\":[[\"block\",[\"burger-menu\"],null,null,30],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/motorcycles.hbs" } });
});
define("motoshare-client/templates/not-found", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cAx7dxLT", "block": "{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site notfoundBG\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"h2\",[]],[\"static-attr\",\"class\",\"fourohfour\"],[\"flush-element\"],[\"text\",\"Oops wrong turn friend....\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"app.profile\"],null,2],[\"block\",[\"link-to\"],[\"login\"],null,1],[\"block\",[\"link-to\"],[\"register\"],null,0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-lg btn-white-outline\"],[\"flush-element\"],[\"text\",\"Register\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-lg btn-white-outline buttonspacer\"],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-lg btn-white-outline buttonspacer\"],[\"flush-element\"],[\"text\",\"Home\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/not-found.hbs" } });
});
define("motoshare-client/templates/passwordreset", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YnGiu+DT", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"media\",\"isMobile\"]]],null,11,5]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Log In.\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Need to register?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Please enter the email address you used to register:\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"passwordreset\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"resetemail\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"resetemail\"]],true]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Reset Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"text-success\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site resetBG\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,4],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,3,2],[\"block\",[\"link-to\"],[\"register\"],[[\"class\"],[\"pull-left\"]],1],[\"block\",[\"link-to\"],[\"login\"],[[\"class\"],[\"pull-right\"]],0],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Log In.\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Need to register?\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Please enter the email address you used to register:\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"passwordreset\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"placeholder\",\"value\",\"required\"],[\"resetemail\",\"form-control input-lg\",\"Email Address\",[\"get\",[\"resetemail\"]],true]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-customlogin btn-block\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Reset Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"text-success\"],[\"flush-element\"],[\"append\",[\"helper\",[\"errors-text\"],[[\"get\",[\"errors\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"assets/images/logoyellow.png\"],[\"static-attr\",\"class\",\"img-responsive\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"body\",[]],[\"static-attr\",\"class\",\"site mobileloginBG\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"login-form-mobile\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,10],[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,9,8],[\"block\",[\"link-to\"],[\"register\"],[[\"class\"],[\"pull-left\"]],7],[\"block\",[\"link-to\"],[\"login\"],[[\"class\"],[\"pull-right\"]],6],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "motoshare-client/templates/passwordreset.hbs" } });
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
  return { 'default': {"modulePrefix":"motoshare-client","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"LOG_TRANSITIONS":true,"name":"motoshare-client","version":"0.0.0+12ecbafc"},"ember-simple-auth":{"authorizer":"authorizer:token","crossOriginWhitelist":["http://localhost:8080"]},"ember-simple-auth-token":{"routeAfterAuthentication":"app/profile","serverTokenEndpoint":"https://motoshare-v1.appspot.com/api/login/","identificationField":"email","passwordField":"password","tokenPropertyName":"access_token","timeFactor":1000,"authorizationPrefix":"Bearer ","authorizationHeaderName":"Authorization"},"contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com","font-src":"'self' fonts.gstatic.com","connect-src":"'self' maps.gstatic.com","img-src":"'self' *.googleapis.com maps.gstatic.com csi.gstatic.com","style-src":"'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"},"exportApplicationGlobal":true}};
});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("motoshare-client/app")["default"].create({"LOG_TRANSITIONS":true,"name":"motoshare-client","version":"0.0.0+12ecbafc"});
}

/* jshint ignore:end */
