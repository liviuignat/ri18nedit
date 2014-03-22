var controllers = angular.module('rie.controllers', []);
var directives = angular.module('rie.directives', []);
var services = angular.module('rie.services', []);
var app;
var initializeApp;

(function () {
  'use strict';
  app = angular.module('rie', [
    'ui',
    'ui.bootstrap.tabs',
    'ngRoute',
    'rie.controllers',
    'rie.services',
    'rie.directives',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/EditorView.html',
        controller: 'EditorController',
        resolve: {
          load: ['$q', '$rootScope', function ($q, $rootScope) {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$httpProvider', function($httpProvider) {
  	delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);

   // fix ui-multi-sortable to y-axis
  app.value('ui.config', {
      "sortable": {
          "axis": "y",
          "placeholder": "sortable-placeholder"
      }
  });
})();