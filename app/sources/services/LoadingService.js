(function(controllers) {
    'use strict';
	services.factory('LoadingService', function($rootScope) {
	    return {
	        show : function() {
	        	$('.loading-panel').show();
	        },
	        hide : function() {
	        	$('.loading-panel').hide();
	        }
	    }
	});
})();