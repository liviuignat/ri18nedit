(function () {
	services.factory('TranslationsService', ['$http', function ($http) {
		var translations = {
			files: [
				{
					name: 'global.js',
					languages: [
						{
							name: 'en-US',
							content: {
								value: 'in english'
							}
						},
						{
							name: 'ro-RO',
							content: {
								value: 'in romana'
							}
						}
					]
				},
				{
					name: 'test.js',
					languages: [
						{
							name: 'en-US',
							content: {
								value: 'in edasdanglish'
							}
						},
						{
							name: 'ro-RO',
							content: {
								value: 'in roaaamana'
							}
						}
					]
				}
			]
		};

		return {
			setTranslations: function (value) {
		 		if(value) {
		 			translations = value;
		 		}
		 	},
		 	getTranslations: function () {
		 		return translations;
		 	}
		 };
	}]);

})(services);