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

            var getMainLanguage = function () {
                return 'en-US';
            };

            var getLangsFromFile = function(mainFile) {
                var keys = Object.keys(mainFile),
                    langs = keys.filter(function (key) {
                      return key !== 'root';
                    });

                return langs;
            }

            return {
                loadTranslationFiles: function(filePath, callback) {
                    var async = require('async'),
                        path = require('path'),
                        fileName = path.basename(filePath),
                        directory = path.dirname(filePath).toLowerCase(),
                        mainLanguage = getMainLanguage();

                    var langs = [],
                        mainFile,
                        root;

                    async.series([
                        function (done) {
                            try {
                                mainFile = nodeFileReaderService.requireJs(filePath);
                                root = createLangObject(mainLanguage, mainFile.root, true);
                                root.langs = [];
                                langs.push(root);

                                done(null);
                            } catch (ex) {
                                done(ex);
                            }
                        },
                        function (done) {
                            var foreignLangs = getLangsFromFile(mainFile);
                            async.forEach(
                                foreignLangs,
                                function (foreignLang, done) {
                                    try {
                                        var foreignLangPath = path.join(directory, foreignLang, fileName),
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
                                        done(null);
                                    } catch (ex) {
                                        debugger;
                                        done(ex);
                                    }
                                },
                                function (err) {
                                    done(err);
                                }
                            );
                        }
                    ], function (err) {
                        var files = {
                            name: fileName,
                            languages: langs
                        };
                        if(typeof callback === 'function') {
                            callback(err, files);
                        }
                    });
                }
            };
        }
    ]);

})(services);