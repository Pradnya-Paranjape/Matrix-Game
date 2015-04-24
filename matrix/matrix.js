define([
    'matrix/controllers/MatrixCtrl.js',
    'text!matrix/templates/show-matrix.html'
], function(MatrixCtrl,
            matrixTemplate){
        return {
            init: init
        };
    
        function init() {
            console.log("inside matrix init");
            var matrix = angular.module('matrix', []);
            matrix.controller('MatrixCtrl', MatrixCtrl);
            matrix.run('$rootScope', '$templateCache');
        }
    
        function run($rootScope, $templateCache){
            $templateCache.put('matrix/show-matrix.html', matrixTemplate);
            angular.extend($rootScope.template, {
                matrix: template
            });
        }
});