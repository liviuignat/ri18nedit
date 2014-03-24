(function(controllers) {
    'use strict';
	services.factory('ConfirmationService', function($rootScope) {
	    return {
	        confirm : function(message, callback) {
	        	bootbox.confirm(message, callback);
	        }
	    }
	});
})();