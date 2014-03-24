(function() {
    services.factory('TranslationsService', ['$http',
        function($http) {
            var translations = {
                files: []
            };

            return {
                setTranslations: function(value) {
                    if (value) {
                        translations.files = value;
                    }
                },
                addFile: function(file) {
                    if (file) {
                        translations.files.push(file);
                    }
                },
                getTranslations: function() {
                    return translations;
                }
            };
        }
    ]);

})(services);