(function(controllers) {
    'use strict';

    services.factory('JSONSyncService', function() {
        var syncObject = function(source, dest) {
            var sourceKeys = Object.keys(source),
                destKeys;

            if (source && dest) {
                deleteExtraKeys(dest, source);
                addExtraKeys(source, dest);

                destKeys = Object.keys(dest);
            }

            sourceKeys.forEach(function(key) {
                if (angular.isArray(source[key])) {
                    syncArray(source[key], dest[key]);
                } else if (angular.isObject(source[key])) {
                    syncObject(source[key], dest[key]);
                } else {
                    //syncObject(source[key], dest[key]);
                }
            });
        };
        var syncArray = function(sourceArray, destArray) {
            sourceArray.forEach(function(object, index) {
                if (angular.isArray(sourceArray[index])) {
                    destArray[index] = [];
                    syncArray(sourceArray[index], destArray[index]);
                } else if (angular.isObject(sourceArray[index])) {
                    destArray[index] = {};
                    syncObject(sourceArray[index], destArray[index]);
                } else if (angular.isString(sourceArray[index])) {
                    if (!destArray[index])
                        destArray[index] = '';
                }
            });
        };
        var deleteExtraKeys = function(source, dest) {
            var sourceKeys = Object.keys(source),
                destKeys = Object.keys(dest);
            sourceKeys.forEach(function(key) {
                if (!dest[key]) {
                    delete source[key];
                }
            });
        };
        var addExtraKeys = function(source, dest) {
            var sourceKeys = Object.keys(source),
                destKeys = Object.keys(dest);
            sourceKeys.forEach(function(key) {
                if (!dest[key]) {
                    if (angular.isArray(source[key])) {
                        dest[key] = [];
                    } else if (angular.isObject(source[key])) {
                        dest[key] = {};
                    } else {
                        dest[key] = '';
                    }
                }
            });
        };

        return {
            syncObject: syncObject,
            syncArray: syncArray
        }
    });
})();