(function(controllers) {
  'use strict';

  controllers.controller('EditorController',
    function ($scope, $filter, TranslationsService, NodeRequireJsSetupService, NodeFileReaderService, JSONSyncService) {

    NodeRequireJsSetupService.init();
    var global = NodeFileReaderService.requireJs('Work/_Heroku/pds/PresentDoodle/nls/global');
    var globalRo = NodeFileReaderService.requireJs('Work/_Heroku/pds/PresentDoodle/nls/ro-RO/global');

    var translations = TranslationsService.getTranslations();
    /*translations.files[0].languages[0].content = global.root;
    translations.files[0].languages[1].content = globalRo;*/




    JSONSyncService.syncObject(translations.files[0].languages[0].content, translations.files[0].languages[1].content);

    $scope.files = translations.files;

    $scope.getJsonString = function (json) {
      return $filter('json')(json);
    };

    $scope.$watch('files[0].languages[0].content', function(a, b, c, d) {
        JSONSyncService.syncObject(a, translations.files[0].languages[1].content);
    }, true);
  });

})(controllers);