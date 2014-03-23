(function() {
    services.factory('NodeLoadTranslationsService', ['NodeFileReaderService',
        function(nodeFileReaderService) {
            var createLangObject = function(name, content, isRoot) {
                return {
                    name: name,
                    isRoot: isRoot,
                    content: content
                };
            };

            var getLangsFromFile = function() {
                return ['ro-RO', 'de-DE'];
            }

            return {
                loadTranslationFiles: function(filePath) {
                    var path = require('path'),
                        fileName = path.basename(filePath).replace('.js', ''),
                        directory = path.dirname(filePath).replace('C:\\', '').replace(/\\/g, '/'),
                        requirePath = directory + '/' + fileName;

                    var mainFile = nodeFileReaderService.requireJs(requirePath);

                    var langs = [];
                    var root = createLangObject('en-US', mainFile.root, true);
                    root.langs = [];
                    langs.push(root);

                    var foreignLangs = getLangsFromFile(mainFile);

                    foreignLangs.forEach(function(foreignLang) {
                        var foreignLangPath = directory + '/' + foreignLang + '/' + fileName;
                        var foreignLangFile = nodeFileReaderService.requireJs(foreignLangPath);
                        langs.push(createLangObject(foreignLang, foreignLangFile, false));
                        root.langs.push(foreignLang);
                    });
                    var files = {
                        name: fileName,
                        languages: langs
                    };

                    return files;
                }
            };
        }
    ]);

})(services);