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
                        fileName = path.basename(filePath),
                        fileModule = path.basename(filePath).replace('.js', ''),
                        directory = path.dirname(filePath).toLowerCase().replace('c:\\', '').replace(/\\/g, '/'),
                        requirePath = directory + '/' + fileModule;

                    var mainFile = nodeFileReaderService.requireJs(requirePath);

                    var langs = [];
                    var root = createLangObject('en-US', mainFile.root, true);
                    root.langs = [];
                    langs.push(root);

                    var foreignLangs = getLangsFromFile(mainFile);

                    foreignLangs.forEach(function(foreignLang) {
                        var foreignLangPath = directory + '/' + foreignLang + '/' + fileModule,
                            foreignLangFile,
                            success = true;
                        try {
                            foreignLangFile = nodeFileReaderService.requireJs(foreignLangPath);
                            success = typeof foreignLangFile !== 'undefined';
                        } catch(ex) {
                            success = false;
                        }

                        if(!success) {
                            foreignLangFile = {};
                        }

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