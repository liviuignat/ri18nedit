(function() {
    'use strict';
    directives.directive('file', function(){
        return {
            scope: {
                file: '='
            },
            link: function(scope, el, attrs){
                el.bind('change', function(event){
                    var files = event.target.files,
                        file = files[0],
                        value = event.target.value;
                    scope.file = file ? {
                            name: file.name,
                            value: value
                        } : undefined;
                    scope.$apply();
                });
            }
        };
    });
})();