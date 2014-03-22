(function(controllers) {
  'use strict';

  controllers.controller('EditorController',
    function ($scope, $filter, TranslationsService, NodeRequireJsSetupService, NodeFileReaderService) {

    NodeRequireJsSetupService.init();
    var global = NodeFileReaderService.requireJs('Work/_Heroku/pds/PresentDoodle/nls/global');
    var globalRo = NodeFileReaderService.requireJs('Work/_Heroku/pds/PresentDoodle/nls/ro-RO/global');

    var translations = TranslationsService.getTranslations();
    translations.files[0].languages[0].content = global.root;
    translations.files[0].languages[1].content = globalRo;

    $scope.files = translations.files;

    $scope.getJsonString = function (json) {
      return $filter('json')(json);
    };


    /*$scope.jsonData = translations;
    $scope.$watch('jsonData', function(json) {
        $scope.jsonString = $filter('json')(json);
    }, true);
    $scope.$watch('jsonString', function(json) {
        $scope.jsonData = JSON.parse(json);
    }, true);*/
  });

})(controllers);