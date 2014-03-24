(function() {
    services.factory('NodeFileReaderService', ['$http',
        function() {
            return {
                readFileSync: function(path) {
                    var fs = require('fs'),
                        content = fs.readFileSync(path, {
                            encoding: 'utf8'
                        });
                    return content;
                },
                requireJs: function(path) {
                    var requirejs = require('requirejs'),
                        content = requirejs(path);
                    return content;

                }
            };
        }
    ]);

})(services);