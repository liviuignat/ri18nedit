(function() {
    services.factory('TranslationsService', ['$http',
        function($http) {
            var translations = {
                files: [{
                    "name": "global.js",
                    "languages": [{
                        "name": "en-US",
                        "content": {
                            "loginRequired": "We require you to be authenticated in our system before you can proceed.",
                            "datepicker": {
                                "today": "Today",
                                "yesterday": "Yesterday",
                                "tomorrow": "Tomorrow",
                                "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                "daysShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                "daysMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                                "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"],
                                "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
                                "suffix": [],
                                "meridiem": [],
                                "weekStart": 1,
                                "format": "dd MM yyyy - HH:ii",
                                "moment": {
                                    "timelapse": "+2",
                                    "format": "DD.MM.YYYY HH:mm"
                                }
                            }
                        }
                    }, {
                        "name": "ro-RO",
                        "content": {
                            "loginRequired": "Trebuie sa fiti logat inainte de a continua.",
                            "datepicker": {
                                "today": "Astăzi",
                                "yesterday": "Ieri",
                                "tomorrow": "Maine",
                                "days": ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
                                "daysShort": ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"],
                                "daysMin": ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
                                "months": ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie"],
                                "monthsShort": ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov"],
                                "suffix": [],
                                "meridiem": [],
                                "weekStart": 1,
                                "format": "dd MM yyyy - HH:ii",
                                "moment": {
                                    "timelapse": "+2",
                                    "format": "DD.MM.YYYY HH:mm"
                                }
                            }
                        }
                    }, {
                        "name": "de-DE",
                        "content": {
                            "loginRequired": "We require you to be authenticated in our system before you can proceed.",
                            "datepicker": {
                                "today": "Today",
                                "yesterday": "Yesterday",
                                "tomorrow": "Tomorrow",
                                "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                "daysShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                "daysMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                                "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"],
                                "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
                                "suffix": [],
                                "meridiem": [],
                                "weekStart": 1,
                                "format": "dd MM yyyy - HH:ii",
                                "moment": {
                                    "timelapse": "+2",
                                    "format": "DD.MM.YYYY HH:mm"
                                }
                            }
                        }
                    }]
                }, {
                    name: 'test.js',
                    languages: [{
                        name: 'en-US',
                        content: {
                            value: 'in edasdanglish'
                        }
                    }, {
                        name: 'ro-RO',
                        content: {
                            value: 'in roaaamana'
                        }
                    }]
                }]
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