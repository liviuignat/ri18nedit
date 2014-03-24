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
                writeTranslationTree: function(filePath, translations) {
                    var that = this,
                        path = require('path'),
                        fs = require('fs');
                    debugger;
                    var fileName = translations.name;

                    translations.languages.forEach(function(translation) {
                        var pathToSave = path.join(filePath, fileName);
                        if (!translation.isRoot) {
                            pathToSave = path.join(filePath, translation.name, fileName);
                        }

                        var pathExists = fs.existsSync(pathToSave);
                        if (!pathExists) {
                            fs.mkdirSync(path.join(filePath, translation.name));
                        }

                        that.writeTranslationFile(pathToSave, translation);
                    });
                }
            };
        }
    ]);

})(services);