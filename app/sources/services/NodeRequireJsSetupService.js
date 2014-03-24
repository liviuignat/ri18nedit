(function() {
    services.factory('NodeRequireJsSetupService', ['$http',
        function() {
            var isInitialized = false;

            return {
                init: function(path) {
                    try {
                        if (!isInitialized) {
                            var requirejs = require('requirejs');
                            requirejs.config({
                                nodeRequire: require
                            });
                        }
                    } catch (err) {
                        //alert('require js was not inits');
                    }

                }
            };
        }
    ]);

})(services);