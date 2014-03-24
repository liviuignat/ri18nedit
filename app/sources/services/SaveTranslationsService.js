(function() {
    services.factory('SaveTranslationsService', [

        function() {
            var isInitialized = false;

            return {
                generateTranslationFile: function(languageDefinition) {
                    var path = require('path'),
                        fs = require('fs'),
                        fileName = languageDefinition.name,
                        json = languageDefinition.content;

                    if (languageDefinition.isRoot) {
                        json = {
                            root: json
                        };
                        languageDefinition.langs.forEach(function(lang) {
                            json[lang] = true;
                        });
                    }
                    var jsonString = JSON.stringify(json, null, 4);

                    var text = 'define(';
                    text += jsonString;
                    text += ');';
                    return text;
                },
                writeTranslationFile: function(filePath, languageDefinition) {
                    var path = require('path'),
                        fs = require('fs'),
                        text = this.generateTranslationFile(languageDefinition);

                    fs.writeFileSync(filePath, text, 'utf-8');
                },
                writeTranslationTree: function(filePath, translations, callback) {
                    var that = this,
                        async = require('async'),
                        path = require('path'),
                        fs = require('fs'),
                        fileName = translations.name;

                    async.forEach(
                        translations.languages,
                        function (translation, done) {
                            try {
                                var pathToSave = path.join(filePath, fileName);
                                if (!translation.isRoot) {
                                    pathToSave = path.join(filePath, translation.name, fileName);
                                }

                                var pathExists = fs.existsSync(pathToSave);
                                if (!pathExists) {
                                    fs.mkdirSync(path.join(filePath, translation.name));
                                }

                                that.writeTranslationFile(pathToSave, translation);
                                done(null);
                            } catch(ex) {
                                done(ex);
                            }

                        },
                        function (err) {
                          if(typeof callback === 'function') {
                            callback(err);
                          }
                        }
                    )
                    translations.languages.forEach(function(translation) {

                    });
                }
            };
        }
    ]);

})(services);