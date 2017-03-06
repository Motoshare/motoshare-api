define('motoshare-client/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('motoshare-client/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('motoshare-client/tests/breakpoints.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | breakpoints.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'breakpoints.js should pass jshint.');
  });
});
define('motoshare-client/tests/components/cycle-map.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/cycle-map.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/cycle-map.js should pass jshint.\ncomponents/cycle-map.js: line 7, col 13, \'cycles\' is defined but never used.\ncomponents/cycle-map.js: line 21, col 102, Missing semicolon.\ncomponents/cycle-map.js: line 22, col 26, \'google\' is not defined.\ncomponents/cycle-map.js: line 25, col 24, \'google\' is not defined.\ncomponents/cycle-map.js: line 28, col 30, \'google\' is not defined.\ncomponents/cycle-map.js: line 30, col 9, \'google\' is not defined.\ncomponents/cycle-map.js: line 51, col 9, \'google\' is not defined.\ncomponents/cycle-map.js: line 51, col 39, \'map\' is not defined.\ncomponents/cycle-map.js: line 52, col 15, \'infoWindow\' is not defined.\n\n9 errors');
  });
});
define('motoshare-client/tests/components/cycle-pin.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/cycle-pin.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/cycle-pin.js should pass jshint.');
  });
});
define('motoshare-client/tests/components/nav-bar.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/nav-bar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav-bar.js should pass jshint.');
  });
});
define('motoshare-client/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('motoshare-client/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass jshint.');
  });
});
define('motoshare-client/tests/controllers/motorcycles.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/motorcycles.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/motorcycles.js should pass jshint.');
  });
});
define('motoshare-client/tests/controllers/passwordreset.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/passwordreset.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/passwordreset.js should pass jshint.');
  });
});
define('motoshare-client/tests/controllers/profile.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/profile.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/profile.js should pass jshint.');
  });
});
define('motoshare-client/tests/controllers/register.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/register.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/register.js should pass jshint.');
  });
});
define('motoshare-client/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('motoshare-client/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('motoshare-client/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  ;

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  ;

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }

  ;
});
define('motoshare-client/tests/helpers/errors-text.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/errors-text.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/errors-text.js should pass jshint.');
  });
});
define('motoshare-client/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'motoshare-client/tests/helpers/start-app', 'motoshare-client/tests/helpers/destroy-app'], function (exports, _qunit, _motoshareClientTestsHelpersStartApp, _motoshareClientTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _motoshareClientTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _motoshareClientTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('motoshare-client/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('motoshare-client/tests/helpers/resolver', ['exports', 'motoshare-client/resolver', 'motoshare-client/config/environment'], function (exports, _motoshareClientResolver, _motoshareClientConfigEnvironment) {

  var resolver = _motoshareClientResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _motoshareClientConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _motoshareClientConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('motoshare-client/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('motoshare-client/tests/helpers/responsive', ['exports', 'ember', 'ember-responsive/media'], function (exports, _ember, _emberResponsiveMedia) {
  exports.setBreakpointForIntegrationTest = setBreakpointForIntegrationTest;
  var getOwner = _ember['default'].getOwner;
  var classify = _ember['default'].String.classify;

  _emberResponsiveMedia['default'].reopen({
    // Change this if you want a different default breakpoint in tests.
    _defaultBreakpoint: 'desktop',

    _breakpointArr: _ember['default'].computed('breakpoints', function () {
      return Object.keys(this.get('breakpoints')) || _ember['default'].A([]);
    }),

    _forceSetBreakpoint: function _forceSetBreakpoint(breakpoint) {
      var found = false;

      var props = {};
      this.get('_breakpointArr').forEach(function (bp) {
        var val = bp === breakpoint;
        if (val) {
          found = true;
        }

        props['is' + classify(bp)] = val;
      });

      if (found) {
        this.setProperties(props);
      } else {
        throw new Error('You tried to set the breakpoint to ' + breakpoint + ', which is not in your app/breakpoint.js file.');
      }
    },

    match: function match() {}, // do not set up listeners in test

    init: function init() {
      this._super.apply(this, arguments);

      this._forceSetBreakpoint(this.get('_defaultBreakpoint'));
    }
  });

  exports['default'] = _ember['default'].Test.registerAsyncHelper('setBreakpoint', function (app, breakpoint) {
    // this should use getOwner once that's supported
    var mediaService = app.__deprecatedInstance__.lookup('service:media');
    mediaService._forceSetBreakpoint(breakpoint);
  });

  function setBreakpointForIntegrationTest(container, breakpoint) {
    var mediaService = getOwner(container).lookup('service:media');
    mediaService._forceSetBreakpoint(breakpoint);
    container.set('media', mediaService);

    return mediaService;
  }
});
define('motoshare-client/tests/helpers/responsive.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/responsive.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/responsive.js should pass jshint.');
  });
});
define('motoshare-client/tests/helpers/start-app', ['exports', 'ember', 'motoshare-client/app', 'motoshare-client/config/environment'], function (exports, _ember, _motoshareClientApp, _motoshareClientConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _motoshareClientConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _motoshareClientApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('motoshare-client/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('motoshare-client/tests/initializers/responsive.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | initializers/responsive.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/responsive.js should pass jshint.');
  });
});
define('motoshare-client/tests/integration/components/cycle-map-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('cycle-map', 'Integration | Component | cycle map', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '9gAJaY/6',
      'block': '{"statements":[["append",["unknown",["cycle-map"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'NO7WukJy',
      'block': '{"statements":[["text","\\n"],["block",["cycle-map"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('motoshare-client/tests/integration/components/cycle-map-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/cycle-map-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/cycle-map-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/integration/components/cycle-pin-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('cycle-pin', 'Integration | Component | cycle pin', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'v5qlHxvJ',
      'block': '{"statements":[["append",["unknown",["cycle-pin"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': '95IWOKUy',
      'block': '{"statements":[["text","\\n"],["block",["cycle-pin"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('motoshare-client/tests/integration/components/cycle-pin-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/cycle-pin-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/cycle-pin-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/integration/components/nav-bar-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('nav-bar', 'Integration | Component | nav bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'B4I82Wse',
      'block': '{"statements":[["append",["unknown",["nav-bar"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'A73jwuQ9',
      'block': '{"statements":[["text","\\n"],["block",["nav-bar"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('motoshare-client/tests/integration/components/nav-bar-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/nav-bar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/nav-bar-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/models/motorcycle.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/motorcycle.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/motorcycle.js should pass jshint.');
  });
});
define('motoshare-client/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('motoshare-client/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('motoshare-client/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('motoshare-client/tests/routes/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass jshint.');
  });
});
define('motoshare-client/tests/routes/motorcycles.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/motorcycles.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/motorcycles.js should pass jshint.');
  });
});
define('motoshare-client/tests/routes/passwordreset.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/passwordreset.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/passwordreset.js should pass jshint.');
  });
});
define('motoshare-client/tests/routes/profile.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/profile.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/profile.js should pass jshint.');
  });
});
define('motoshare-client/tests/routes/register.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/register.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/register.js should pass jshint.');
  });
});
define('motoshare-client/tests/test-helper', ['exports', 'motoshare-client/tests/helpers/resolver', 'motoshare-client/tests/helpers/responsive', 'ember-qunit'], function (exports, _motoshareClientTestsHelpersResolver, _motoshareClientTestsHelpersResponsive, _emberQunit) {

  (0, _emberQunit.setResolver)(_motoshareClientTestsHelpersResolver['default']);
});
define('motoshare-client/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('motoshare-client/tests/transitions.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | transitions.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('motoshare-client/tests/unit/adapters/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/adapters/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/controllers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('motoshare-client/tests/unit/controllers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/controllers/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('motoshare-client/tests/unit/controllers/login-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/controllers/motorcycles-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:motorcycles', 'Unit | Controller | motorcycles', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('motoshare-client/tests/unit/controllers/motorcycles-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/motorcycles-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/motorcycles-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/controllers/passwordreset-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:passwordreset', 'Unit | Controller | passwordreset', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('motoshare-client/tests/unit/controllers/passwordreset-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/passwordreset-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/passwordreset-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/controllers/profile-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:profile', 'Unit | Controller | profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('motoshare-client/tests/unit/controllers/profile-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/profile-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/profile-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/controllers/register-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:register', 'Unit | Controller | register', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('motoshare-client/tests/unit/controllers/register-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/register-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/register-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/helpers/errors-text-test', ['exports', 'motoshare-client/helpers/errors-text', 'qunit'], function (exports, _motoshareClientHelpersErrorsText, _qunit) {

  (0, _qunit.module)('Unit | Helper | errors text');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _motoshareClientHelpersErrorsText.errorsText)([42]);
    assert.ok(result);
  });
});
define('motoshare-client/tests/unit/helpers/errors-text-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/helpers/errors-text-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/errors-text-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/models/motorcycle-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('motorcycle', 'Unit | Model | motorcycle', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('motoshare-client/tests/unit/models/motorcycle-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/motorcycle-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/motorcycle-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/routes/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('motoshare-client/tests/unit/routes/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/routes/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('motoshare-client/tests/unit/routes/login-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/routes/motorcycles-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:motorcycles', 'Unit | Route | motorcycles', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('motoshare-client/tests/unit/routes/motorcycles-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/motorcycles-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/motorcycles-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/routes/passwordreset-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:passwordreset', 'Unit | Route | passwordreset', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('motoshare-client/tests/unit/routes/passwordreset-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/passwordreset-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/passwordreset-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/routes/profile-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:profile', 'Unit | Route | profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('motoshare-client/tests/unit/routes/profile-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/profile-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/profile-test.js should pass jshint.');
  });
});
define('motoshare-client/tests/unit/routes/register-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:register', 'Unit | Route | register', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('motoshare-client/tests/unit/routes/register-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/register-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/register-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('motoshare-client/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
