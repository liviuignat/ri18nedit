(function(controllers) {
    'use strict';

    controllers.controller('EditorController',
        function($scope, $filter, TranslationsService, NodeRequireJsSetupService, NodeFileReaderService, JSONSyncService, NodeLoadTranslationsService, SaveTranslationsService) {
            $scope.newFilePath = 'C:\\translations\\nls\\auth.js';

            NodeRequireJsSetupService.init();

            var translations = TranslationsService.getTranslations();
            $scope.files = translations.files;

            $scope.getJsonString = function(json) {
                return $filter('json')(json);
            };

            $scope.$watch('files[0].languages[0].content', function(a, b, c, d) {
                //JSONSyncService.syncObject(a, translations.files[0].languages[1].content);
            }, true);

            $scope.loadTranslation = function() {
                TranslationsService.setTranslations([]);
                var translation;
                try {
                    var translation = NodeLoadTranslationsService.loadTranslationFiles($scope.newFilePath);
                } catch (ex) {}

                TranslationsService.addFile(translation);

                $scope.files = TranslationsService.getTranslations().files;
            };

            $scope.forceNormalize = function() {
                var translation = $scope.files[0];
                JSONSyncService.syncObject(translation.languages[0].content, translation.languages[1].content);
                JSONSyncService.syncObject(translation.languages[0].content, translation.languages[2].content);
            };

            $scope.saveFiles = function() {
                var path = require('path'),
                    translation = $scope.files[0],
                    location = path.dirname($scope.newFilePath);
                var file = SaveTranslationsService.writeTranslationTree(location, translation);
            };
        });

})(controllers);