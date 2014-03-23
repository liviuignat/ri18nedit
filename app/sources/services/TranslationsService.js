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
								value: 'in english',
								val1: '1',
								array: [
									{
										o1: { val1: 'a1' }
									},
									'a',
									[]
								],
								obj: {
									o1: {},
									o2: [],
									o3: 'o3'
								}
							}
						},
						{
							name: 'ro-RO',
							content: {
								value: 'in romana',
								val2: '2',
								array1: 'test1'
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