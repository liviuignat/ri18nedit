(function(controllers) {
    'use strict';

    controllers.controller('EditorController',
        function($scope, $filter, TranslationsService, NodeRequireJsSetupService, NodeFileReaderService, JSONSyncService, NodeLoadTranslationsService, SaveTranslationsService) {
            $scope.filePath = {},
            NodeRequireJsSetupService.init();

            var translations = TranslationsService.getTranslations();
            $scope.files = translations.files;

            $scope.getJsonString = function(json) {
                return $filter('json')(json);
            };

            $scope.areButtonsEnabled = function () {
                if(!$scope.filePath.file) {
                    return true;
                }
                return false;
            }

            $scope.loadTranslation = function() {
                var translation,
                    filePath = $scope.filePath.file.value;

                TranslationsService.setTranslations([]);
                try {
                    var translation = NodeLoadTranslationsService.loadTranslationFiles(filePath);
                } catch (ex) {}

                TranslationsService.addFile(translation);

                $scope.files = TranslationsService.getTranslations().files;
            };

            $scope.forceSync = function() {
                var translation = $scope.files[0],
                    index;

                if(translation.languages.length > 1) {
                    for(index = 1; index < translation.languages.length; index++) {
                        JSONSyncService.syncObject(translation.languages[0].content, translation.languages[index].content);
                    }
                }
            };

            $scope.saveFiles = function() {
                var path = require('path'),
                    filePath = $scope.filePath.file.value,
                    translation = $scope.files[0],
                    location = path.dirname(filePath);

                debugger;
                var file = SaveTranslationsService.writeTranslationTree(location, translation);
            };
        });

})(controllers);